import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc,doc,getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Navbar from "../Component/Navbar";
import { AuthContext } from '../context_api/AuthContext'; 
import { Rings } from 'react-loader-spinner';
import { toast } from "react-toastify";
import './UserCheckout.css';

const UserCheckout = () => {
    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product || null; // Access the passed product data
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const userDocRef = doc(db, "Users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    
                }
            }
        };

        fetchUserData();

        if (!product) {
            navigate('/'); // Redirect if no product data is available
        }
    }, [product,currentUser, navigate]);

    const handleBuyProduct = async () => {

        const effectiveDiscountPrice = product.discountPrice && product.discountPrice !== product.productPrice 
        ? parseFloat(product.discountPrice) 
        : parseFloat(product.productPrice);
        setLoading(true);
        try {
            const buyRef = collection(db, 'UserBuy', currentUser.email, 'buyItems');
            const totaluserbuy = collection(db, 'TotalBuy');
            await addDoc(buyRef, {
                productId: product.id,
                productName: product.productName,
                originalPrice: product.originalPrice || product.productPrice,
                productImage: product.imageUrl,
                addedAt: new Date(),
                discountPrice: effectiveDiscountPrice,
            });

            await addDoc(totaluserbuy, {
                productId: product.id,
                productName: product.productName,
                originalPrice: product.originalPrice || product.productPrice,
                productImage: product.imageUrl,
                addedAt: new Date(),
                discountPrice: effectiveDiscountPrice,
                Username: userData.Username,
                Address: userData.address,
                Email: userData.email, 
            });

           
            toast.success("Product purchased successfully!", { position: "top-center" });
            navigate('/product'); // Redirect after successful purchase
        } catch (error) {
            console.error("Error processing purchase:", error);
            toast.error("Failed to process your purchase.", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="cartbodypartall2">
                <div className="cart-page2">
                    <div className="cart-left2">
                        <div className="cart-content2">
                            <div className="products1980122">
                                <div className="img-user-cart2">
                                    <img className="img-user-cart-product2" src={product.imageUrl} alt={product.productName} />
                                </div>
                                <div className="title-cart-product2">
                                    <h1>{product.productName}</h1>
                                </div>
                                <div className="price-cart-product2">
                                        {product.discountPrice && product.discountPrice !== product.originalPrice ? (
                                            <>
                                                <h4 className="cart-orginal-price2 line-through2">
                                                    Rs {product.originalPrice}
                                                </h4>
                                                <h4 className="cart-discount-price2">Rs {product.discountPrice}</h4>
                                            </>
                                        ) : (
                                            <h4 className="cart-orginal-price2">Rs {product.productPrice}</h4>
                                        )}
                                    </div>
                            </div>  
                        </div>
                    </div>
                    <div className="cart-right2">
                        <div className="order-summary2">
                            <h2>Order Summary</h2>
                            <div className="summary-item2 total">
                                <span>Total</span>
                                <span>Rs {product.discountPrice || product.productPrice}</span>
                            </div>
                            <button className="place-order2" onClick={handleBuyProduct}>PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="loader-overlay">
                    <Rings visible={true} height="150" width="150" color="#367588" ariaLabel="rings-loading" />
                </div>
            )}
        </>
    );
};

export default UserCheckout;

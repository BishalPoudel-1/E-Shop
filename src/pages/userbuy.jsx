import "./userbuy.css";
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the import based on your Firebase config path
import Navbar from "../Component/Navbar";
import { AuthContext } from '../context_api/AuthContext'; // Import your AuthContext
import { Rings } from 'react-loader-spinner';

const Userbuy = () => {
    const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchCartItems = async () => {
        setLoading(true); // Set loading to true before fetching data

        try {
            if (currentUser) {
                const cartCollection = collection(db, 'UserBuy', currentUser.email, 'buyItems');
                const cartSnapshot = await getDocs(cartCollection);
                const items = cartSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id, // Store document ID
                }));
                setCartItems(items);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    fetchCartItems(); // Fetch cart items on component mount
}, [currentUser]);


    if (!currentUser) {
        console.log("Current User in Usercart:", currentUser);
        return; // Handle case where there's no user
    }

    return (
        <>
            <div className="cartbodypartall1">
                <Navbar />
                <div className="cart-page1">
                    <div className="cart-left1">
                        <div className="cart-content1">
                            {cartItems.map((item) => (
                                <div className="products1980121" key={item.id}>
                                    <div className="img-user-cart1">
                                        <img className="img-user-cart-product1" src={item.productImage} alt={item.productName} />
                                    </div>
                                    <div className="title-cart-product1">
                                        <h1>{item.productName}</h1>
                                    </div>
                                    <div className="price-cart-product1">
                                        {item.discountPrice && item.discountPrice !== item.originalPrice ? (
                                            <>
                                                <h4 className="cart-discount-price1">Rs {item.discountPrice}</h4>
                                            </>
                                        ) : (
                                            <h4 className="cart-original-price1">Rs {item.originalPrice}</h4>
                                        )}
                                    </div>
                                </div>  
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="loader-overlay">
                    <Rings
                        visible={true}
                        height="150"
                        width="150"
                        color="#367588"
                        ariaLabel="rings-loading"
                    />
                </div>
            )}
        </>
    );
};

export default Userbuy;

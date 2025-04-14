import "./usercart.css";
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { collection, getDocs, doc, addDoc, deleteDoc,getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the import based on your Firebase config path
import Navbar from "../Component/Navbar";
import { AuthContext } from '../context_api/AuthContext'; // Import your AuthContext
import { Rings } from 'react-loader-spinner';
import { toast } from "react-toastify";




const Usercart = () => {
    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); // State to manage selected items

    // Function to fetch cart items
    const fetchCartItems = useCallback(async () => {
        setLoading(true); // Set loading to true before fetching data

        try {
            if (currentUser) {
                const cartCollection = collection(db, 'carts', currentUser.email, 'cartItems');
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
    }, [currentUser]);

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
        fetchCartItems(); // Fetch cart items on component mount
    }, [currentUser, fetchCartItems]);

    const handleCheckboxChange = (item) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(item)) {
                return prevSelectedItems.filter(selectedItem => selectedItem !== item);
            } else {
                return [...prevSelectedItems, item];
            }
        });
    };

    // Calculate the total sum of selected products
    const totalSum = selectedItems.reduce((acc, item) => {
        const price = item.discountPrice && item.discountPrice !== item.originalPrice 
            ? parseFloat(item.discountPrice) 
            : parseFloat(item.originalPrice);
        return acc + price;
    }, 0);

    if (!currentUser) {
        console.log("Current User in Usercart:", currentUser);
        return <div>No current user found.</div>; // Handle case where there's no user
    }

    
    
    

    const handleBuyProducts = async () => {
        setLoading(true);  // Start loading
    
        try {
            const buyRef = collection(db, 'UserBuy', currentUser.email, 'buyItems');
            const totaluserbuy = collection(db, 'TotalBuy');
    
            for (const item of selectedItems) {
                const { id, productId, productName, originalPrice, productImage, discountPrice } = item;
                
                // Determine the price to use: discountPrice if available and different from originalPrice, otherwise originalPrice
                const effectiveDiscountPrice = discountPrice && discountPrice !== originalPrice 
                    ? parseFloat(discountPrice) 
                    : parseFloat(originalPrice);
    
                // Add the item to Firestore
                await addDoc(buyRef, {
                    productId: productId || id, // Use either the provided productId or Firestore document ID
                    productName: productName || 'Unknown Product',
                    originalPrice: originalPrice !== undefined ? originalPrice : 0,
                    productImage: productImage || '',
                    addedAt: new Date(),
                    discountPrice: effectiveDiscountPrice, // Use effectiveDiscountPrice calculated above
                });


                await addDoc(totaluserbuy, {
                    productId: productId || id, // Use either the provided productId or Firestore document ID
                    productName: productName || 'Unknown Product',
                    originalPrice: originalPrice !== undefined ? originalPrice : 0,
                    productImage: productImage || '',
                    addedAt: new Date(),
                    discountPrice: effectiveDiscountPrice,
                    Username: userData.Username,
                    Address: userData.address,
                    Email: userData.email, // Use effectiveDiscountPrice calculated above
                });
                
    
                // After adding the item to the purchase collection, remove it from the cart
                const cartItemRef = doc(db, 'carts', currentUser.email, 'cartItems', id);
    
                try {
                    // Delete from Firestore using the document ID
                    await deleteDoc(cartItemRef);
                    toast.success("Item removed from cart and added to purchases.", {
                        position: "top-center",
                    });
                } catch (error) {
                    console.error("Error deleting item from cart: ", error);
                }
            }

            // Refresh the cart items after deletion
            await fetchCartItems();

            // Clear the selected items after purchase
            setSelectedItems([]);
    
        } catch (error) {
            console.error("Error processing purchase:", error);
            toast.error("Failed to process your purchase.", {
                position: "top-center",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };
    
    return (
        <>
            <div className="cartbodypartall">
                <Navbar />
                <div className="cart-page">
                    <div className="cart-left">
                        <div className="cart-content">
                            {cartItems.map((item, index) => (
                                <div className="products198012" key={item.id}>
                                    <div className="checkbox-user-cart">
                                        <input 
                                            type="checkbox" 
                                            id={`checkbox-${index}`} 
                                            value={item.productName} 
                                            name="cart-item" 
                                            onChange={() => handleCheckboxChange(item)}
                                        />
                                    </div>
                                    <div className="img-user-cart">
                                        <img className="img-user-cart-product" src={item.productImage} alt={item.productName} />
                                    </div>
                                    <div className="title-cart-product">
                                        <h1>{item.productName}</h1>
                                    </div>
                                    <div className="price-cart-product">
                                        {item.discountPrice && item.discountPrice !== item.orginalPrice ? (
                                            <>
                                                <h4 className="cart-orginal-price line-through">
                                                    Rs {item.orginalPrice}
                                                </h4>
                                                <h4 className="cart-discount-price">Rs {item.discountPrice}</h4>
                                            </>
                                        ) : (
                                            <h4 className="cart-orginal-price">Rs {item.originalPrice}</h4>
                                        )}
                                    </div>
                                </div>  
                            ))}
                        </div>
                    </div>
                    <div className="cart-right">
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-details">
                                {selectedItems.map((item, index) => (
                                    <div className="summary-item" key={item.id}>
                                        <span>{item.productName}</span>
                                        <span>
                                            {item.discountPrice && item.discountPrice !== item.orginalPrice ? (
                                                `Rs ${item.discountPrice}`
                                            ) : (
                                                `Rs ${item.originalPrice}`
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-item total">
                                <span>Total</span>
                                <span>Rs {totalSum}</span> {/* Display the total sum */}
                            </div>
                            <button className="place-order" onClick={handleBuyProducts}>PLACE ORDER</button>
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

export default Usercart;

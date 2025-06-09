//Navbar components based on the user login
import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './eshop.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from '../context_api/AuthContext'; // Import AuthContext
import { auth, db } from "../pages/firebase";
import { doc, getDoc } from 'firebase/firestore';

function Navbar() {
    const [userData, setUserData] = useState(null);
    

    const { currentUser } = useContext(AuthContext); // Access current user

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
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.clear();
            window.location.href = "/";
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
       <>
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand d-flex align-items-center">
                        <img src={logo} className="navbar-logo me-2" alt="E-Shop Logo" />
                        <span className="navbar-brand-text">E-Shop</span>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link active custom" aria-current="page">
                                    <i className="bi bi-house-door"></i> Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/product' className="nav-link custom">
                                    <i className="bi bi-shop"></i> Product
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contactus' className="nav-link custom">
                                    <i className="bi bi-telephone"></i> Contact Us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/aboutus' className="nav-link custom">
                                    <i className="bi bi-people"></i> About Us
                                </NavLink>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <NavLink to='/cart'>
                            <button className="btn btn-outline-custom-teal-blue" type="button">
                                <i className="bi bi-bag-fill"></i> Cart
                            </button>
                            </NavLink>

                            {currentUser ? (
                                <div className="btn-group accountbutton">
                                    <button type="button" className="btn btn-outline-custom-teal-blue dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-fill"></i> {userData ? userData.Username : 'Account'}
                                    </button>
                                    <ul className="dropdown-menu">
                                    <NavLink to='/userbuy'>
                                        <button type="button" className="btn btn-outline-custom-teal-blue dropdown-item">
                                            My Purchase
                                        </button>
                                        </NavLink>
                                        
                                        <button type="button" className="btn btn-outline-custom-teal-red dropdown-item" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </ul>
                                </div>
                            ) : (
                                <NavLink to='/login'>
                                    <button className="btn btn-outline-custom-teal-blue" type="button">
                                        <i className="bi bi-person-fill"></i> Login
                                    </button>
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            </> 
        
    );
}

export default Navbar;

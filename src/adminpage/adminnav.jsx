import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../Component/eshop.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from 'react-router-dom';
import './adminnav.css';




function Adminnav() {
    
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary nav1">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex align-items-center" href="#">
                        <img src={logo} className="navbar-logo me-2" alt="E-Shop Logo" />
                        <span className="navbar-brand-text">E-Shop</span>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/admin'>
                                    <div className="nav-link active custom" aria-current="page">
                                        <i className="bi bi-house-door"></i> Home
                                    </div>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/adminproduct'>
                                    <div className="nav-link custom">
                                        <i className="bi bi-shop"></i> Products
                                        </div>
                                    
                                </NavLink>
                            </li>
                           
                            <li className="nav-item">
                                <NavLink to='/userpage'>
                                    <div className="nav-link custom" >
                                        <i className="bi bi-people"></i> Users
                                    </div>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to='/showfeedback'>
                                    <div className="nav-link custom">
                                    <i class="bi bi-chat-left-text"></i> feedbacks
                                        </div>
                                    
                                </NavLink>
                            </li>
                        </ul>
                       
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Adminnav;

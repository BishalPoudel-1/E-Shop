import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import p1 from '../Image/book.jpg';
import p2 from '../Image/computer.jpg';
import p3 from '../Image/household2.jpg';
import p4 from '../Image/cloth.jpg';
import './carousel.css'; // Import your custom CSS file for additional styling
import { NavLink } from 'react-router-dom';

function Carousel() {
    return (
        <div className='imgslide'>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={p1} className="d-block w-100" alt="First slide" />
                        <div className="carousel-caption text-start top-0 start-10">
                            <div className="one">
                                <h1 >Digital</h1> <h2>Library</h2> <h5>Premier Destination for Books & E-Books</h5>
                                <NavLink to='/product'>
                                <button type="button" class="btn btn-outline-custom-teal-blues sp btn-lg  ">Shop Now</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={p2} className="d-block w-100" alt="Second slide" />
                        <div className="carousel-caption text-start top-0 start-10">
                            <div className="one">
                                <h1>Tech</h1> <h2>Haven</h2>
                                <h5>Your Ultimate Computer Destination</h5>
                                <NavLink to='/product'>
                                <button type="button" class="btn btn-outline-custom-teal-blues sp btn-lg">Shop Now</button>
                                </NavLink>

                               
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={p4} className="d-block w-100" alt="Third slide" />
                        <div className="carousel-caption text-start top-0 start-10">
                            <div className="one">
                                <h1>Threads &</h1>
                                <h2>Trends</h2>
                                <h5>Fashion for All - Men & Women's Collection</h5>
                                <NavLink to='/product'>
                                <button type="button" class="btn btn-outline-custom-teal-blues btn-lg sp">Shop Now</button>
                                </NavLink>
                                 </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={p3} className="d-block w-100" alt="Fourth slide" />
                        <div className="carousel-caption text-start  top-0 start-10 ">
                            <div className="one">
                                <h1>Home </h1><h2>Essentials:</h2> <h5>Your Premier Source for Household Goods</h5>
                                <NavLink to='/product'>
                                <button type="button" class="btn btn-outline-custom-teal-blues btn-lg sp">Shop Now</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
export default Carousel;


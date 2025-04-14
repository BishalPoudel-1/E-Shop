import React from 'react';
import customersupport from "../Image/cs.png";
import ship from"../Image/ship.png";
import money from "../Image/money.png";
import './featurewebsite.css'; // Assuming your CSS is in this file

function Featuredwebsite() {
    return (
        <div className="features">
            <div className="feature-item">
                <div className="icon12">
                    <img src={customersupport} alt="24/7 Free Support"  className='img12'/>
                </div>
                <h3>24/7 Free support</h3>
                <p>24/7 Online support</p>
            </div>
            <div className="feature-item">
                <div className="icon12">
                    <img src={ship} alt="Free world shipping" className='img12' />
                </div>
                <h3>Free world shipping</h3>
                <p>On Order Over Rs 5</p>
            </div>
            <div className="feature-item">
                <div className="icon12">
                    <img src={money} alt="Money back guaranty" className='img12' />
                </div>
                <h3>Money back guaranty</h3>
                <p>100% secure Payment</p>
            </div>
        </div>
    );
}

export default Featuredwebsite;

import "./footer.css";
import logo from './eshop.png';
import instragram from "../Image/instagram.png";
import Facebook from "../Image/facebook.png";
import X from "../Image/twitter.png";
import { NavLink } from "react-router-dom";

function Footer() 
{
    return(
        <div className="footer">
            <footer>
                <div className="footer-container">
                    <div className="logo-title">
                        <img src={logo} alt="Logo" className="logo" />
                        <h2 className="title">E-Shop</h2>
                    </div>
                    <nav className="main-menu">
                        <ul>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li> <NavLink to='/product'> Product </NavLink> </li>
                            <li> <NavLink to='/contactus'> Contact Us </NavLink></li>
                            <li> <NavLink to='/aboutus'> About Us</NavLink></li>
                            
                        </ul>
                    </nav>
                    <div className="social-media">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={Facebook} alt="Facebook" className="social-icon" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank"  rel="noopener noreferrer">
                            <img src={X} alt="Twitter" className="social-icon" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={instragram} alt="Instagram" className="social-icon" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

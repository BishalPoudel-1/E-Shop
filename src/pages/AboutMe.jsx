// AboutMe.js
import React from 'react';
import './AboutMe.css';  // Import the CSS file
import Navbar from '../Component/Navbar';
import profiless from "./img/profile.png"
import Footer from '../Component/footer';

const AboutMe = () => {
  return (
    <>
    <Navbar />
    <div className="about3">
      <img src= {profiless} id='aboutprofile' alt="Profile" />
      <h1>About Me</h1>
      <div className="des">
        <p>
          Welcome to the dynamic world of computer science, where curiosity meets innovation and problem-solving is at the heart of everything we do. As a computer science student, you are embarking on a journey that blends theory with practical application, preparing you to tackle the technological challenges of today and tomorrow. From algorithms and data structures to artificial intelligence and cybersecurity, your pursuit of knowledge will empower you to shape the future through code, creativity, and a deep understanding of computational systems. Embrace the complexities, embrace the possibilities, and get ready to make an impact in this ever-evolving field.
        </p>
      </div>
      <div className="icon">
        <ion-icon name="logo-facebook"></ion-icon>
        <ion-icon name="logo-instagram"></ion-icon>
        <ion-icon name="logo-twitter"></ion-icon>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutMe;

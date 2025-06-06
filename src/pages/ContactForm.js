//contact form page
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './ContactForm.css';
import location from "./img/location.png";
import email1 from "./img/email.png";
import phone from "./img/phone.png";
import shape from "./img/shape.png";
import Navbar from '../Component/Navbar';
import Footer from "../Component/footer";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Rings } from 'react-loader-spinner';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await setDoc(doc(db, "Feedback", subject), {
        name,
        email,
        subject,
        message
      });
      toast.success("Form submitted successfully!", { position: "top-center" });

      // Clear the input fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to submit the form.", { position: "bottom-center" });
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
      let parent = this.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      let parent = this.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container1">
        <span className="big-circle"></span>
        <img src={shape} className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Connect with Us Anytime, We're Listening!</h3>
            <p className="text">
              Support team is always available and attentive to customer needs, emphasizing a commitment to providing prompt and personalized assistance whenever it's needed.
            </p>
            <div className="info">
              <div className="information">
                <img src={location} className="icon" alt="" />
                <p>10 Ghorai, Dang, Nepal</p>
              </div>
              <div className="information">
                <img src={email1} className="icon" alt="" />
                <p>admin@eshop.com</p>
              </div>
              <div className="information">
                <img src={phone} className="icon" alt="" />
                <p>123-456-789</p>
              </div>
            </div>
            <div className="social-media">
              <p>Connect with us:</p>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>
            <form onSubmit={handleSubmit} autoComplete="off">
              <h3 className="title122">Contact us</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Full Name</label>
                <span>Full Name</span>
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
                <span>Email</span>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="Subject"
                  className="input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                <label>Subject</label>
                <span>Subject</span>
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <label>Message</label>
                <span>Message</span>
              </div>
              <input type="submit" value="Send" className="btn1" />
            </form>
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
      <Footer />
    </>
  );
};

export default ContactForm;

import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser,faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import logImg from "./img/log.svg";
import registerImg from "./img/register.svg";
import { NavLink } from "react-router-dom";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context_api/AuthContext";
import { Rings } from 'react-loader-spinner';

const Login = () => {
  const [Remail, setREmail] = useState("");
  const [Rpassword, setRPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, Remail, Rpassword);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Username: username,
          address: address,
        });
      }
      setREmail("");
      setRPassword("");
      setUsername("");
      setAddress("");
      toast.success("User Registered Successfully!!", { position: "top-center" });
      setIsSignUpMode(false);
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      setEmail("");
      setPassword("");
      toast.success("User logged in successfully", { position: "top-center" });
      setTimeout(() => {
        window.location.href = "/product";
      }, 1000);
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`containers ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="titles">Sign in</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon" />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Login" className="btns solid" />
          </form>

          <form onSubmit={handleRegister} className="sign-up-form">
            <h2 className="titles">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLocationCrosshairs} className="fa-icon" />
            
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
              <input
                type="email"
                placeholder="Email"
                value={Remail}
                onChange={(e) => setREmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fa-icon" />
              <input
                type="password"
                placeholder="Password"
                value={Rpassword}
                onChange={(e) => setRPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" className="btns" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Sign Up Now for Personalized Shopping and Special Discounts!</p>
            <button className="btns transparent" id="sign-up-btn" onClick={() => setIsSignUpMode(true)}>
              Sign up
            </button>
            <NavLink to="/">
              <button className="btns transparent" id="home">
                Home
              </button>
            </NavLink>
          </div>
          <img src={logImg} className="image" alt="Login" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Welcome Back – Sign In to Continue Your Journey!</p>
            <button className="btns transparent" id="sign-in-btn" onClick={() => setIsSignUpMode(false)}>
              Sign in
            </button>
            <NavLink to="/">
              <button className="btns transparent" id="home">
                Home
              </button>
            </NavLink>
          </div>
          <img src={registerImg} className="image" alt="Register" />
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
    </div>
  );
};

export default Login;

import React, { useState, useRef } from "react";
import "./addproduct.css"; 
import Adminnav from "./adminnav";
import { storage, db } from "../pages/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Addproduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [uploading, setUploading] = useState(false); 

  const fileInputRef = useRef(null); 

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUploading(true); 

    const sanitizedProductName = productName.trim().replace(/[^a-zA-Z0-9]/g, "_");

    const storageRef = ref(storage, `product-images/${sanitizedProductName}`);
    await uploadBytes(storageRef, productImage);
    const imageUrl = await getDownloadURL(storageRef);

    
    try {
      await addDoc(collection(db, "products"), {
        productName,
        productPrice,
        productDescription,
        productCategory, 
        imageUrl, 
      });
      console.log("Product added to Firestore!");

     
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductCategory(""); 
      setProductImage(null);
      fileInputRef.current.value = ""; 
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error Uploading Product Data", {
        position: "top-center",
      });
    }

    setUploading(false);
    toast.success("Product Added Successfully", {
      position: "top-center",
    });
  };

  return (
    <>
      <Adminnav />

      <div className="admin-page">
        <h2 className="dastitle">Add Products</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Price:</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Description:</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Category:</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Books and E-books">Books and E-books</option>
              <option value="Cloth for Male & Female">Cloth for Male & Female</option>
              <option value="Digital Devices">Digital Devices</option>
              <option value="Home Essentials">Home Essentials</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div className="form-group">
            <label>Product Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              required
              className="inputimg"
              ref={fileInputRef} 
            />
          </div>
          <button type="submit" className="submit-button" disabled={uploading}>
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </form>
        <NavLink to='/adminproduct'>
        <button type="submit" className="back-button" >Cancel</button>
        </NavLink>
      </div>
    </>
  );
};

export default Addproduct;

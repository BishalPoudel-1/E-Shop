import React, { useEffect, useState } from 'react';
import "./userProduct.css";
import Navbar from "../Component/Navbar";
import { NavLink } from 'react-router-dom';
import Footer from '../Component/footer';
import { db } from './firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; 
import { Rings } from 'react-loader-spinner';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsArray = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const discountSnapshot = await getDocs(collection(db, 'discountedProducts'));
        const discountArray = discountSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          isDiscounted: true, // Mark discounted products
        }));

        // Combine normal and discounted products
        const combinedProducts = [...productsArray, ...discountArray];
        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchProducts();
  }, []);

  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  return (
    <>
      <Navbar />
      <div className="container5678">
        <div className="title1234">PRODUCT LIST</div>
        <div className="listProduct4321">
          {products.map(product => (
            <NavLink 
              to={product.isDiscounted ? `/discounted-product/${product.id}` : `/product/${product.id}`} 
              className="item8765" 
              key={product.id}
            >
              <img src={product.imageUrl} alt={product.productName} />
              <h2>{product.productName}</h2>
              <div className="price0987">
                {product.discountPrice ? (
                  <>
                    <div className="admin-discount-label1">
                      {calculateDiscountPercentage(product.originalPrice, product.discountPrice)}% OFF
                    </div>
                    <div className='Allprice1'>
                      <span className="original-price1">RS {product.originalPrice}</span>
                      <span className="discounted-price1">RS {product.discountPrice}</span>
                    </div>
                  </>
                ) : (
                  <span className="original-price3">RS {product.productPrice}</span>
                )}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <Footer />
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

export default ProductList;

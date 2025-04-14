import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "./userProduct.css";
import Navbar from "../Component/Navbar";
import Footer from '../Component/footer';
import { Rings } from 'react-loader-spinner';
import { db } from './firebase';
import { doc, getDoc, collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import { AuthContext } from '../context_api/AuthContext'; // Assuming you have an auth context to get the current user

const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { currentUser } = useContext(AuthContext); // Get the current user from the auth context

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);

        if (!productSnapshot.exists()) {
          console.log("Product not found");
          navigate('/');
        } else {
          const productData = { id: productSnapshot.id, ...productSnapshot.data() };
          setProduct(productData);

          const similarProductsQuery = query(
            collection(db, 'products'),
            where('productCategory', '==', productData.productCategory)
          );

          const querySnapshot = await getDocs(similarProductsQuery);
          const similarProductsArray = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(p => p.id !== id);
          setSimilarProducts(similarProductsArray);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    setLoading(true);
    if (!currentUser) {
      // Redirect to login if the user is not logged in
      navigate('/login');
      return;
    }

    try {
      const cartRef = collection(db, 'carts', currentUser.email, 'cartItems');
      
      // Optional: Check if the product is already in the cart
      const existingCartItemQuery = query(cartRef, where('productId', '==', product.id));
      const existingCartItemSnapshot = await getDocs(existingCartItemQuery);
  
      if (!existingCartItemSnapshot.empty) {
        toast.info("Product is already in your cart.", {
          position: "top-center",
        });
      } else {
        await addDoc(cartRef, {
          productId: product.id,
          productName: product.productName,
          originalPrice: product.productPrice,
          productImage: product.imageUrl,
          addedAt: new Date(),
        });
        console.log("Product added to cart");
        toast.success("Product Added to Cart Successfully!!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (product) {
      navigate('/usercheckout', { state: { product } }); // Pass product data to UserCheckout page
    }
  };

  if (!product) return (
    <div className="loader-overlay">
      <Rings visible={true} height="150" width="150" color="#367588" ariaLabel="rings-loading" />
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container12398">
        <div className="title">PRODUCT DETAIL</div>
        <div className="detail3456">
          <div className="image7890">
            <img src={product.imageUrl} alt={product.productName} />
          </div>
          <div className="content">
            <h1 className="name2345">{product.productName}</h1>
            <div className="price6789">Rs {product.productPrice}</div>
            <div className="buttons9876">
              <button onClick={handleCheckout}>Check Out</button>
              <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
            <div className="description6789">{product.productDescription}</div>
          </div>
        </div>

        <div className="title1239">Similar Products</div>
        <div className="listProduct4321">
          {similarProducts.map(similarProduct => (
            <NavLink to={`/product/${similarProduct.id}`} className="item8765" key={similarProduct.id}>
              <img src={similarProduct.imageUrl} alt={similarProduct.productName} />
              <h2>{similarProduct.productName}</h2>
              <div className="price0987">Rs {similarProduct.productPrice}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <Footer />
      {loading && (
        <div className="loader-overlay">
          <Rings visible={true} height="150" width="150" color="#367588" ariaLabel="rings-loading" />
        </div>
      )}
    </>
  );
};

export default ProductDetail;

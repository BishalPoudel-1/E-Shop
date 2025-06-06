//discount product detail page
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "./discountuserProduct.css";
import Navbar from "../Component/Navbar";
import Footer from '../Component/footer';
import { Rings } from 'react-loader-spinner';
import { db } from './firebase';
import { doc, getDoc, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { toast } from "react-toastify";
import { AuthContext } from '../context_api/AuthContext'; 

const DiscountProductDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productRef = doc(db, 'discountedProducts', id);
        const productSnapshot = await getDoc(productRef);

        if (!productSnapshot.exists()) {
          navigate('/');
        } else {
          const productData = { id: productSnapshot.id, ...productSnapshot.data() };
          setProduct(productData);

          const allProductsSnapshot = await getDocs(collection(db, 'discountedProducts'));
          const allProductsArray = allProductsSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(p => p.id !== id);
          setSimilarProducts(allProductsArray);
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

  const handleCheckout = () => {
    if (product) {
      navigate('/usercheckout', { state: { product } }); // Pass product data to UserCheckout page
    }
  };

  const handleAddToCart = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const cartRef = collection(db, 'carts', currentUser.email, 'cartItems');
      const existingCartItemQuery = query(cartRef, where('productId', '==', product.id));
      const existingCartItemSnapshot = await getDocs(existingCartItemQuery);

      if (!existingCartItemSnapshot.empty) {
        toast.info("Product is already in your cart.", { position: "top-center" });
      } else {
        await addDoc(cartRef, {
          productId: product.id,
          productName: product.productName,
          orginalPrice: product.originalPrice,
          productImage: product.imageUrl,
          addedAt: new Date(),
          discountPrice: product.discountPrice,
        });
        toast.success("Product Added to Cart Successfully!!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  if (!product) return (
    <div className="loader-overlay">
      <Rings visible={true} height="150" width="150" color="#367588" ariaLabel="rings-loading" />
    </div>
  );

  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

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
            <div className="price67891">Rs {product.originalPrice}</div>
            <div className="price6781">Rs {product.discountPrice}</div>
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
            <NavLink to={`/discounted-product/${similarProduct.id}`} className="item8765" key={similarProduct.id}>
              <img src={similarProduct.imageUrl} alt={similarProduct.productName} />
              <h2>{similarProduct.productName}</h2>
              <div className="user-discount-label2">
                {calculateDiscountPercentage(similarProduct.originalPrice, similarProduct.discountPrice)}% OFF
              </div>
              <div className='Allprice2'>
                <span className="original-price2">RS {similarProduct.originalPrice}</span>
                <span className="discounted-price2">RS {similarProduct.discountPrice}</span>
              </div>
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

export default DiscountProductDetail;

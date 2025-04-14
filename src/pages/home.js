import React, { useState, useEffect,useContext } from 'react';
import Navbar from '../Component/Navbar';
import './home.css';
import banner from "../Image/banner.png";
import Carousel from '../Component/carousel';
import Footer from '../Component/footer';
import ProductCard from '../Component/featureproduct';
import Featurewebsite from "../Component/featurewebsite";
import DiscountProduct from "../Component/discountproduct";
import { db } from '../pages/firebase'; // Adjust the path if necessary
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context_api/AuthContext'; 
import { Rings } from 'react-loader-spinner';

const product = {
  image: 'https://via.placeholder.com/100',
  name: 'Sample',
};

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDiscountedProducts = async () => {
    setLoading(true);
    try {
      const allProductsSnapshot = await getDocs(collection(db, 'discountedProducts'));
      const products = allProductsSnapshot.docs.map(doc => {
        const data = doc.data();
        const discountPercentage = (
          ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
        ).toFixed(2); // Calculate discount percentage and format it to 2 decimal places

        return {
          id: doc.id, // Add the ID if you need it
          ...data,
          discountLabel: `${discountPercentage}% OFF` // Create the discount label with % OFF
        };
      });
      setDiscountedProducts(products.slice(0, 4)); // Show only up to four discounted products
    } catch (error) {
      console.error("Error fetching discounted products: ", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchDiscountedProducts();
    
  }, []);

  const handleAddToCart = async (product) => {
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

  return (
    <div className="App">
      <div className='header'>
        <Navbar />
      </div>
      <div className="body">
        <Carousel />
        <div className="fpro">
          <div className="feature">
            <ProductCard product={product} />
          </div>
        </div>
        <div className="f">
          <img id='banner' src={banner} alt='discount' />
        </div>
        <h1 className='ft col-12'> Discount Product</h1>
        <div className="bs">
          {discountedProducts.map(product => (
            <DiscountProduct
              key={product.id}
              imageUrl={product.imageUrl}
              productName={product.productName}
              description={product.productDescription}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountPrice}
              discountLabel={product.discountLabel} 
              handleAddToCart={() => handleAddToCart(product)} // Pass the function with the product details
            />
          ))}
        </div>
        <Featurewebsite />
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
    </div>
  );
}

export default Home;

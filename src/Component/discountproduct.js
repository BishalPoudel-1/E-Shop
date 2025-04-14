import React from 'react';
import './discountproduct.css';

const DiscountProduct = ({ 
  imageUrl, 
  productName, 
  description, 
  originalPrice, 
  discountedPrice, 
  discountLabel, 
  handleAddToCart 
}) => {
  return (
    <div className="feature-product">
      <div className="discount-label">{discountLabel}</div>
      <img src={imageUrl} alt={productName} className="product-image" />
      <h2>{productName}</h2>
      <p>{description}</p>
      <div className="price">Rs{originalPrice}</div>
      <div className="discounted-price">Rs{discountedPrice}</div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default DiscountProduct;

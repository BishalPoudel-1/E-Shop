import React from 'react';
import './featureproduct.css';
import bookcat from '../Image/bookcat.png';
import cloth from '../Image/clothdual.png';
import tech from '../Image/tech.png';
import home from '../Image/home2.png';
import furniture from '../Image/furniture.png';





const FeaturedCategories = () => {
  const categories = [
    { id: 1, name: 'Books and E-books', image: bookcat },
    { id: 2, name: 'Cloth for Male & Female', image: cloth },
    { id: 3, name: 'Digital Devices', image: tech },
    { id: 4, name: 'Home Essential', image: home },
    { id: 4, name: 'Furnitures', image: furniture },
  ];

  return (
    <div className="featured-categories">
      <h2>Featured Categories</h2>
      <div className="categories">
        {categories.map(category => (
          <div key={category.id} className="category">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;

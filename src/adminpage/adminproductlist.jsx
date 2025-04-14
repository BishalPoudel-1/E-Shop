import React, { useEffect, useState } from 'react';
import "./Product.css";
import Adminnav from './adminnav';
import { db, storage } from "../pages/firebase"; 
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; 
import { NavLink } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(""); 
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

       
        const discountedProductsCollection = collection(db, "discountedProducts");
        const discountedProductSnapshot = await getDocs(discountedProductsCollection);
        const discountedProductList = discountedProductSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        
        setProducts([...discountedProductList,...productList]);
        if (localStorage.getItem('discountApplied') === 'true') {
          toast.success("Discount applied successfully!", {
            position: "top-center",
          });
          
          localStorage.removeItem('discountApplied');
        }

        if (localStorage.getItem('discountDelete') === 'true') {
          toast.success("Discount Delete successfully!", {
            position: "top-center",
          });
        
          localStorage.removeItem('discountDelete');
        }

      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductName(product.productName);
    setProductPrice(product.productPrice);
    setProductDescription(product.productDescription);
    setProductCategory(product.productCategory);
    setProductImage(null); 
    setDiscountPrice(product.discountPrice || ""); 
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };


  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = selectedProduct.imageUrl;

      
      if (productImage) {
        const sanitizedProductName = productName.trim().replace(/[^a-zA-Z0-9]/g, "_");
        const storageRef = ref(storage, `product-images/${sanitizedProductName}`);

       
        const oldImageRef = ref(storage, selectedProduct.imageUrl);
        await deleteObject(oldImageRef);

        await uploadBytes(storageRef, productImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      
      const productDocRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productDocRef, {
        productName,
        productPrice,
        productDescription,
        productCategory,
        imageUrl,
      });

      
      if (discountPrice) {
        const discountProductDocRef = doc(db, "discountedProducts", selectedProduct.id);
        await setDoc(discountProductDocRef, {
          productName,
          originalPrice: productPrice,
          discountPrice,
          productDescription,
          productCategory,
          imageUrl,
        });
        localStorage.setItem('discountApplied', 'true');
        window.location.reload();
        
      } 

      
      setProducts(products.map(product =>
        product.id === selectedProduct.id
          ? { ...product, productName, productPrice, productDescription, productCategory, imageUrl, discountPrice }
          : product
      ));

      toast.success("Product Updated Successfully", {
        position: "top-center",
      });
      setSelectedProduct(null);
    } catch (error) {
      toast.error("Failed to update product", {
        position: "top-center",
      });
      console.error("Error updating product: ", error);
    }

    setUploading(false);
  };




  const handleDelete = async (productId, imageUrl, isDiscounted) => {
    setLoading(true);
    try {

      if (isDiscounted) {
        
        const discountProductDocRef = doc(db, "discountedProducts", productId);
        await deleteDoc(discountProductDocRef);
        setLoading(false);
        setProducts(products.filter(product => product.id !== productId));

        localStorage.setItem('discountDelete', 'true');
        window.location.reload();
       
      } else {

        await deleteDoc(doc(db, "products", productId));
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        setProducts(products.filter(product => product.id !== productId));
        toast.success("Product Deleted Successfully", {
          position: "top-center",
        });
         }



    } catch (error) {
      toast.error("Error deleting product or image: ", {
        position: "top-center",
      });
      console.error("Error deleting product or image: ", error);
    } finally {
      setLoading(false);
    }
  };


  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    
    const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  return (
    <>
      <Adminnav />
      <div className="container1212">
        <div className="title">PRODUCT LIST</div>
        <div className="productbtn19">
          <NavLink to='/addproduct'>
            <button className="product-add-button">Add Products</button>
          </NavLink>
        </div>

        {selectedProduct ? (
          <form className="admin-product-update-form" onSubmit={handleUpdate}>
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
                className="inputimg"
              />
            </div>
            <div className="form-group">
              <label>Discount Price:</label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                placeholder="Add discount if any"
              />
            </div>
            <button type="submit" className="update-submit-button" disabled={uploading}>
              {uploading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="update-back-button"
              onClick={() => setSelectedProduct(null)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="listProduct">
            {products.map(product => (
              <div className="item" key={product.id}>
                <img src={product.imageUrl} alt={product.productName} />
                <h2>{product.productName}</h2>
                <div className="price">
                  {product.discountPrice ? (
                    <>
                    <div className="admin-discount-label">{calculateDiscountPercentage(product.originalPrice,product.discountPrice)}% OFF</div>
                    <div className='Allprice'>
                      <span className="original-price">RS {product.originalPrice}</span>
                      <span className="discounted-price">RS {product.discountPrice}</span>
                    </div>
                    </>
                  ) : (
                    <>RS {product.productPrice}</>
                  )}
                </div>
               
                <div className="product-actions">
                  <button
                    className="product-update-button"
                    onClick={() => handleEdit(product)}
                  >
                    Update
                  </button>
                  <button
                    className="product-delete-button"
                    onClick={() => handleDelete(product.id, product.imageUrl, Boolean(product.discountPrice))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
    </>
  );
};

export default ProductList;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from "./pages/login";
import ContactForm from "./pages/ContactForm";
import AboutMe from "./pages/AboutMe";
import ProductList from "./pages/ProductList";
import ProductDetail from './pages/ProductDetail';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from './context_api/AuthContext';
import { useContext } from "react";
import Addproduct from './adminpage/Addproduct.jsx';
import UserPage from './adminpage/UserPage';
import Adminproductlist from './adminpage/adminproductlist.jsx';
import Admin from './adminpage/Admin.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DiscountProductDetail from './pages/Discount-ProductDetail.js';
import Usercart from './pages/usercart.jsx';
import Userbuy from './pages/userbuy.jsx';
import UserCheckout from './pages/usercheckout.jsx';
import Showfeedback from './adminpage/showfeedback.jsx';


function App() {
  const {currentUser} = useContext(AuthContext);

  
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

console.log(currentUser);
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contactus' element={<ContactForm />} />
          <Route path='/aboutus' element={<AboutMe />} />
          <Route path='/product' element={<RequireAuth><ProductList /></RequireAuth>} />
          <Route path='/product/:id' element={<RequireAuth><ProductDetail /></RequireAuth>} />
          <Route path='/discounted-product/:id' element={<RequireAuth><DiscountProductDetail /></RequireAuth>} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/userpage' element={<UserPage />} />
          <Route path='/adminproduct' element={<Adminproductlist />} />
          <Route path='/admin' element={<Admin/>} />
          <Route path="/cart" element={ <RequireAuth> <Usercart />  </RequireAuth>} />
          <Route path="/userbuy" element={ <RequireAuth> <Userbuy />  </RequireAuth>} />
          <Route path="/usercheckout" element={ <RequireAuth> <UserCheckout />  </RequireAuth>} />
          <Route path='/showfeedback' element={<Showfeedback />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

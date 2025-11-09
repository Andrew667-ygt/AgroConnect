import Home from './Home';
import Footer from './Footer';
import Navbar from './Navbar';
import RegisterFarmer from './Registerfarmer';
import LoginFarmer from './Loginfarmer';
import LoginBuyer from './Loginbuyer';
import RegisterBuyer from './Registerbuyer';
import Marketplace from './Marketplace';
import SellerDashboard from './SellerDashboard';
import ProductDetail from './ProductDetails';
import { CartProvider } from '../contexts/CartContext';
import { AuthContextProvider } from '../contexts/AuthContext';
import { BrowserRouter,  } from 'react-router-dom';
import Checkout from './checkout';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Marketplacechart from './Marketplacechart';

export default function Main() {
  return (
    <div className="App">
      <Navbar />
      <CartProvider>
        {/* Move ToastContainer outside of Routes */}
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-farmer" element={<RegisterFarmer />} />
          <Route path="/register-buyer" element={<RegisterBuyer />} />
          <Route path="/login-farmer" element={<LoginFarmer />} />
          <Route path="/login-buyer" element={<LoginBuyer />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path='/add-to-chart' element={<Marketplacechart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
      <Footer />
    </div>
  );
}


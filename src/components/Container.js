import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/shopPages/Main';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDisplay from './pages/ProductDisplay';
import Cart from './pages/shopPages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Reset from './pages/Resetpassword';
import ResetConfirmation from './pages/confirmations/ResetConfirmation';
import PayPal from './pages/shopPages/PayPal';
import Orders from './pages/shopPages/Orders';
import Order from './pages/shopPages/Order';
import CategoryView from './pages/CategoryView';
import { CartProvider } from './CartContext';

function Container() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Shop />}>
            <Route path="/shop" element={<Main />} />
            <Route path=":id" element={<ProductDisplay />} />
            <Route path="cart" element={<Cart />} />
            <Route path="paypal" element={<PayPal />} />
            <Route path="categoryView/:id" element={<CategoryView />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="account" element={<Account />} />
          <Route path="reset" element={<Reset />} />
          <Route path="reset_confirmation" element={<ResetConfirmation />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<Order />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default Container;

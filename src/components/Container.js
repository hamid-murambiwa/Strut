import React, { useState, useMemo, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Main from './Main';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import LivingRoom from './LivingRoom';
import DiningKitchen from './DiningKitchen';
import ProductDisplay from './pages/ProductDisplay';
import Bedroom from './Bedroom';
import StorageMedia from './StorageMedia';
import Office from './Office';
import Cart from './Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Reset from './pages/Resetpassword';
import ResetConfirmation from './pages/confirmations/ResetConfirmation';
import PayPal from './PayPal';
import Orders from './Orders';
import Order from './Order';
import { CartContext } from './CartContext';

function Container() {
  const [cart, setCart] = useState(useContext(CartContext));

  const data = useMemo(() => ({
    cart, setCart,
  }), [cart, setCart]);
  return (
    <Router>
      <CartContext.Provider value={data}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Shop />}>
            <Route path="/shop" element={<Main />} />
            <Route path="livingRoom" element={<LivingRoom />} />
            <Route path="diningKitchen" element={<DiningKitchen />} />
            <Route path="bedroom" element={<Bedroom />} />
            <Route path="storageMedia" element={<StorageMedia />} />
            <Route path="office" element={<Office />} />
            <Route path=":id" element={<ProductDisplay />} />
            <Route path="cart" element={<Cart />} />
            <Route path="paypal" element={<PayPal />} />
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
      </CartContext.Provider>
    </Router>
  );
}

export default Container;

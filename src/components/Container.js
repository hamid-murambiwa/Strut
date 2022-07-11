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
import { CartContext, ReviewContext } from './CartContext';

function Container() {
  const [cart, setCart] = useState(useContext(CartContext));
  const [review, setReview] = useState(useContext(ReviewContext));

  const data = useMemo(() => ({
    cart, review, setCart, setReview,
  }), [cart, review, setCart, setReview]);
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
          </Route>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </CartContext.Provider>
    </Router>
  );
}

export default Container;

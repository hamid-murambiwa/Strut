import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { CartContext } from '../CartContext';
import '@szhsin/react-menu/dist/core.css';
import img from '../../styling/images/shopping-cart.png';
import '../../styling/shop.css';

function Shop() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <section id="shop-container">
        <div className="s-b-con">
          <header className="mobile-header">
            <Menu className="menu-icon" menuButton={<MenuButton>&#9776;</MenuButton>}>
              <MenuItem><a href="/">Home</a></MenuItem>
              <MenuItem><a href="/shop">Shop</a></MenuItem>
              <div className="btn-group dropend">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Furniture Categories
                </button>
                <ul className="dropdown-menu">
                  <Link to="livingRoom">LIVING ROOM</Link>
                  <Link to="diningKitchen">DINING & KITCHEN</Link>
                  <Link to="bedroom">BEDROOM</Link>
                  <Link to="storageMedia">STORAGE & MEDIA</Link>
                  <Link to="office">OFFICE</Link>
                </ul>
              </div>
              <MenuItem><a href="/about">About</a></MenuItem>
              <MenuItem><a href="/contact">Contact</a></MenuItem>
            </Menu>
          </header>
          <div className="home-btn">
            <Link to="/"><h2>Strut</h2></Link>
          </div>
          <nav className="s-nav">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <Link to="/shop/cart" className="cart-btn">
            <img src={img} alt="cart icon" />
            <span className="cart-counter">{cart.length}</span>
          </Link>
        </div>
      </section>
      <div>
        <section className="shop-navigation">
          <Link to="/shop"><strong>FURNITURE</strong></Link>
          <nav>
            <Link to="livingRoom">LIVING ROOM</Link>
            <Link to="diningKitchen">DINING & KITCHEN</Link>
            <Link to="bedroom">BEDROOM</Link>
            <Link to="storageMedia">STORAGE & MEDIA</Link>
            <Link to="office">OFFICE</Link>
          </nav>
        </section>
        <Outlet />
      </div>
    </div>
  );
}

export default Shop;

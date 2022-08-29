import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import * as apiCalls from '../../services/services';
import { CartContext } from '../CartContext';
import '@szhsin/react-menu/dist/core.css';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import '../../styling/shop.css';

function Shop() {
  const [message, setMessage] = useState('');
  const { cart } = useContext(CartContext);
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));

  return (
    <div>
      <section id="shop-container">
        <div className="s-b-con">
          <header className="mobile-header sec">
            <Menu className="menu-icon" menuButton={({ open }) => (<MenuButton className={open ? 'szh-menu-button h-active' : 'szh-menu-button h-inactive'}>&#9776;</MenuButton>)}>
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
            <Zoom>
              <Link to="/"><h2>Strut</h2></Link>
            </Zoom>
          </div>
          <nav className="s-nav">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <section className="icons-container">
            <div className="dropdown user-con-btn">
              <Slide left>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <div>
                    <img src={img2} alt="cart icon" />
                  </div>
                </button>
              </Slide>
              {userData.logged_in ? (
                <ul className="dropdown-menu" id="dm2" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <strong>
                      Hi,
                      {' '}
                      {userData.user.firstname}
                    </strong>

                  </li>
                  <li><Link className="dropdown-item" to="/account">ACCOUNT SETTINGS</Link></li>
                  <li><Link className="dropdown-item" to="/orders">MY ORDERS</Link></li>
                  <li><button type="button" className="s-o" onClick={() => apiCalls.handleSignout(setMessage)}>LOGOUT</button></li>
                </ul>
              ) : (
                <ul className="dropdown-menu" id="dm2" aria-labelledby="dropdownMenuButton1">
                  <li><Link className="dropdown-item" to="/login">LOGIN</Link></li>
                  <li><Link className="dropdown-item" to="/signup">CREATE AN ACCOUNT</Link></li>
                </ul>
              )}
            </div>
            <Bounce>
              <Link to="/shop/cart" className="cart-btn">
                <img src={img} alt="cart icon" />
                <span className="cart-counter">{cart.length}</span>
              </Link>
            </Bounce>
          </section>
        </div>
      </section>
      <div>
        <Slide left>
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
        </Slide>
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <Outlet />
      </div>
    </div>
  );
}

export default Shop;

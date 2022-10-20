import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import MobileHeader from '../Header';
import * as apiCalls from '../../services/services';
import '@szhsin/react-menu/dist/core.css';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import '../../styling/about.css';

function About() {
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const [message, setMessage] = useState('');
  const cart = useCart();

  return (
    <div className="container4">
      <section className="about-nav-container">
        <div className="a-n-con">
          <MobileHeader />
          <div className="home-btn">
            <Link to="/"><h2>Strut</h2></Link>
          </div>
          <nav>
            <Link to="/shop">Shop</Link>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Furniture Categories
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <Link className="dropdown-item" to="/shop/categoryView/1">LIVING ROOM</Link>
                <Link className="dropdown-item" to="/shop/categoryView/2">DINING & KITCHEN</Link>
                <Link className="dropdown-item" to="/shop/categoryView/3">BEDROOM</Link>
                <Link className="dropdown-item" to="/shop/categoryView/4">STORAGE & MEDIA</Link>
                <Link className="dropdown-item" to="/shop/categoryView/5">OFFICE</Link>
              </ul>
            </div>
            <Link to="/contact">Contact</Link>
          </nav>
          <section className="icons-container">
            <div className="dropdown user-con-btn">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <div>
                  <img src={img2} alt="cart icon" />
                </div>
              </button>
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
            <Link to="/shop/cart" className="cart-btn">
              <img src={img} alt="cart icon" />
              <span className="cart-counter">{cart.length}</span>
            </Link>
          </section>
        </div>
      </section>
      <section className="about-container">
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <hr />
        <h1>ABOUT US</h1>
        <h3>STRUT, FURNITURE AND DECOR FOR YOUR HOME</h3>
        <hr />
        <h2>WHAT WE ARE ABOUT</h2>
        <p>
          We are a family-owned company with a passion for quality and
          a commitment to customer service. We are dedicated to providing
          the best products and services to our customers.
        </p>
        <p>
          Our Group is a leading importer and retailer of furniture. Most of
          our products are sourced and developed from factories in Vietnam,
          the United States, Indonesia, Japan, and India.

        </p>
        <p>
          We work with quality suppliers and build strong relationships in order
          to bring you products suited to the South African market
        </p>
        <strong>
          Buy with confidence - today&apos;s furniture at the best prices direct
          to you. Click here to
          {' '}
          <Link to="/shop">visit our shop</Link>
          .
        </strong>
      </section>
      <section className="pledge-container">
        <h3>WE&apos;RE TAKING THE 15% PLEDGE</h3>
        <p>
          We&apos;re ensuring that 15% of our products and collaborations are
          represented by Black businesses, artists, and designers by 2024.
        </p>
      </section>
    </div>
  );
}

export default About;

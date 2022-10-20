import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '../Header';
import { useCart } from '../CartContext';
import * as apiCalls from '../../services/services';
import '@szhsin/react-menu/dist/core.css';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import '../../styling/contact.css';

function Contact() {
  const cart = useCart();
  const [message, setMessage] = useState('');
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  return (
    <div className="container5">
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
                <li />
                <Link className="dropdown-item" to="/shop/categoryView/1">LIVING ROOM</Link>
                <li />
                <Link className="dropdown-item" to="/shop/categoryView/2">DINING & KITCHEN</Link>
                <li />
                <Link className="dropdown-item" to="/shop/categoryView/3">BEDROOM</Link>
                <li />
                <Link className="dropdown-item" to="/shop/categoryView/4">STORAGE & MEDIA</Link>
                <li />
                <Link className="dropdown-item" to="/shop/categoryView/5">OFFICE</Link>
              </ul>
            </div>
            <Link to="/about">About</Link>
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
      <section className="contact-container">
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <hr />
        <div className="contact-heading">
          <h4>Contact</h4>
        </div>
        <hr />
        <section className="c-info-con">
          <div className="c-con">
            <h3>NATIONAL HOTLINE</h3>
            <p>065 918 7764</p>
          </div>
          <div className="c-con">
            <h3>NEED ASSISTANCE</h3>
            <p>machipisajunior@gmail.com</p>
            <p>
              Email Us: Contact us via our email address and our staff
              will get back to you as soon as possible.
            </p>
          </div>
        </section>
        <hr />
        <h1>Leave a message</h1>
        <div id="contacts" className="contact-con">
          <div className="form-con">
            <form className="form" action="https://formspree.io/f/xknevbba" method="post">
              <input name="User" placeholder="Username" type="text" className="form-control" required />
              <input placeholder="Email Address" name="Email" id="email" type="email" className="form-control" required />
              <textarea name="message" rows="4" placeholder="Leave a Message" className="form-textarea" required />
              <div className="btn-submit-con">
                <button type="submit" className="contact-btn">Send Message</button>
              </div>
            </form>
          </div>
          <hr />
        </div>
      </section>
    </div>
  );
}

export default Contact;

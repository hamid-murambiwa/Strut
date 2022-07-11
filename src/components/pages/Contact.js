import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { CartContext } from '../CartContext';
import '@szhsin/react-menu/dist/core.css';
import img from '../../styling/images/shopping-cart.png';
import '../../styling/contact.css';

function Contact() {
  const { cart } = useContext(CartContext);
  return (
    <div className="container5">
      <section className="about-nav-container">
        <div className="a-n-con">
          <header className="mobile-header">
            <Menu className="menu-icon" menuButton={<MenuButton>&#9776;</MenuButton>}>
              <MenuItem><a href="/">Home</a></MenuItem>
              <MenuItem><a href="/shop">Shop</a></MenuItem>
              <div className="btn-group dropend">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Furniture Categories
                </button>
                <ul className="dropdown-menu">
                  <Link to="/shop/livingRoom">LIVING ROOM</Link>
                  <Link to="/shop/diningKitchen">DINING & KITCHEN</Link>
                  <Link to="/shop/bedroom">BEDROOM</Link>
                  <Link to="/shop/storageMedia">STORAGE & MEDIA</Link>
                  <Link to="/shop/office">OFFICE</Link>
                </ul>
              </div>
              <MenuItem><a href="/about">About</a></MenuItem>
              <MenuItem><a href="/contact">Contact</a></MenuItem>
            </Menu>
          </header>
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
                <li><Link className="dropdown-item" to="/shop/livingRoom">LIVING ROOM</Link></li>
                <li><Link className="dropdown-item" to="/shop/diningKitchen">DINING & KITCHEN</Link></li>
                <li><Link className="dropdown-item" to="/shop/bedroom">BEDROOM</Link></li>
                <li><Link className="dropdown-item" to="/shop/storageMedia">STORAGE & MEDIA</Link></li>
                <li><Link className="dropdown-item" to="/shop/office">OFFICE</Link></li>
              </ul>
            </div>
            <Link to="/about">About</Link>
          </nav>
          <Link to="/shop/cart" className="cart-btn">
            <img src={img} alt="cart icon" />
            <span className="cart-counter">{cart.length}</span>
          </Link>
        </div>
      </section>
      <section className="contact-container">
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
            <form className="form" action="https://formspree.io/f/xnqwgead" method="post">
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

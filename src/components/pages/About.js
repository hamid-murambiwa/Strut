import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { CartContext } from '../CartContext';
import '@szhsin/react-menu/dist/core.css';
import img from '../../styling/images/shopping-cart.png';
import '../../styling/about.css';

function About() {
  const { cart } = useContext(CartContext);
  return (
    <div className="container4">
      <section className="about-nav-container">
        <div className="a-n-con">
          <header className="mobile-header">
            <Menu className="menu-icon" menuButton={<MenuButton>&#9776;</MenuButton>}>
              <MenuItem><Link to="/">Home</Link></MenuItem>
              <MenuItem><Link to="/shop">Shop</Link></MenuItem>
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
              <MenuItem><Link to="/about">About</Link></MenuItem>
              <MenuItem><Link to="/contact">Contact</Link></MenuItem>
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
            <Link to="/contact">Contact</Link>
          </nav>
          <Link to="/shop/cart" className="cart-btn">
            <img src={img} alt="cart icon" />
            <span className="cart-counter">{cart.length}</span>
          </Link>
        </div>
      </section>
      <section className="about-container">
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

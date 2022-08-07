import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import MobileHeader from './Header';
import AccNav from './AccNav';
import { CartContext } from './CartContext';
import { sort } from '../services/tools';
import img from '../styling/images/shopping-cart.png';
import img2 from '../styling/images/user.png';
import * as apiCalls from '../services/services';
import '../styling/order.css';

export default function Order() {
  const orderData = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const { cart } = useContext(CartContext);
  const [message, setMessage] = useState('');

  const { pathname } = window.location;
  const id = pathname.split('/')[2];

  // eslint-disable-next-line
  const moment = require('moment-timezone');
  return (
    <div id="container3">
      <section className="about-nav-container">
        <AccNav />
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
                <li><Link className="dropdown-item" to="/shop/livingRoom">LIVING ROOM</Link></li>
                <li><Link className="dropdown-item" to="/shop/diningKitchen">DINING & KITCHEN</Link></li>
                <li><Link className="dropdown-item" to="/shop/bedroom">BEDROOM</Link></li>
                <li><Link className="dropdown-item" to="/shop/storageMedia">STORAGE & MEDIA</Link></li>
                <li><Link className="dropdown-item" to="/shop/office">OFFICE</Link></li>
              </ul>
            </div>
            <Link to="/contact">Contact</Link>
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
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
      <div className="message">{message ? <p>{message}</p> : null}</div>
      {// eslint-disable-next-line
      orderData.map((e) => {
        if (e.id === id) {
          return (
            <Slide right key={e.id}>
              <div className="order-info">
                <p>
                  0rder #
                  {e.id}
                  {' '}
                  was placed on
                  {' '}
                  {moment.parseZone(e.create_time).format('mm/DD/yyyy')}
                  {' '}
                  and is currently
                  {' '}
                  {e.purchase_units[0].payments.captures[0].status}
                  .
                </p>
                <h1>Order Details</h1>
                <table id="collapse">
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                      <th> </th>
                    </tr>
                    <tr>
                      <td>{e.purchase_units[0].description}</td>
                      <td>
                        R
                        {sort(Number(e.purchase_units[0].amount.value))}
                      </td>
                    </tr>
                    <tr>
                      <td>Payment method:</td>
                      <td>{e.purchase_units[0].soft_descriptor}</td>
                    </tr>
                    <tr>
                      <td>Subtotal:</td>
                      <td>
                        R
                        {sort(Number(e.purchase_units[0].amount.value))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h1>Shipping Address</h1>
                <table id="separate">
                  <tr>
                    <th> </th>
                    <th> </th>
                  </tr>
                  <tr>
                    <td>Line 1:</td>
                    <td>{e.purchase_units[0].shipping.address.address_line_1}</td>
                  </tr>
                  <tr>
                    <td>City:</td>
                    <td>{e.purchase_units[0].shipping.address.admin_area_2}</td>
                  </tr>
                  <tr>
                    <td>Country code:</td>
                    <td>{e.purchase_units[0].shipping.address.country_code}</td>
                  </tr>
                  <tr>
                    <td>Postal code:</td>
                    <td>{e.purchase_units[0].shipping.address.postal_code}</td>
                  </tr>
                  <tr>
                    <td>Merchant id:</td>
                    <td>{e.purchase_units[0].payee.merchant_id}</td>
                  </tr>
                  <tr>
                    <td>Customer name:</td>
                    <td>{e.purchase_units[0].shipping.name.full_name}</td>
                  </tr>
                </table>
              </div>
            </Slide>
          );
        }
      })
      }
    </div>
  );
}

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState, useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileHeader from './Header';
import AccNav from './AccNav';
import { CartContext } from './CartContext';
import { getAllOrders } from '../redux/orders/order';
import { sort } from '../services/tools';
import img from '../styling/images/shopping-cart.png';
import img2 from '../styling/images/user.png';
// import img3 from '../../styling/images/lock.png';
import * as apiCalls from '../services/services';
import '../styling/ords.css';

export default function Orders() {
  const orderData = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const [message, setMessage] = useState('');
  const { cart } = useContext(CartContext);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer);
  useEffect(() => {
    dispatch(getAllOrders(userData));
  }, [dispatch]);
  if (orderData.length === 0 || orderData.length !== orders.length) {
    // eslint-disable-next-line
    orders.map((e) => {
      apiCalls.fetchOrder(e.link, e.amount, setMessage);
    });
  }
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
      <section className="order-table">
        <h2>Orders List</h2>
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <table id="o-table">
          <tbody>
            <tr className="order-row">
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th> </th>
            </tr>
            {(orderData.length > 0) ? (
              orderData.map((e) => (
                <tr key={e.id} className="order-row">
                  <td>
                    #
                    {e.id}
                  </td>
                  <td>{moment.parseZone(e.create_time).format('dd/MM/yyyy')}</td>
                  <td>{e.purchase_units[0].payments.captures[0].status}</td>
                  <td>
                    R
                    {sort(Number(e.purchase_units[0].amount.value))}
                  </td>
                  <td><Link to={`/order/${e.id}`} className="orderViewBtn">View</Link></td>
                </tr>
              ))
            ) : (
              <tr><td>You have no orders</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

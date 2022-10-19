import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext';
import * as apiCalls from '../../../services/services';
import MobileHeader from '../../Header';
import img from '../../../styling/images/shopping-cart.png';
import img2 from '../../../styling/images/user.png';

function ResetConfirmation() {
  const cart = useCart();
  const [message, setMessage] = useState('');
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  return (
    <div>
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
                <li><Link className="dropdown-item" to="/shop/livingRoom">LIVING ROOM</Link></li>
                <li><Link className="dropdown-item" to="/shop/diningKitchen">DINING & KITCHEN</Link></li>
                <li><Link className="dropdown-item" to="/shop/bedroom">BEDROOM</Link></li>
                <li><Link className="dropdown-item" to="/shop/storageMedia">STORAGE & MEDIA</Link></li>
                <li><Link className="dropdown-item" to="/shop/office">OFFICE</Link></li>
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
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <strong>
                      Hi,
                      {' '}
                      {userData.user.firstname}
                    </strong>

                  </li>
                  <li><Link className="dropdown-item" to="/account">ACCOUNT SETTINGS</Link></li>
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
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'flex' }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
      </svg>
      <div
        className="alert alert-success d-flex align-items-center justify-content-center"
        style={{
          width: '80%',
          margin: 'auto',
        }}
        role="alert"
      >
        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill" /></svg>
        <div>
          <div className="alert alert-success" role="alert">
            <h1>Reset Confirmation</h1>
            <p>
              You have requested to reset your password. Please check your email for
              a link to reset your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetConfirmation;

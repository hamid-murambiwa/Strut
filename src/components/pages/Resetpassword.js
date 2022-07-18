/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import MobileHeader from '../Header';
import * as apiCalls from '../../services/services';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import '../../styling/reset.css';

function Reset() {
  const [userData] = useState(JSON.parse(localStorage.getItem('user')));
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const urlString = window.location.href;
  const url = new URL(urlString);
  const token = url.searchParams.get('token');

  const { cart } = useContext(CartContext);
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
      <section className="reset">
        <h2>RESET PASSWORD</h2>
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <div className="error-message">
          {(errorMessage !== '') ? (
            <p key="error">
              &#8226;
              {'   '}
              {errorMessage}
            </p>
          ) : (null)}
        </div>
        <form
          onSubmit={(e) => {
            apiCalls.handlePasswordReset(
              e,
              token,
              password,
              passwordConfirmation,
              setMessage,
              setErrorMessage,
            );
          }}
        >
          <div className="l-con">
            <label>
              Password
              {' '}
              <span>required</span>
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="l-con">
            <label>
              Password Confirmation
              {' '}
              <span>required</span>
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <button type="submit">APPLY CHANGES</button>
        </form>
      </section>
    </div>
  );
}

export default Reset;

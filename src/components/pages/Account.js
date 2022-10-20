/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import * as apiCalls from '../../services/services';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import img3 from '../../styling/images/lock.png';
import MobileHeader from '../Header';
import AccNav from './shop pages/AccNav';
import '../../styling/account.css';

function Account() {
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const cart = useCart();
  return (
    <div>
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
                <a className="dropdown-item" href="/shop/categoryView/1">LIVING ROOM</a>
                <a className="dropdown-item" href="/shop/categoryView/2">DINING & KITCHEN</a>
                <a className="dropdown-item" href="/shop/categoryView/3">BEDROOM</a>
                <a className="dropdown-item" href="/shop/categoryView/4">STORAGE & MEDIA</a>
                <a className="dropdown-item" href="/shop/categoryView/5">OFFICE</a>
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
      <section className="login-container acc-con">
        <div className="acc-heading">
          <h3>ACCOUNT SETTINGS</h3>
        </div>
        {message !== '' ? (
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
            </svg>
            <div>
              {message}
            </div>
          </div>
        ) : (null)}
        {userData.logged_in ? (
          <div className="account-settings-con">
            <section className="login-form-container email-new-udate">
              <strong>Update Email</strong>
              <p>
                Current Email:
                {' '}
                {userData.user.email}
              </p>
              {(errorMessage.length !== 0) ? (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-fill-x" viewBox="0 0 16 16">
                    <path d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zM6.854 5.146 8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 1 1 .708-.708z" />
                  </svg>
                  <div>
                    {errorMessage}
                  </div>
                </div>
              ) : null}

              {load === true ? (
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                  <div className="bi spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div>
                    Loading...
                  </div>
                </div>
              ) : null}
              <form
                onSubmit={(e) => {
                  apiCalls.handleEmail(
                    e, newEmail, confirmNewEmail, userData, setErrorMessage, setLoad,
                  );
                }}
              >
                <div className="l-con">
                  <label>
                    New Email
                    {' '}
                    <span>required</span>
                  </label>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="l-con">
                  <label>
                    Confirm New Email
                    {' '}
                    <span>required</span>
                  </label>
                  <input
                    type="text"
                    value={confirmNewEmail}
                    onChange={(e) => setConfirmNewEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit">APPLY CHANGES</button>
              </form>
            </section>
            <section className="signup-link-container passwordupdate">
              <strong>Update Password</strong>
              <p>This password will update for all associated registries and accounts for STRUT</p>
              {(passMessage.length !== 0) ? (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-fill-x" viewBox="0 0 16 16">
                    <path d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zM6.854 5.146 8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 1 1 .708-.708z" />
                  </svg>
                  <div>
                    {passMessage}
                  </div>
                </div>
              ) : null}

              {load2 === true ? (
                <div className="alert alert-primary d-flex align-items-center" role="alert">
                  <div className="bi spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div>
                    Loading...
                  </div>
                </div>
              ) : null}
              <form
                onSubmit={(e) => {
                  apiCalls.handlePassword(
                    e,
                    password,
                    newPassword,
                    userData,
                    setMessage,
                    setPassMessage,
                    setLoad2,
                  );
                }}
              >
                <div className="l-con">
                  <label>
                    Original Password
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
                    New Password
                    {' '}
                    <span>required</span>
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" onClick={() => setLoad2(true)}>APPLY CHANGES</button>
              </form>
            </section>
          </div>
        ) : (
          <div className="login-prompt">
            <strong>Login To Access The Account Settings</strong>
            <img src={img3} alt="lock icon" className="lock-icon2" />
            <Link
              to="/login"
              onClick={
            () => {
              const element = document.querySelectorAll('.show');
              element.forEach((el) => {
                el.remove();
              });
            }
          }
            >
              Login
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Account;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import * as apiCalls from '../../services/services';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import img3 from '../../styling/images/lock.png';
import MobileHeader from '../Header';
import AccNav from '../AccNav';
import '../../styling/account.css';

function Account() {
  const [userData] = useState(JSON.parse(localStorage.getItem('user')));
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passMessage, setPassMessage] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { cart } = useContext(CartContext);
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
      <section className="login-container acc-con">
        <div className="acc-heading">
          <h3>ACCOUNT SETTINGS</h3>
        </div>
        <div className="message">{message ? <p>{message}</p> : null}</div>
        {userData.logged_in ? (
          <div className="account-settings-con">
            <section className="login-form-container email-new-udate">
              <strong>Update Email</strong>
              <p>
                Current Email:
                {' '}
                {userData.user.email}
              </p>
              <div className="error-message">
                {(errorMessage && errorMessage[0] !== 'Password and password confirmation do not match') ? (
                  <p>
                    &#8226;
                    {'   '}
                    {errorMessage}
                  </p>
                ) : null}
              </div>
              <form
                onSubmit={(e) => {
                  apiCalls.handleEmail(e, newEmail, confirmNewEmail, userData, setErrorMessage);
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
              <div className="error-message">
                {passMessage ? (
                  <p>
                    &#8226;
                    {'   '}
                    {passMessage}
                  </p>
                ) : null}
              </div>
              <form
                onSubmit={(e) => {
                  apiCalls.handlePassword(
                    e,
                    password,
                    newPassword,
                    userData,
                    setPassMessage,
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

                <button type="submit">APPLY CHANGES</button>
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

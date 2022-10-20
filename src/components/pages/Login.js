/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import * as apiCalls from '../../services/services';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import MobileHeader from '../Header';
import '../../styling/login.css';

function Login() {
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [load, setLoad] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const cart = useCart();

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
      <section className="login-container">
        <div className="l-c-2">
          <div className="message">{message ? <p>{message}</p> : null}</div>
          <section className="login-form-container">
            <strong>SIGN IN</strong>
            <div className="error-message">
              {(errorMessage.length !== 0 && errorMessage[0] !== 'Password and password confirmation do not match') ? (
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

            </div>
            <form
              onSubmit={(e) => {
                apiCalls.handleSignin(
                  e,
                  username,
                  password,
                  setErrorMessage,
                  setLoad,
                );
              }}
            >
              <div className="l-con">
                <label>
                  Username:
                  {' '}
                  <span>required</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="l-con">
                <label>
                  Password
                  {' '}
                  <span>required</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-primary for-btn-to"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end !important',
                  fontSize: '12px',
                  textDecoration: 'underline',
                }}
                data-bs-whatever="Reset"
              >
                Forgot your password ?
              </button>

              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">ENTER YOUR EMAIL TO YOUR RESET PASSWORD</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3 reset-email-con">
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                        <p className="msg-pty">{message || null}</p>
                        <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                        <input type="text" className="form-control" id="recipient-name" onChange={(e) => { setEmail(e.target.value); }} />
                        <button type="button" className="btn btn-primary btn-reset-email" onClick={() => { apiCalls.handlePasswordForgot(email, setErrorMessage, setMessage); }}>Send request</button>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit">LOGIN</button>
            </form>
          </section>
          <section className="signup-link-container">
            <strong>CREATE AN ACCOUNT</strong>
            <div>
              <li>Option to place orders and make payments</li>
              <li>Speedy checkout</li>
              <li>Easily track orders and view order history</li>
            </div>
            <Link to="/signup">SIGN UP</Link>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Login;

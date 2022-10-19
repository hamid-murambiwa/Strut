/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import * as apiCalls from '../../services/services';
import img from '../../styling/images/shopping-cart.png';
import img2 from '../../styling/images/user.png';
import MobileHeader from '../Header';
import '../../styling/signup.css';

function Signup() {
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userName, setUserName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
                <a className="dropdown-item" href="/shop/categoryView/1">LIVING ROOM</a>
                <li />
                <a className="dropdown-item" href="/shop/categoryView/2">DINING & KITCHEN</a>
                <li />
                <a className="dropdown-item" href="/shop/categoryView/3">BEDROOM</a>
                <li />
                <a className="dropdown-item" href="/shop/categoryView/4">STORAGE & MEDIA</a>
                <li />
                <a className="dropdown-item" href="/shop/categoryView/5">OFFICE</a>
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
      <section className="Signup-container">
        <section className="Signup-form-container">
          <strong>CREATE AN ACCOUNT</strong>
          <p>
            Want to check out faster and keep track of your online and
            in-store orders? Create an account now and save your payment
            method.
          </p>
          <div className="message">{message ? <p>{message}</p> : null}</div>
          <div className="error-message">
            {(errorMessage && errorMessage[0] !== 'Password and password confirmation do not match' && errorMessage[0] !== 'Email has already been taken') ? (
              errorMessage.map((e) => (
                <p key="error">
                  &#8226;
                  {'   '}
                  {e}
                </p>
              ))
            ) : null}
          </div>
          <form
            onSubmit={(e) => {
              apiCalls.handleSignup(
                e,
                firstname,
                lastname,
                userName,
                phonenumber,
                email,
                password,
                passwordConfirmation,
                setMessage,
                setErrorMessage,
              );
            }}
          >
            <div className="l-con">
              <label>
                First Name
                {' '}
                <span>required</span>
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="l-con">
              <label>
                Surname Name
                {' '}
                <span>required</span>
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="l-con">
              <label>
                Username
                {' '}
                <span>required</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="l-con">
              <label>
                Phone Number
                {' '}
                <span>required</span>
              </label>
              <input
                type="text"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                required
              />
            </div>
            <div className="l-con">
              <label>
                Email
                {' '}
                <span>required</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="error-message">{errorMessage[0] === 'Email has already been taken' ? <p>{errorMessage}</p> : null}</div>
            <div className="l-con">
              <label>
                Create Password
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
            <div className="error-message">{errorMessage[0] === 'Password and password confirmation do not match' ? <p>{errorMessage}</p> : null}</div>
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

            <button type="submit">CREATE ACCOUNT</button>
          </form>
        </section>
      </section>
    </div>
  );
}

export default Signup;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as apiCalls from '../services/services';

function AccNav() {
  const [message, setMessage] = useState('');
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  return (
    userData.logged_in ? (
      <section className="shop-navigation adjust-nav">
        <strong>
          Hi,
          {' '}
          {userData.user.firstname}
        </strong>
        <nav>
          <Link className="dropdown-item" to="/account">ACCOUNT SETTINGS</Link>
          <Link className="dropdown-item" to="/orders">MY ORDERS</Link>
        </nav>
        <button type="button" className="s-o" onClick={() => apiCalls.handleSignout(setMessage)}>LOGOUT</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </section>
    ) : null
  );
}

export default AccNav;

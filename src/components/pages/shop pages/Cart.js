import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import {
  useCart, useCartRemove, useCartIncrement, useCartDecrement,
} from '../../CartContext';
import img from '../../../styling/images/delete.png';
import img2 from '../../../styling/images/lock.png';
import { sort } from '../../../services/tools';
import '../../../styling/cart.css';

function Cart() {
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const cart = useCart();
  const remove = useCartRemove();
  const increment = useCartIncrement();
  const decrement = useCartDecrement();

  function totalPrice() {
    let price = 0;

    // eslint-disable-next-line
    cart.map((e) => {
      price += e.price;
    });

    return price.toFixed(2);
  }

  function totalItems() {
    let quantity = 0;

    // eslint-disable-next-line
    cart.map((e) => {
      quantity += e.quantity;
    });

    return quantity;
  }

  return (
    <div id="container3">
      <section className="conc">
        <div className="cart-summary">
          <div className="total">
            <strong>Your Cart: </strong>
            <strong>
              {totalItems()}
              {' '}
              {totalItems() === 1 ? 'item' : 'items'}
            </strong>
          </div>
          <hr />
          <div className="total">
            <strong>Total</strong>
            <strong>
              R
              {totalPrice()}
            </strong>
          </div>
          <hr />
          <div className="checkout-con">
            <Link to="/shop" className="checkout">
              CONTINUE SHOPPING
            </Link>
            <h3>OR</h3>
            {userData.logged_in ? (
              // eslint-disable-next-line
              <Link
                to={cart.length > 0 ? '/shop/paypal' : ''}
                className="c-btn"
                onClick={() => {
                  if (cart.length < 1) {
                    // eslint-disable-next-line
                    alert('Your cart is empty');
                  }
                }}
              >
                CHECKOUT NOW
              </Link>
            ) : (
              <>
                <button type="button" className="c-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  CHECKOUT NOW
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">UNAUTHORISED</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        <ul className="login-pop-up">
                          <strong className="CHECK">Login To Checkout</strong>
                          <img src={img2} alt="lock icon" className="lock-icon" />
                          <li><Link onClick={() => { setTimeout(() => { window.location.reload(); }, 10); }} to="/login">Login</Link></li>
                        </ul>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <section className="cart-container">
          {cart.map((cart, index) => (
            /* eslint-disable */
            <Slide bottom>
            <div className="cart">
              <div className="cart-details">
                <img className="cart-img" src={cart.a_image} alt={`${cart.name} image`} />
                <div className="cart-dc">
                  <p>{cart.name}</p>
                  <strong>In Stock</strong>
                </div>
              </div>
              <div className="cart-settings">
                <strong>
                  R
                  {sort(cart.price)}
                </strong>
                <div className="quantity">
                  <button type="button" className="q-btn" onClick={() => increment(cart.id)}>
                    +
                  </button>
                  <p id="quantity-value">{cart.quantity}</p>
                  <button type="button" className="q-btn" onClick={() => decrement(cart.id)}>
                    -
                  </button>
                </div>
                <button type="button" className="delete-cart-btn" onClick={() => remove(index)}>
                  <img src={img} alt="delete icon" />
                  Delete
                </button>
              </div>
            </div>
            </Slide>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Cart;

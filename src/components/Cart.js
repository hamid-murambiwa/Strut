import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import img from '../styling/images/delete.png';
import img2 from '../styling/images/lock.png';
import { sort } from '../services/tools';
import '../styling/cart.css';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));

  function increment(id) {
    /* eslint-disable */
    cart.map((e, index) => {
      if (e.id === id) {
        cart[index].price = e.price + (e.price / e.quantity);
        cart[index].quantity = e.quantity + 1;
        setCart(cart);
        const data = JSON.stringify(cart);
        localStorage.setItem('cart', data);
      }
    });
    window.location.reload();
  }

  function decrement(id) {
    /* eslint-disable */
    cart.map((e, index) => {
      if (e.id === id && e.quantity > 1) {
        cart[index].price = e.price - (e.price / e.quantity);
        cart[index].quantity = e.quantity - 1;
        setCart(cart);
        const data = JSON.stringify(cart);
        localStorage.setItem('cart', data);
      }
    });
    window.location.reload();
  }

  function handleDelete(index) {
    cart.splice(index, 1);
    setCart(cart);
    const data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
    window.location.reload();
  }

  function totalPrice() {
    let price = 0;

    cart.map((e) => {
      price += e.price;
    });

    return price.toFixed(2);
  }

  function totalItems() {
    let quantity = 0;

    cart.map((e) => {
      quantity += e.quantity;
    });

    return quantity;
  }

  return (
    <div id="container3">
      <section className="conc">
        <section className="cart-container">
          {cart.map((cart, index) => (
            /* eslint-disable */
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
                  <p>{cart.quantity}</p>
                  <button type="button" className="q-btn" onClick={() => decrement(cart.id)}>
                    -
                  </button>
                </div>
                <button type="button" className="delete-cart-btn" onClick={() => handleDelete(index)}>
                  <img src={img} alt="delete icon" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
        <div className="cart-summary">
          <div className="total">
            <strong>Your Cart: </strong>
            <strong>
              {totalItems()}
              {' '}
              items
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
            <Link to="/shop/paypal" className="c-btn">
              CHECKOUT NOW
            </Link>
            ) : (
                  <>
                  <button type="button" class="c-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    CHECKOUT NOW
                  </button><div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">UNAUTHORISED</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <ul class="login-pop-up">
                            <strong className="CHECK">Login To Checkout</strong>
                            <img src={img2} alt="lock icon" className="lock-icon" />
                            <li><Link onClick={() => { setTimeout(() => { window.location.reload(); }, 10) }} to="/login">Login</Link></li>
                          </ul>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;

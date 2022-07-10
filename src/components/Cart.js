import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import img from "../styling/images/delete.png";
import "../styling/cart.css";

function sort(price) {
    let locales = [
        undefined,
        'en-US',
      ];
      let n = price;
      let opts = { minimumFractionDigits: 2 };
      for (let i = 0; i < locales.length; i++) {
        return n.toLocaleString(locales[i], opts);
      }
}

function Cart() {
    const { cart, setCart } = useContext(CartContext);

    function increment(id) {
        cart.map((e, index) => {
            if (e.id === id) {
                cart[index]['price'] = e.price + (e.price / e.quantity);
                cart[index]['quantity'] = e.quantity + 1;
                setCart(cart);
                const data = JSON.stringify(cart);
                localStorage.setItem('cart', data);
            }
        })
        window.location.reload();
    }

    function decrement(id) {
        cart.map((e, index) => {
            if (e.id === id && e.quantity > 1) {
                cart[index]['price'] = e.price - (e.price / e.quantity);
                cart[index]['quantity'] = e.quantity - 1;
                setCart(cart);
                const data = JSON.stringify(cart);
                localStorage.setItem('cart', data);
            }
        })
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

        cart.map(e => {
            price = price + e.price
        });

        return price.toFixed(2);
    }

    function totalItems() {
        let quantity = 0;

        cart.map(e => {
            quantity = quantity + e.quantity
        });

        return quantity;
    }

    return (
        <div id="container3">
            <section className="conc">
            <section className="cart-container">
                {cart.map((cart, index) => (
                    <div className="cart">
                        <div className="cart-details">
                        <img className="cart-img" src={cart.a_image} alt={cart.name + " image"} />
                        <div className="cart-dc">
                            <p>{cart.name}</p>
                            <strong>In Stock</strong>
                        </div>
                        </div>
                        <div className="cart-settings">
                            <strong>R {sort(cart.price)}</strong>
                            <div className="quantity">
                                <button type="button" className="q-btn" onClick={() => increment(cart.id)}>
                                    +
                                </button>
                                <p>{cart.quantity}</p>
                                {console.log(typeof cart.quantity)}
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
                    <strong>{totalItems()} items</strong>
                    </div>
                    <hr />
                    <div className="total">
                        <strong>Total</strong>
                        <strong>R {totalPrice()}</strong>
                    </div>
                    <hr />
                    <div className="checkout-con">
                        <Link to="/shop" className="checkout">
                            CONTINUE SHOPPING
                        </Link>
                        <h3>OR</h3>
                        <button type="button" className="c-btn">
                            CHECKOUT NOW
                        </button>
                    </div>
            </div>
            </section>
        </div>
        )
}

export default Cart;
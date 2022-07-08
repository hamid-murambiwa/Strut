import React, { useContext } from "react";
import { CartContext } from "./CartContext";
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
    const { cart } = useContext(CartContext);

    // function handleSubmit() {
    //     console.log("submit");
    // }

    return (
        <div id="container3">
            <section className="cart-container">
                {cart.map(cart => (
                    <div className="cart">
                        <img className="cart-img" src={cart.a_image} alt={cart.name + " image"} />
                        <div className="cart-details">
                            <p>{cart.name}</p>
                            <strong>In Stock</strong>
                        </div>
                        <div>
                            <strong>R {sort(cart.price)}</strong>
                        </div>
                    </div>
                ))}
            </section>
        </div>
        )
}

export default Cart;
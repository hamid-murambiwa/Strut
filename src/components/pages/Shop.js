import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext } from "../CartContext";
import img from "../../styling/images/shopping-cart.png";
import "../../styling/shop.css";

function Shop() {
  const { cart } = useContext(CartContext);

  console.log(cart.length);

    return (
        <div>
            <section id="shop-container">
                <div className="s-b-con">
                    <div className="home-btn">
                        <Link to="/"><h2>Strut</h2></Link>
                    </div>
                    <Link to="/shop/cart" className="cart-btn">
                        <img src={img} alt="cart icon" />
                        <span className="cart-counter">{cart.length}</span>
                    </Link>
                </div>
            </section>
            <div>
                <section className="shop-navigation">
                    <Link to="/shop"><strong>FURNITURE</strong></Link>
                    <nav>
                        <Link to="livingRoom">LIVING ROOM</Link>
                        <Link to="diningKitchen">DINING & KITCHEN</Link>
                        <Link to="bedroom">BEDROOM</Link>
                        <Link to="storageMedia">STORAGE & MEDIA</Link>
                        <Link to="office">OFFICE</Link>
                    </nav>
                </section>
                <Outlet />
            </div>
        </div>
    );
}

export default Shop;
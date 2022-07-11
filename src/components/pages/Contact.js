import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../CartContext";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import img from "../../styling/images/shopping-cart.png";
import "../../styling/contact.css";

function Contact() {
    const { cart } = useContext(CartContext);
    return (
        <div className="container5">
        <section className="about-nav-container">
            <div className="a-n-con">
                <header className="mobile-header">
                <Menu className='menu-icon' menuButton={<MenuButton>&#9776;</MenuButton>}>
                    <MenuItem><a href="/">Home</a></MenuItem>
                    <MenuItem><a href="/shop">Shop</a></MenuItem>
                    <div class="btn-group dropend">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Furniture Categories
                    </button>
                    <ul class="dropdown-menu">
                        <Link to="/shop/livingRoom">LIVING ROOM</Link>
                        <Link to="/shop/diningKitchen">DINING & KITCHEN</Link>
                        <Link to="/shop/bedroom">BEDROOM</Link>
                        <Link to="/shop/storageMedia">STORAGE & MEDIA</Link>
                        <Link to="/shop/office">OFFICE</Link>
                    </ul>
                    </div>
                    <MenuItem><a href="/about">About</a></MenuItem>
                    <MenuItem><a href="/contact">Contact</a></MenuItem>
                </Menu>
                </header>
                <div className="home-btn">
                    <Link to="/"><h2>Strut</h2></Link>
                </div>
                    <nav>
                        <a href="shop">Shop</a>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Furniture Categories
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="/shop/livingRoom">LIVING ROOM</a></li>
                            <li><a class="dropdown-item" href="/shop/diningKitchen">DINING & KITCHEN</a></li>
                            <li><a class="dropdown-item" href="/shop/bedroom">BEDROOM</a></li>
                            <li><a class="dropdown-item" href="/shop/storageMedia">STORAGE & MEDIA</a></li>
                            <li><a class="dropdown-item" href="/shop/office">OFFICE</a></li>
                        </ul>
                    </div>
                        <a href="about">About</a>
                    </nav>
                <Link to="/shop/cart" className="cart-btn">
                    <img src={img} alt="cart icon" />
                    <span className="cart-counter">{cart.length}</span>
                </Link>
            </div>
        </section>
        <section className="contact-container">
            <hr />
            <div className="contact-heading">
            <h4>Contact</h4>
            </div>
            <hr />
            <section className="c-info-con">
            <div className="c-con">
                <h3>NATIONAL HOTLINE</h3>
                <p>065 918 7764</p>
            </div>
            <div className="c-con">
                <h3>NEED ASSISTANCE</h3>
                <p>machipisajunior@gmail.com</p>
                <p>Email Us: Contact us via our email address and our staff will get back to you as soon as possible.</p>
            </div>
            </section>
            <hr />
                <h1>Leave a message</h1>
            <div id="contacts" className="contact-con">
            <div className="form-con">
                <form className="form" action="https://formspree.io/f/xnqwgead" method="post">
                    <input name="User" placeholder="Username" type="text" class="form-control" required />
                    <input placeholder="Email Address" name="Email" id="email" type="email" class="form-control" required />
                    <textarea name="message" rows="4" placeholder="Leave a Message" class="form-textarea" required></textarea>
                    <div className="btn-submit-con">
                    <button type="submit" class="contact-btn">Send Message</button>
                    </div>
                </form>
            </div>
            <hr />
            </div>
        </section>
        </div>
    );
}

export default Contact;
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories } from '../../redux/categories/categories';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import img from "../../styling/images/icon-arrow.svg";
import img2 from "../../styling/images/wall3.jpeg";
import img21 from "../../styling/images/wall2.jpeg";
import img3 from "../../styling/images/wall.jpeg";
import img31 from "../../styling/images/wall4.jpeg"
import '../../styling/home.css';

function Home() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categoriesReducer);
    useEffect(() => {
      dispatch(fetchAllCategories());
    }, [dispatch]);

    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);

    return (
        <section>
            <div id="container1">
                <section className={isActive ? "header-con iactive" : "header-con inactive"} onMouseEnter={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false) }}>
                    <div className={isActive ? "nav-con nav-active" : "nav-con nav-inactive"}>
                    <header className="mobile-header">
                    <Menu className='menu-icon' menuButton={<MenuButton className="burger">&#9776;</MenuButton>}>
                        <MenuItem><a href="/">Home</a></MenuItem>
                        <MenuItem><a href="/shop">Shop</a></MenuItem>
                        <div class="btn-group dropend">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Furniture Categories
                        </button>
                        <ul class="dropdown-menu">
                            <Link to="shop/livingRoom">LIVING ROOM</Link>
                            <Link to="shop/diningKitchen">DINING & KITCHEN</Link>
                            <Link to="shop/bedroom">BEDROOM</Link>
                            <Link to="shop/storageMedia">STORAGE & MEDIA</Link>
                            <Link to="shop/office">OFFICE</Link>
                        </ul>
                        </div>
                        <MenuItem><a href="/about">About</a></MenuItem>
                        <MenuItem><a href="/contact">Contact</a></MenuItem>
                    </Menu>
                    </header>
                        <h1>Strut</h1>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="shop">Shop</Link>
                            <Link to="about">About</Link>
                            <Link to="contact">Contact</Link>
                        </nav>
                    </div>
                </section>
                <section className="carousel-con">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval={3500}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <section className="d-con">
                                    <h1>Discover innovative ways to decorate</h1>
                                    <p>
                                        We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine 
                                        form and function in bringing your vision to life. Create a room in your own style with our collection and make 
                                        your property a reflection of you and what you love.
                                    </p>
                                    <Link to="/shop" className="shop-btn"><h3>SHOP NOW</h3><img src={img} alt="arrow icon" /></Link>
                                </section>
                            </div>
                            {categories.length !== 0 ? (
                                categories.data.map((category) => (
                                    <Link to={"shop/" + category.route} className="carousel-item" key={category.id}>
                                        <section id="carousel-content" style={{backgroundImage: `url(${category.image})`}}>
                                            <h3>{category.name}</h3>
                                        </section>
                                    </Link>
                                ))
                            ) : (null)
                            }
                        </div>
                        <div className="carousel-btn-con">
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <section id="container2">
                    <div className="c-2-a" onMouseEnter={() => { setIsActive2(true) }} onMouseLeave={() => { setIsActive2(false) }} onTouchStart={() => { setIsActive2(true) }} onTouchEnd={() => { setIsActive2(false) }} style={{backgroundImage: "url(" + (isActive2 ? (img21) : (img2)) + ")"}}>
                    </div>
                    <Link to="about" className="c-2-b">
                        <h2>ABOUT OUR FURNITURE</h2>
                        <p>
                            Our multifunctional collection blends design and function to suit your
                            individual taste. Make each room unique, or pick a cohesive theme that best 
                            express your interests and what inspires you. Find the furniture pieces you 
                            need, from traditional to contemporary styles or anything in between.
                            Product specialists are available to help you create your dream space.
                        </p>
                    </Link>
                    <div className="c-2-c" onMouseEnter={() => { setIsActive3(true) }} onMouseLeave={() => { setIsActive3(false) }} onTouchStart={() => { setIsActive2(true) }} onTouchEnd={() => { setIsActive2(false) }} style={{backgroundImage: "url(" + (isActive3 ? (img31) : (img3)) + ")"}}>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Home;
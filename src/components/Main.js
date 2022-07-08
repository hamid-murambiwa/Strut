import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories } from '../redux/categories/categories';
import { Link } from "react-router-dom";
import '../styling/main.css';

function Main() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categoriesReducer);
    useEffect(() => {
      dispatch(fetchAllCategories());
    }, [dispatch]);

    return (
        <div id="container3">
            <h2>Furniture</h2>
            <section id="grid">
            {categories.length !== 0 ? (
                                categories.data.map((category) => (
                                    <Link to={category.route} className="grid-item" key={category.id}>
                                        <section id="grid-content">
                                            <img src={category.image} alt={category.name + 'image'} />
                                            <p>{category.name}</p>
                                        </section>
                                    </Link>
                                ))
                            ) : (null)
            }
            </section>
        </div>
    );
}

export default Main;
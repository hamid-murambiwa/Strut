import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import { fetchAllCategories } from '../../../redux/categories/categories';
import '../../../styling/main.css';

function Main() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div id="container3">
      <h2>Furniture</h2>
      {categories.length === 0 ? (
        <div className="s-con">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <section id="grid">
          {categories.length !== 0 ? (
            categories.data.map((category) => (
              <Slide bottom key={category.id}>
                <Link to={`/shop/categoryView/${category.id}`} className="grid-item">
                  <section id="cat-img">
                    <img src={category.image} alt={`${category.name}`} />
                    <p>{category.name}</p>
                  </section>
                </Link>
              </Slide>
            ))
          ) : (null)}
        </section>
      )}
    </div>
  );
}

export default Main;

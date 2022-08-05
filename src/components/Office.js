import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFurniture } from '../redux/furnitureItems/furniture';
import { sort } from '../services/tools';

function Office() {
  const dispatch = useDispatch();
  const furniture = useSelector((state) => state.furnitureReducer);
  useEffect(() => {
    dispatch(getAllFurniture());
  }, [dispatch]);

  const [isActive1, setIsActive1] = useState({
    activeObject: null,
  });

  function toggleActive(index) {
    setIsActive1({ ...isActive1, activeObject: index });
  }

  return (
    <div id="container3">
      <div className="prod-nav">
        <Link to="/shop">FURNITURE</Link>
      </div>
      <h3>OFFICE FURNITURE</h3>
      {furniture.length === 0 ? (
        <div className="s-con">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <section id="grid">
          {furniture.length !== 0 ? (
            furniture.map((item, index) => (
              (item.category_id === 5) ? (
                <Slide bottom>
                  <Link to={`/shop/${item.id}`} className="grid-item" key={item.id}>
                    <section id="grid-content">
                      <img src={isActive1.activeObject === index ? (item.b_image) : (item.a_image)} alt={`${item.name}`} onMouseEnter={() => { toggleActive(index); }} onMouseLeave={() => { setIsActive1({ ...isActive1, activeObject: null }); }} onTouchStart={() => { toggleActive(index); }} onTouchEnd={() => { setIsActive1({ ...isActive1, activeObject: null }); }} />
                      <p>{item.name}</p>
                      <p className="price">
                        R
                        {sort(item.price)}
                      </p>
                    </section>
                  </Link>
                </Slide>
              ) : (null)
            ))
          ) : (null)}
        </section>
      )}
    </div>
  );
}

export default Office;

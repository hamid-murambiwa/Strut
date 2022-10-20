import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import StarsRating from 'react-star-rate';
import { useSelector, useDispatch } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import { getAllFurniture } from '../../redux/furnitureItems/furniture';
import { useCartAdd } from '../CartContext';
import {
  Page, findId, findCategoryName, getDate, sort, decrement, increment,
} from '../../services/tools';
import * as apiCalls from '../../services/services';
import img from '../../styling/images/button.png';
import img2 from '../../styling/images/cancel.png';
import img3 from '../../styling/images/lock.png';
import '../../styling/product.css';

let images = [];

function ProductDisplay() {
  const [reviews, setReviews] = useState([{
    id: 'pk',
    overal_rating: 0,
    title: 'title',
    description: 'reviewDes',
    furniture_item_id: Page(),
  }]);

  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [reviewBtn, setReviewBtn] = useState(false);
  const [title, setTitle] = useState('');
  const [reviewDes, setReviewDes] = useState('');
  const [rating, setRating] = useState(0);
  const add = useCartAdd();

  const [averageRating, setAverageRating] = useState(0);
  const [category, setCategory] = useState(0);

  const dispatch = useDispatch();
  const furniture = useSelector((state) => state.furnitureReducer);

  useEffect(() => {
    dispatch(getAllFurniture());
    /* eslint-disable */
    apiCalls.componentDidMount(findId, Page, averageRating, reviews, setReviews, setMessage, message, setAverageRating);
  }, [dispatch]);

  furniture.map((item) => {
    if (item.id === Page()) {
      images = [
        {
          original: item.a_image,
          thumbnail: item.a_image,
        },
        {
          original: item.b_image,
          thumbnail: item.b_image,
        },
        {
          original: item.c_image,
          thumbnail: item.c_image,
        },
        {
          original: item.d_image,
          thumbnail: item.d_image,
        },
      ]
    }
  });

  useMemo(() => {
      furniture.map((item) => {
        if (item.id === Page()) {
      setCategory(item.category_id);
    }
    });
  }, [furniture]);

  return (
    <div id="container3">
      <div className="prod-nav">
        <Link to="/shop">FURNITURE</Link>
        {' '}
        /
        <a href={`/shop/categoryView/${category}`}>{findCategoryName()}</a>
      </div>
      <div className="message">
        {message}
      </div>
      <section id="prod-container">
        <ImageGallery items={images} showPlayButton={false} thumbnailPosition="left" showNav={false} width="100" />
        {furniture.length !== 0 ? (
          furniture.map((furniture) => (
            (furniture.id === Page()) ? (
              <div className="p-c-con" key={furniture.id}>
                <strong>{furniture.name}</strong>
                <div>
                  R
                  {sort(furniture.price)}
                </div>
                <strong>Details</strong>
                <p>{furniture.description}</p>
                <div>
                  <li>{furniture.designer}</li>
                  <li>{furniture.material}</li>
                  <li>{furniture.made}</li>
                </div>
                <div className="quantity">
                  <button type="button" className="q-btn" onClick={() => decrement(quantity, setQuantity)}>
                    -
                  </button>
                  <p>{quantity}</p>
                  <button type="button" className="q-btn" onClick={() => increment(quantity, setQuantity)}>
                    +
                  </button>
                </div>
                <button type="button" className="c-btn" onClick={() => add(furniture, quantity, setMessage, Page)}>
                  ADD TO CART
                </button>
                <div className={reviewBtn ? 'rating-con+ inactiveBTN' : 'rating-con+ activeBTN'} onClick={() => setReviewBtn(true)}>
                  <div className="rating-info">
                    <strong>REVIEWS</strong>
                    <div className="stars-con">
                      <p>
                        (
                        {reviews.length}
                        )
                      </p>
                      <StarsRating
                        disabled
                        value={averageRating}
                      />
                    </div>
                    <strong>+</strong>
                  </div>
                </div>
                <hr />
                <div className={reviewBtn ? 'rating-con- activeBTN' : 'rating-con- inactiveBTN'}>
                  <div className="rating-info dotted" onClick={() => setReviewBtn(false)}>
                    <strong>REVIEWS</strong>
                    <strong>-</strong>
                  </div>

                  <div className="containment2">
                    <h4>5.0</h4>
                    <StarsRating
                      disabled
                      value={averageRating}
                    />
                    <p>
                      {reviews.length}
                      {' '}
                      {reviews.length === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                  <button type="button" className="btn btn-primary checkout long" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    WRITE A REVIEW
                  </button>
                  <strong>{(reviews > 1) ? ('All REVIEWS :') : ('This item has no reviews')}</strong>
                  <hr style={{ borderTop: 'dotted 1px' }} />
                  {reviews.map((review, index) => (
                    <div className="review-con" key={index}>
                      <div className="review-info">
                        <div className="stars-con">
                          <StarsRating
                            disabled
                            value={review.overal_rating}
                          />
                        </div>
                        <h4>{review.title}</h4>
                        <p>{review.description}</p>
                        <i className="p">
                          <strong>Created by {review.username}</strong>
                          {' '}
                          {getDate(review.created_at)}
                          {' '}
                          ago
                        </i>
                      </div>
                      <hr style={{ borderTop: 'dotted 1px' }} />
                    </div>
                  ))}

                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <section className="modal-sub-con">
                        <div className="side-bar">
                          <img className="modal-img" src={furniture.a_image} alt={`Image of the ${furniture.name} product`} />
                          <strong>{furniture.name}</strong>
                        </div>
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">MY REVIEW</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src={img} alt="close button icon" /></button>
                          </div>
                          <div className="modal-body">
                          {userData.logged_in ? (
                            <div className="App">
                              <i>Required fields are marked with *</i>
                              <form onSubmit={(e) => apiCalls.handleReview(e, rating, title, reviewDes, userData, setTitle, setReviewDes, setMessage)}>
                                <div className="f-con">
                                  <section className="overal">
                                    <strong>Overall Rating*</strong>
                                    <StarsRating
                                      value={rating}
                                      onChange={(e) => setRating(e)}
                                    />
                                    <div className="o-v">
                                      <p>Required:Overall Rating</p>
                                      <img className="alert-btn" src={img2} alt="alert icon" />
                                    </div>
                                  </section>
                                </div>
                                <div className="f-con">
                                  <label>Review Title*</label>
                                  <input
                                    type="text"
                                    value={title}
                                    placeholder="Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="f-con">
                                  <label>Review*</label>
                                  <textarea
                                    type="text"
                                    value={reviewDes}
                                    placeholder="Review"
                                    onChange={(e) => setReviewDes(e.target.value)}
                                    required
                                  />
                                </div>

                                <button type="submit">POST REVIEW</button>

                                <div className="message">{message ? <p>{message}</p> : null}</div>
                              </form>
                            </div>
                          ) : (
                            <div className="login-prompt">
                              <strong>Login To Write A Review</strong>
                              <img src={img3} alt="lock icon" className="lock-icon2" />
                              <Link to={'/login'} onClick={
                                () => {
                                  const element = document.querySelectorAll('.show');
                                  element.forEach((el) => {
                                    el.remove();
                                  });
                                }
                              }>Login</Link>
                            </div>
                          )}
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            ) : (null)
          ))
              ) : (
        <div className="s-con">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        )}
      </section>
    </div>
  );
}

export default ProductDisplay;

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
  const [errorMessage, setErrorMessage] = useState([]);
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
        <Link to={`/shop/categoryView/${category}`}>{findCategoryName()}</Link>
      </div>
      {message !== '' ? (
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
          </svg>
          <div>
            {message}
          </div>
        </div>
      ) : (null)
      }
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
                  <input type="number" onKeyDown={(e) => {
                    if (e.keyCode === 38) {
                      increment(quantity, setQuantity);
                    } else if (e.keyCode === 40) {
                      decrement(quantity, setQuantity);
                    }
                  }} value={quantity} min="1" max="2000" />
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
                              <form onSubmit={(e) => apiCalls.handleReview(e, rating, title, reviewDes, userData, setTitle, setReviewDes, setMessage, setErrorMessage)}>
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

                                {message !== '' ? (
                                    <div className="alert alert-success d-flex align-items-center" role="alert">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                      </svg>
                                      <div>
                                        {message}
                                      </div>
                                    </div>
                                  ) : (null)
                                }
                                
                                {(errorMessage.length !== 0 && errorMessage[0] !== 'Password and password confirmation do not match') ? (
                                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-fill-x" viewBox="0 0 16 16">
                                      <path d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zM6.854 5.146 8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 1 1 .708-.708z" />
                                    </svg>
                                    <div>
                                      {errorMessage}
                                    </div>
                                  </div>
                                ) : null}
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
                  <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
        )}
      </section>
    </div>
  );
}

export default ProductDisplay;

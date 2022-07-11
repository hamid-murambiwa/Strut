import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StarsRating from 'react-star-rate';
import { useSelector, useDispatch } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import { getAllFurniture } from '../../redux/furnitureItems/furniture';
import { CartContext } from '../CartContext';
import {
  Page, findId, findRoute, findCategoryName, handleSubmit, getDate, sort, decrement, increment,
} from '../../services/tools';
import * as apiCalls from '../../services/services';
import img from '../../styling/images/button.png';
import img2 from '../../styling/images/cancel.png';
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

  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [reviewBtn, setReviewBtn] = useState(false);
  const [title, setTitle] = useState('');
  const [reviewDes, setReviewDes] = useState('');
  const [rating, setRating] = useState(0);

  const [averageRating, setAverageRating] = useState(0);

  const dispatch = useDispatch();
  const furniture = useSelector((state) => state.furnitureReducer);
  useEffect(() => {
    dispatch(getAllFurniture());
    /* eslint-disable */
    apiCalls.componentDidMount(findId, Page, averageRating, reviews, setReviews, setMessage, message, setAverageRating);
  }, [dispatch]);

  furniture.map((item) => (
    (item.id === Page()) ? (
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
    ) : (null)
  ));

  return (
    <div id="container3">
      <div className="prod-nav">
        <Link to="/shop">FURNITURE</Link>
        {' '}
        /
        <a href={findRoute()}>{findCategoryName()}</a>
      </div>
      <div className="message">
        {message}
      </div>
      <section id="prod-container">
        <ImageGallery items={images} showPlayButton={false} thumbnailPosition="left" showNav={false} width="100" />
        {furniture.length !== 0 ? (
          furniture.map((item) => (
            (item.id === Page()) ? (
              <div className="p-c-con" key={item.id}>
                <strong>{item.name}</strong>
                <div>
                  R
                  {sort(item.price)}
                </div>
                <strong>Details</strong>
                <p>{item.description}</p>
                <div>
                  <li>{item.designer}</li>
                  <li>{item.material}</li>
                  <li>{item.made}</li>
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
                <button type="button" className="c-btn" onClick={() => handleSubmit(item, cart, setCart, quantity, setMessage, Page)}>
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
                      reviews
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
                          Created anonymously
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
                          <img className="modal-img" src={item.a_image} alt={`Image of the ${item.name} product`} />
                          <strong>{item.name}</strong>
                        </div>
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">MY REVIEW</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src={img} alt="close button icon" /></button>
                          </div>
                          <div className="modal-body">
                            <div className="App">
                              <i>Required fields are marked with *</i>
                              <form onSubmit={() => apiCalls.handleReview(rating, title, reviewDes, Page, findId, setTitle, setReviewDes, setMessage)}>
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

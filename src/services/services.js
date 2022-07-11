import axios from 'axios';

const BACK_END_URL = 'https://strut-furniture-api.herokuapp.com/api/v1';

// GET ALL categories
export const fetchAllCategories = async () => {
  const categoriesData = await axios.get(`${BACK_END_URL}/categories`);
  return categoriesData;
};

// Reviews
export const fetchAllFurniture = async (categoryId) => {
  const furnitureData = await axios.get(`${BACK_END_URL}/categories/${categoryId}/furniture_items`)
    .then((res) => res.data);
  return furnitureData;
};

// GET ALL Reviews
export const fetchAllReview = async (categoryId, reviewId) => {
  const reviewData = await axios.get(`${BACK_END_URL}/categories/${categoryId}//furniture_items/${reviewId}/review_items`)
    .then((res) => res.data);
  return reviewData;
};

/* eslint-disable */
export function componentDidMount(findId, Page, averageRating, reviews, setReviews, setMessage, message, setAverageRating) {
  fetch(`https://strut-furniture-api.herokuapp.com/api/v1/categories/${findId()}/furniture_items/${Page()}/reviews`)
    .then(async (response) => {
      const data = await response.json();
      reviews = data;
      setReviews(data);
      handleAverage(reviews, averageRating, setAverageRating);

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      setMessage(message);
    });
}

export function handleAverage(reviews, averageRating, setAverageRating) {
  console.log(reviews[0].id);

  if (reviews[0].id > 0) {
    setAverageRating(reviews.reduce((acc, curr) => acc + curr.overal_rating, 0) / reviews.length);
    console.log(averageRating);
  }
}

export const handleReview = async (rating, title, reviewDes, Page, findId, setTitle, setReviewDes, setMessage) => {
  const data = {
    overal_rating: rating,
    title,
    description: reviewDes,
    furniture_item_id: Page(),
  };
  try {
    const res = await fetch(`https://strut-furniture-api.herokuapp.com/api/v1/categories/${findId()}/furniture_items/${Page()}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      setTitle('');
      setReviewDes('');
      setMessage('User created successfully');
    } else {
      setMessage('Some error occured');
    }
  } catch (err) {
    console.log(err);
  }
};

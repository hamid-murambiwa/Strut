import axios from 'axios';
import { Page, findId } from './tools';

const BACK_END_URL = 'https://strut-furniture-api.herokuapp.com//api/v1';

export function isLoggedIn(setUserData) {
  fetch(`${BACK_END_URL}/logged_in`)
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return setUserData(data);
    });
}

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
  fetch(`${BACK_END_URL}/categories/${findId()}/furniture_items/${Page()}/reviews`)
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

export function handleAverage(reviews, setAverageRating) {

  if (reviews[0].id > 0) {
    setAverageRating(reviews.reduce((acc, curr) => acc + curr.overal_rating, 0) / reviews.length);
  }
}

export const handleReview = async (rating, title, reviewDes, userData, setTitle, setReviewDes, setMessage) => {
  const data = {
    overal_rating: rating,
    username: userData["user"]["firstname"],
    title: title,
    description: reviewDes,
    furniture_item_id: Page(),
  };
  try {
    const res = await fetch(`${BACK_END_URL}/categories/${findId()}/furniture_items/${Page()}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      setTitle('');
      setReviewDes('');
      setMessage('Review created successfully');
    } else {
      setMessage('Some error occured');
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleSignup = async (
  e,
  firstname,
  lastname,
  username,
  phonenumber,
  email,
  password,
  passwordConfirmation,
  setMessage,
  setErrorMessage
) => {
  let errors = [];
  e.preventDefault();
  const data = { user:{
    firstname: firstname,
    lastname: lastname,
    username: username,
    phonenumber: phonenumber,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation
    }
  };
  if (password === passwordConfirmation) {
  try {
    const res = await fetch(`${BACK_END_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(resp => errors = resp);
    if (errors["status"] === 'created') {
      setMessage('User created successfully');
      setTimeout(() => {
        window.location.replace('/login');
      }, 1000);
    } else {
      console.log(errors['errors']);
      setErrorMessage(errors['errors']);
    }
  } catch (err) {
    console.log(err);
  }
  } else {
    setErrorMessage(['Password and password confirmation do not match']);
  }
};

export const handleSignin = async (e, username, password, passwordConfirmation, setErrorMessage) => {
  setErrorMessage('');
  let response = [];
  e.preventDefault();
  const data = { session:{
    username: username,
    password: password,
    password_confirmation: passwordConfirmation
    }
  };
  if (password === passwordConfirmation) {
  try {
    const res = await fetch(`${BACK_END_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(resp => response = resp);
    if (response["logged_in"] === true) {
      const localData = JSON.stringify(response);
      localStorage.setItem('user', localData);
      setTimeout(() => {
      window.history.back()
      }, 1000);
    } else {
      setErrorMessage([response['errors']]);
    }
  } catch (err) {
    setErrorMessage([response['errors']]);
  }
  } else {
    setErrorMessage(['Password and password confirmation do not match']);
  }
}

export const handleEmail = async (e, newEmail, confirmNewEmail, userData, setErrorMessage) => {
  setErrorMessage('');
  let response = [];
  e.preventDefault();
  const data = {
    email: newEmail
    };
  if (newEmail === confirmNewEmail) {
  try {
    const res = await fetch(`${BACK_END_URL}/users/${userData["user"]["id"]}/update_email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(resp => response = resp);
    if (response["status"] === 'updated') {
      // setMsg('User logged in successfully');
      setTimeout(() => {
      window.history.back()
      }, 1000);
    } else {
      setErrorMessage([response['errors']]);
    }
  } catch (err) {
    console.log(err);
  }
  } else {
    setErrorMessage(['Your new email and new email confirmation should match']);
  }
}

export const handlePassword = async (e, password, newPassword, userData, setPassMessage) => {
  setPassMessage('');
  let response = [];
  e.preventDefault();
  const data = { user:{
    password: password,
    new_password: newPassword
    }
  };
  if (password !== newPassword) {
  try {
    const res = await fetch(`${BACK_END_URL}/users/${userData["user"]["id"]}/update_password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(resp => response = resp);
    if (response["status"] === 'updated') {
      setTimeout(() => {
      window.history.back()
      }, 1000);
    } else {
      setPassMessage([response['errors']]);
    }
  } catch (err) {
    console.log(err);
  }
  } else {
    console.log('error');
    setPassMessage(['The old password and the new password should not match']);
  }
}

export const handlePasswordReset = async (e, token, password, passwordConfirmation, setMessage, setErrorMessage) => {
  let response = {};
  e.preventDefault();
  const data = {
    password: password,
    password_confirmation: passwordConfirmation,
    token: token
    }
  if (password === passwordConfirmation) {
    setMessage('Loading...');
  try {
    const res = await fetch(`${BACK_END_URL}/passwords/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(resp => response = resp);
    if (response["status"] === 'ok') {
      setTimeout(() => {
        window.location.replace('/login');
      }, 500);
      setMessage('Password changed successfully')
    } else {
      e.preventDefault();
      setErrorMessage("Your reset link has expired has expired. Please try again");
    }
  } catch (err) {
    console.log(err);
  }
  } else {
    console.log('error');
    setErrorMessage('The old password and the password confirmation should match');
  }
}

export const handlePasswordForgot = async (email, setMessage, setErrorMessage) => {
  let response = {};
  const data = {
    email: email
    }
  
  setMessage('Loading...');
  try {
    const res = await fetch(`${BACK_END_URL}/passwords/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(resp => response = resp);
    if (response["status"] === 'ok') {
      window.location.replace('/reset_confirmation');
    } else {
      setErrorMessage(response['error']);
    }
  } catch (err) {
    console.log(err);
  }
}

export const handleSignout = async (setMessage) => {
  let response = [];
  try {
    const res = await fetch(`${BACK_END_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(resp => response = resp);
    if (response["status"] === 200) {
      let userData = JSON.parse(localStorage.getItem('user'));
      userData["logged_in"] = false;
      localStorage.setItem('user', JSON.stringify(userData));
      setTimeout(() => {
      window.location.reload();
      }, 1000);
    } else {
      setMessage([response['logged_out']]);
    }
  } catch (err) {
    console.log(err);
  }
}
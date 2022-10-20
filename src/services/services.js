import axios from 'axios';
import { encode } from 'base-64';
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

// GET price
export const fetchPrice = async (amount, setPrice, setMessage) => {
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=ZAR&to=GBP`, {
      method: 'GET',
      headers: {
        apikey: 'ALQF9bxSv5LWzcov2vshP3CfXlsO51Rb',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
    if (res) {
      setPrice(res.rates.GBP);
      setMessage('Currency Converted successfully');
    } else {
      setMessage('Some error occured while converting currency');
    }
  } catch (err) {
    setMessage(err);
  }
};

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

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      } else {
        reviews = data;
        setReviews(data);
        handleAverage(reviews, averageRating, setAverageRating);
      }
    })
    .catch((error) => {
      setMessage(message);
    });
}

export const fetchOrder = async (link, amount, setMessage) => {
  let response = [];
  let username = 'AfOm-0-nnphAZ9kve_BDWVHhuBsDySkhr3Qe9mZG2qPFPcb53ldb_-M02tBnPujiXBanezl79Vj-4GA1';
  let password = 'EB7Id63CqcOv7mWViyZP_LqTiBtP5d6VILlZx1kyh2yviEmx1bMwaZH2YQZ8V3rGXf-Oj7UPMV_k3fwB';

  try {
    const res = await fetch(link, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Basic ' + encode(username + ":" + password),
        'Content-Type': 'application/json'
      }),
    }).then(response => response.json())
    .then(resp => response = resp);
    if (res.status === 'COMPLETED') {
      const resData = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
      if (!resData.some(e => e.id === response.id) || resData === []) {
            response.purchase_units[0].amount.value = amount;
            response.purchase_units[0].amount.currency_code = 'ZAR';
            resData.push(response);
            const resultData = JSON.stringify(resData);
            localStorage.setItem('order', resultData);
            window.location.reload();
            if (resData.some(e => e.purchase_units[0].amount.value === 0)) {
              localStorage.removeItem("order");
            }
      }
    } else {
      setMessage('Some error occured while fetching order');
    }
  } catch (err) {
    console.log(err);
  }
}

export const handleOrder = async (userData, link, totalPrice, setMessage) => {
  const data = {
    link: link,
    amount: totalPrice(),  
    user_id: userData["user"]["id"],
  };
  try {
    const res = await fetch(`${BACK_END_URL}/users/${userData.user.id}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      setMessage('Order created successfully');
    } else {
      setMessage('Some error occured');
    }
  } catch (err) {
    console.log(err);
  }
}

// GET orders
export const fetchOrders = async (userData) => {
  const categoriesData = await axios.get(`${BACK_END_URL}/users/${userData.user.id}/orders`);
  return categoriesData.data.orders;
};

export function handleAverage(reviews, averageRating, setAverageRating) {
  // eslint disable-next-line no-plusplus
  if (reviews[0].id > 0) {
    setAverageRating(reviews.reduce((acc, curr) => acc + curr.overal_rating, 0) / reviews.length);
  }
}

export const handleReview = async (e, rating, title, reviewDes, userData, setTitle, setReviewDes, setMessage, setErrorMessage) => {
  e.preventDefault();
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
    if (res.statusText === 'Created') {
      setTitle('');
      setReviewDes('');
      setMessage('Review created successfully');
      window.location.reload();
    } else {
      setErrorMessage('Some error occured while trying to connect to the database');
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
      setErrorMessage('');
    } else {
      setErrorMessage(errors['errors']);
    }
  } catch (err) {
    console.log(err);
  }
  } else {
    setErrorMessage(['Password and password confirmation do not match']);
  }
};

export const handleSignin = async (e, username, password, setErrorMessage, setLoad) => {
  setErrorMessage('');
  let response = [];
  e.preventDefault();
  const data = { session:{
    username: username,
    password: password,
    password_confirmation: password
    }
  };
    setLoad(true);
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
      }, 500);
      setLoad(false);
    } else {
      setErrorMessage([response['errors']]);
      setLoad(false);
    }
  } catch (err) {
    setErrorMessage([response['errors']]);
  }
}

export const handleEmail = async (e, newEmail, confirmNewEmail, userData, setErrorMessage, setLoad) => {
  setErrorMessage('');
  setLoad(true);
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
      setTimeout(() => {
      window.history.back()
      }, 1000);
      setLoad(false);
    } else {
      setErrorMessage([response['errors']]);
      setLoad(false);
    }
  } catch (err) {
    console.log(err);
    setLoad(false);
  }
  } else {
    setErrorMessage(['Your new email and new email confirmation should match']);
    setLoad(false);
  }
}

export const handlePassword = async (e, password, newPassword, userData, setMessage, setPassMessage, setLoad2) => {
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
      setLoad2(false);
      setTimeout(() => {
      window.history.back()
      }, 1000);
      setMessage("You have successfully changed your password!")
    } else {
      setLoad2(false);
      console.log([response['errors']]);
      setPassMessage([response['errors']][0].length !== 0 ? ([response['errors']]) : 'A problem has occured. Please try again!')
    }
  } catch (err) {
    setLoad2(false);
    console.log(err);
  }
  } else {
    setLoad2(false);
    console.log('error');
    setPassMessage(['The old password and the new password should not match!']);
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
      setErrorMessage("Your reset link has expired has expired. Please try again!");
    }
  } catch (err) {
    console.log(err);
  }
  } else {
    console.log('error');
    setErrorMessage('The old password and the password confirmation should match!');
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
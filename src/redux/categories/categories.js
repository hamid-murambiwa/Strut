import axios from 'axios';

const FETCH_ALL_CATEGORIES = 'FETCH_ALL_CATEGORIES';

const initialCategoriesState = [];

const categoriesReducer = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export const fetchAllCategories = () => (dispatch) => {
  axios.get('http://localhost:3000/api/v1/categories')
    .then((response) => {
      dispatch({ type: FETCH_ALL_CATEGORIES, payload: response });
    });
};

export default categoriesReducer;

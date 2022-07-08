import * as apiCalls from '../../services/services';

const GET_ALL_FURNITURE = 'furnitureStore/furniture/GET_ALL_FURNITURE';

const initalFurnitureReducer = [];

export const getAllFurniture = (categoriesId) => async (dispatch) => {
  const payload = await apiCalls.fetchAllFurniture(categoriesId);
  dispatch({
    type: GET_ALL_FURNITURE,
    payload,
  });
};

const furnitureReducer = (state = initalFurnitureReducer, action) => {
  switch (action.type) {
    case GET_ALL_FURNITURE:
      return action.payload;
    default:
      return state;
  }
};

export default furnitureReducer;

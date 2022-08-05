import * as apiCalls from '../../services/services';

const GET_ALL_ORDERS = 'orderStore/orders/GET_ALL_ORDERS';

const initalOrderReducer = [];

export const getAllOrders = (userData, orderData, setOrderData, setMessage) => async (dispatch) => {
  const payload = await apiCalls.fetchOrders(userData, orderData, setOrderData, setMessage);
  dispatch({
    type: GET_ALL_ORDERS,
    payload,
  });
};

const orderReducer = (state = initalOrderReducer, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.payload;
    default:
      return state;
  }
};

export default orderReducer;

import { getOrders, getUser, getRiders, createNewOrder } from "../api/Orders";

export const SORT_ORDERS = "SORT_ORDERS";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

export const FETCH_ORDERS = "FETCH_ORDERS";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const FETCH_RIDERS = "FETCH_RIDERS";
export const FETCH_RIDERS_SUCCESS = "FETCH_RIDERS_SUCCESS";
export const FETCH_RIDERS_FAILURE = "FETCH_RIDERS_FAILURE";

export const CREATE_RIDER = "CREATE_RIDER";
export const CREATE_RIDER_SUCCESS = "CREATE_RIDER_SUCCESS";
export const CREATE_RIDER_FAILURE = "CREATE_RIDER_FAILURE";

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export const CANCEL_ORDER = "CANCEL_ORDER";
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS";
export const CANCEL_ORDER_FAILURE = "CANCEL_ORDER_FAILURE";

export const CONFIRM_ORDER = "CONFIRM_ORDER";
export const CONFIRM_ORDER_SUCCESS = "CONFIRM_ORDER_SUCCESS";
export const CONFIRM_ORDER_FAILURE = "CONFIRM_ORDER_FAILURE";

export const COMPLETE_ORDER = "COMPLETE_ORDER";
export const COMPLETE_ORDER_SUCCESS = "COMPLETE_ORDER_SUCCESS";
export const COMPLETE_ORDER_FAILURE = "COMPLETE_ORDER_FAILURE";

export const ACCEPT_ORDER = "ACCEPT_ORDER";
export const ACCEPT_ORDER_SUCCESS = "ACCEPT_ORDER_SUCCESS";
export const ACCEPT_ORDER_FAILURE = "ACCEPT_ORDER_FAILURE";

export const REJECT_ORDER = "REJECT_ORDER";
export const REJECT_ORDER_SUCCESS = "REJECT_ORDER_SUCCESS";
export const REJECT_ORDER_FAILURE = "REJECT_ORDER_FAILURE";

export const SET_PRICE = "SET_PRICE";
export const SET_PRICE_SUCCESS = "SET_PRICE_SUCCESS";
export const SET_PRICE_FAILURE = "SET_PRICE_FAILURE";

export const ASSIGN_ORDER = "ASSIGN_ORDER";
export const ASSIGN_ORDER_SUCCESS = "ASSIGN_ORDER_SUCCESS";
export const ASSIGN_ORDER_FAILURE = "ASSIGN_ORDER_FAILURE";

export const UPDATE_ORDER_INFO = "UPDATE_ORDER_INFO";

export const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";
export const CREATE_NEW_ORDER_FAILURE = "CREATE_NEW_ORDER_FAILURE";
export const CREATE_NEW_ORDER_SUCCESS = "CREATE_NEW_ORDER_SUCCESS";
export const RESET_MESSAGE = "RESET_MESSAGE";

export const action = (type, payload, step=null) => ({
  type,
  payload,
  step
});

export const fetchOrders = (dispatch, page) => {
  dispatch(action(FETCH_ORDERS, true));
  getOrders(
    res => {
      dispatch(action(FETCH_ORDERS_SUCCESS, res.data.data.rows));
      dispatch(action(SET_ACTIVE_PAGE, page));
      dispatch(action(SET_TOTAL_PAGES, res.data.data.count));
      dispatch(action(FETCH_ORDERS, false));
    },
    err => {
      dispatch(action(FETCH_ORDERS_FAILURE, err.response));
      dispatch(action(FETCH_ORDERS, false));
    },
    page
  );
};

export const fetchUser = (dispatch, userId) => {
  dispatch(action(FETCH_USER, true));
  getUser(
    res => {
      dispatch(action(FETCH_USER_SUCCESS, res.data.data));
      dispatch(action(FETCH_USER, false));
    },
    err => {
      dispatch(action(FETCH_USER_FAILURE, err.response));
      dispatch(action(FETCH_USER, false));
    },
    userId
  );
};

export const fetchRiders = (dispatch, userId) => {
  dispatch(action(FETCH_RIDERS, true));
  getRiders(
    res => {
      dispatch(action(FETCH_RIDERS_SUCCESS, res.data.data));
      dispatch(action(FETCH_RIDERS, false));
    },
    err => {
      dispatch(action(FETCH_RIDERS_FAILURE, err.response));
      dispatch(action(FETCH_RIDERS, false));
    },
    userId
  );
};

export const createOrder = (dispatch, data, step) => {
  dispatch(action(CREATE_NEW_ORDER, data, step));
  createNewOrder(
    res => {
      dispatch(action(CREATE_NEW_ORDER_SUCCESS, res.data.data, step));
      fetchOrders(dispatch, 1)
    },
    err => {
      dispatch(action(CREATE_NEW_ORDER_FAILURE, err.response.data.error, step));
    },
    data
  );
};

export const resetMessages = (dispatch) => {
  dispatch(action(RESET_MESSAGE))
}

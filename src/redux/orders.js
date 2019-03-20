import * as ActionTypes from './ActionTypes';

export default (
  state = {
    isLoading: true,
    errMess: null,
    orders: [],
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.LOAD_ORDERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        orders: action.payload,
      };

    case ActionTypes.ORDERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        orders: [],
      };

    case ActionTypes.ORDERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        orders: [],
      };

    case ActionTypes.CREATE_ORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        orders: [...state.orders.filter(order => order.id !== action.payload.id), action.payload],
      };

    case ActionTypes.CANCEL_ORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        orders: [...state.orders.filter(order => order.id !== action.payload.id), action.payload],
      };

    case ActionTypes.CONFIRM_ORDER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        orders: [...state.orders.filter(order => order.id !== action.payload.id), action.payload],
      };

    default:
      return state;
  }
};

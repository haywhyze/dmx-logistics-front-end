import * as type from "../Actions/orderActions";

export const initialState = {
  isLoadingOrder: false,
  isLoadingUser: false,
  isLoadingRiders: false,
  orders: [],
  user: {},
  riders: [],
  activePage: 1,
  totalPages: 1,
  error: "",
  newOrder: null,
  newOrderLoading: false,
  newOrderError: "",
  senderAddressLoading: false,
  senderAddressError: "",
  recipientAddressLoading: false,
  recipientAddressError: "",
  globalStep: null,
};

export function orderReducer(state, action) {
  switch (action.type) {
    case type.FETCH_ORDERS:
      return {
        ...state,
        isLoadingOrder: action.payload,
        error: ""
      };

    case type.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        error: ""
      };

    case type.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case type.FETCH_USER:
      return {
        ...state,
        isLoadingUser: action.payload,
        error: ""
      };

    case type.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: ""
      };

    case type.FETCH_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case type.FETCH_RIDERS:
      return {
        ...state,
        isLoadingRiders: action.payload,
        error: ""
      };

    case type.FETCH_RIDERS_SUCCESS:
      return {
        ...state,
        riders: action.payload,
        error: ""
      };

    case type.FETCH_RIDERS_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case type.SORT_ORDERS:
      return {
        ...state,
        orders: action.payload
      };

    case type.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };

    case type.SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload
      };

    case type.UPDATE_ORDER_INFO:
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          ...action.payload
        }
      };

    case type.CREATE_NEW_ORDER:
      return {
        ...state,
        newOrderError: "",
        newOrderLoading: true,
        newOrder: action.payload,
        globalStep: action.step
      };

    case type.CREATE_NEW_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.payload),
        newOrderError: "",
        globalStep: action.step
      };

    case type.CREATE_NEW_ORDER_FAILURE:
      return {
        ...state,
        newOrderError: action.payload,
        globalStep: action.step,
        newOrderLoading: false,
      };

    default:
      return state;
  }
}

import * as type from "../Actions/orderActions";

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

    case type.CREATE_RIDER:
      return {
        ...state,
        newRiderLoading: action.payload,
        newRiderError: "",
        newRiderSuccess: false
      };

    case type.CREATE_RIDER_SUCCESS:
      return {
        ...state,
        riders: [...state.riders, action.payload],
        newRiderLoading: false,
        newRiderError: "",
        newRiderSuccess: true
      };

    case type.CREATE_RIDER_FAILURE:
      return {
        ...state,
        newRiderLoading: false,
        newRiderError: action.payload,
        newRiderSuccess: false
      };

    case type.RESET_RIDER_SUCCESS:
      return {
        ...state,
        newRiderSuccess: false
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
        },
        newOrderSuccess: false
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
        newOrderError: "",
        newOrderLoading: false,
        globalStep: action.step,
        newOrderSuccess: true
      };

    case type.CREATE_NEW_ORDER_FAILURE:
      return {
        ...state,
        newOrderError: action.payload,
        globalStep: action.step,
        newOrderLoading: false
      };

    case type.RESET_MESSAGE:
      return {
        ...state,
        newOrderSuccess: false
      };

    case type.ACCEPT_ORDER:
      return {
        ...state,
        orderError: "",
        assignOrderLoading: true
      };
    case type.ACCEPT_ORDER_FAILURE:
      return {
        ...state,
        orderError: action.payload,
        assignOrderLoading: false
      };
    case type.ACCEPT_ORDER_SUCCESS:
      return {
        ...state,
        orderError: "",
        assignOrderLoading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    case type.CANCEL_ORDER:
      return {
        ...state,
        orderError: "",
        cancelOrderLoading: true
      };
    case type.CANCEL_ORDER_FAILURE:
      return {
        ...state,
        orderError: action.payload,
        cancelOrderLoading: false
      };
    case type.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        orderError: "",
        cancelOrderLoading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    case type.CONFIRM_ORDER:
      return {
        ...state,
        orderError: "",
        confirmOrderLoading: true
      };
    case type.CONFIRM_ORDER_FAILURE:
      return {
        ...state,
        orderError: action.payload,
        confirmOrderLoading: false
      };
    case type.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        orderError: "",
        confirmOrderLoading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    case type.COMPLETE_ORDER:
      return {
        ...state,
        orderError: "",
        completeOrderLoading: true
      };
    case type.COMPLETE_ORDER_FAILURE:
      return {
        ...state,
        orderError: action.payload,
        completeOrderLoading: false
      };
    case type.COMPLETE_ORDER_SUCCESS:
      return {
        ...state,
        orderError: "",
        completeOrderLoading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    case type.ASSIGN_ORDER:
      return {
        ...state,
        assignOrderError: "",
        assignOrderLoading: true
      };
    case type.ASSIGN_ORDER_FAILURE:
      return {
        ...state,
        assignOrderError: action.payload,
        assignOrderLoading: false
      };
    case type.ASSIGN_ORDER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        assignOrderError: "",
        assignOrderLoading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    case type.REJECT_ORDER:
      return {
        ...state,
        orderError: "",
        rejectOrderLoading: true
      };
    case type.REJECT_ORDER_FAILURE:
      return {
        ...state,
        orderError: action.payload,
        rejectOrderLoading: false
      };
    case type.REJECT_ORDER_SUCCESS:
      return {
        ...state,
        orderError: "",
        rejectOrderLoading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    case type.SET_PRICE:
      return {
        ...state,
        setPriceError: "",
        setPriceLoading: true
      };
    case type.SET_PRICE_FAILURE:
      return {
        ...state,
        setPriceError: action.payload,
        setPriceLoading: false
      };
    case type.SET_PRICE_SUCCESS:
      return {
        ...state,
        setPriceError: "",
        setPriceLoading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    default:
      return state;
  }
}

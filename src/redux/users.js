import * as ActionTypes from './ActionTypes';

export default (
  state = {
    isLoading: true,
    errMess: null,
    user: {},
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.LOAD_USER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: action.payload,
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        user: {},
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: {},
      };

    case ActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: action.payload,
      };

    default:
      return state;
  }
};

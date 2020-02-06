import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING,
  AUTHENTICATED,
  LOGOUT
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        response: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        response: null,
        authUser: null,
        isAuthenticated: null,
        loading: false,
        error: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case AUTHENTICATED:
      return {
        ...state,
        authUser: action.payload
      };
    default:
      return state;
  }
};

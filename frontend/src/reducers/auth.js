/* eslint-disable import/no-anonymous-default-export */
import {
  COMPANYSIGNUP_SUCCESS,
  COMPANYSIGNUP_FAIL,
  STUDENT_SIGNUP_SUCCESS,
  STUDENT_SIGNUP_FAIL,
  STUDENT_USER_LOADED,
  STUDENT_AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  companyuser: null,
  student: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        student: payload,
      };
    case COMPANYSIGNUP_SUCCESS:
    case STUDENT_SIGNUP_SUCCESS:
    case STUDENT_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case STUDENT_AUTH_ERROR:
    case COMPANYSIGNUP_FAIL:
    case STUDENT_SIGNUP_FAIL:
    case STUDENT_LOGIN_FAIL:
      localStorage.removeItem('token');
      window.localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

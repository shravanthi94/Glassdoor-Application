/* eslint-disable import/no-anonymous-default-export */
import {
  COMPANYSIGNUP_SUCCESS,
  COMPANYSIGNUP_FAIL,
  COMPANYUSER_LOADED,
  COMPANYAUTH_ERROR,
  COMPANYSIGNIN_SUCCESS,
  COMPANYSIGNIN_FAIL,
  COMPANY_SIGNOUT,
  STUDENT_SIGNUP_SUCCESS,
  STUDENT_SIGNUP_FAIL,
  STUDENT_USER_LOADED,
  STUDENT_AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  LOGOUT,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_USER_LOADED,
  ADMIN_AUTH_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  companyuser: null,
  student: null,
  admin:null,
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
    case COMPANYUSER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        companyuser: payload,
      };
    case ADMIN_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      };
    case COMPANYSIGNUP_SUCCESS:
    case COMPANYSIGNIN_SUCCESS:
    case STUDENT_SIGNUP_SUCCESS:
    case STUDENT_LOGIN_SUCCESS:
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case COMPANYSIGNUP_FAIL:
    case COMPANYSIGNIN_FAIL:
    case COMPANYAUTH_ERROR:
    case COMPANY_SIGNOUT:
    case STUDENT_AUTH_ERROR:
    case STUDENT_SIGNUP_FAIL:
    case STUDENT_LOGIN_FAIL:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_AUTH_ERROR:
    case LOGOUT:
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

import axios from 'axios';
import { setAlert } from '../alert';
import {
  ADMIN_USER_LOADED,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  LOGOUT,
} from '../types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../helpers/setAuthToken';

//  Load Student
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    console.log('inside load user action: ', localStorage.token);
    setAuthToken(localStorage.token);
    const decoded = jwt_decode(localStorage.token);
    localStorage.setItem('usertype', decoded.admin.usertype);
    localStorage.setItem('name', decoded.admin.name);
    localStorage.setItem('email', decoded.admin.email);
  }

  try {
    
    dispatch({
      type: ADMIN_USER_LOADED,
      payload: {
        email: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        usertype: localStorage.getItem('usertype')
      },
    });
  } catch (err) {
    dispatch({
      type: ADMIN_AUTH_ERROR,
    });
  }
};

//  Student Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/admin/login', body, config);

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log('here', err);
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADMIN_LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

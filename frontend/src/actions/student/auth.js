import axios from 'axios';
import { setAlert } from '../alert';
import {
  STUDENT_SIGNUP_SUCCESS,
  STUDENT_SIGNUP_FAIL,
  STUDENT_USER_LOADED,
  STUDENT_AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
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
    localStorage.setItem('usertype', decoded.user.usertype);
    localStorage.setItem('id', decoded.user.id);
    localStorage.setItem('name', decoded.user.name);
    localStorage.setItem('email', decoded.user.email);
  }

  try {
    const res = await axios.get('/student/landing');
    console.log('load user result: ', res);
    dispatch({
      type: STUDENT_USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_AUTH_ERROR,
    });
  }
};

//  Student Signup
export const signup = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/student/signup', body, config);

    dispatch(setAlert('Successfully registered', 'success'));

    dispatch({
      type: STUDENT_SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: STUDENT_SIGNUP_FAIL,
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
    const res = await axios.post('/student/login', body, config);

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
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
      type: STUDENT_LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

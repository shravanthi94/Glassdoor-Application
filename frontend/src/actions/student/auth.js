import axios from 'axios';
import { setAlert } from '../alert';
import {
  STUDENT_SIGNUP_SUCCESS,
  STUDENT_SIGNUP_FAIL,
  STUDENT_USER_LOADED,
  STUDENT_AUTH_ERROR,
} from '../types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../helpers/setAuthToken';

//  Load Student
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    const decoded = jwt_decode(localStorage.token);
    localStorage.setItem('usertype', decoded.user.usertype);
    localStorage.setItem('name', decoded.user.name);
    localStorage.setItem('email', decoded.user.email);
  }

  try {
    const res = await axios.get('/student/profile');

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

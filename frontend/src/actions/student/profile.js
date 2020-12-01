import {
  STUDENT_PROFILE_SUCCESS,
  STUDENT_PROFILE_FAIL,
  STUDENT_COUNT_SUCCESS,
  STUDENT_COUNT_FAIL,
  STUDENT_CONTRIBUTION_SUCCESS,
  STUDENT_CONTRIBUTION_FAIL,
} from '../types';
import { setAlert } from '../alert';
import axios from 'axios';

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/student/landing');
    dispatch({
      type: STUDENT_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update basic details
export const updateBasicDetails = (formData, history, edit) => async (
  dispatch,
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/student/profile/basic', formData, config);

    dispatch({
      type: STUDENT_PROFILE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Profile Updated', 'success'));

    if (!edit) {
      history.push('/student/profile');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: STUDENT_PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Upload user image
export const uploadStudentImage = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/student/profile/image', formData, config);
    console.log(res);

    dispatch(setAlert('Image Uploaded', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

// Get current users profile
export const getStudentCounts = () => async (dispatch) => {
  try {
    const res = await axios.get('/student/profile/counts');
    dispatch({
      type: STUDENT_COUNT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_COUNT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Student contributions
export const getStudentContributions = (query) => async (dispatch) => {
  try {
    const res = await axios.get(`/student/profile/contributions/${query}`);
    dispatch({
      type: STUDENT_CONTRIBUTION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log('Error', err.response.data.errors[0].msg);
    dispatch({
      type: STUDENT_CONTRIBUTION_FAIL,
      payload: {
        msg: err.response.data.errors[0].msg,
        status: err.response.status,
      },
    });
  }
};

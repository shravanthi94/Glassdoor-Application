import { STUDENT_PROFILE_SUCCESS, STUDENT_PROFILE_FAIL } from '../types';
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

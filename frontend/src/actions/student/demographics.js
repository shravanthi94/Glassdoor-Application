import { STUDENT_PROFILE_SUCCESS, STUDENT_PROFILE_FAIL } from '../types';
import axios from 'axios';
import { setAlert } from '../alert';

// Update profile basic details
export const updateStudentDemographics = (
  formData,
  history,
  edit = false,
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/student/demographics', formData, config);

    dispatch({
      type: STUDENT_PROFILE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Profile Updated', 'success'));

    if (!edit) {
      history.push('/student/landing');
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

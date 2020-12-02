import axios from 'axios';
import { setAlert } from '../alert';

import {
    STUDENT_GETALLJOBS,
    STUDENT_JOB_DETAILS,
    STUDENT_APPLY_JOB,
    STUDENT_JOBERROR
} from '../types';

/*export const addResume = (formData, id, history) => async (dispatch) => {
  console.log('ADD_RESUME action called');
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post(`/student/resume/${id}`, formData, config);
    dispatch({
      type: STUDENT_ADD_RESUME,
      payload: res.data,
    });
    dispatch(setAlert('resume added successfully ', 'success'));
    history.push(`/student/resume/${id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: STUDENT_JOBERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
*/
export const getAllJobs = () => async(dispatch) => {
    try {
        const res = await axios.get(`/student/jobs/`);

        dispatch({
            type: STUDENT_GETALLJOBS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: STUDENT_JOBERROR,
            payload: { msg: err, status: err.response.status },
        });
    }
};

export const getJobDetails = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/student/jobs/details/${id}`);

        dispatch({
            type: STUDENT_JOB_DETAILS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: STUDENT_JOBERROR,
            payload: { msg: err, status: err.response.status },
        });
    }
};
import axios from 'axios';
import { setAlert } from '../alert';

import {
    STUDENT_ADD_RESUME,
    STUDENT_GET_RESUME,
    STUDENT_DELETE_RESUME,
    STUDENT_UPDATE_PRIMARY,
    STUDENT_RESUME_ERROR
} from '../../actions/types' 

export const addResume = (formData,id,history) => async dispatch => {
    console.log("ADD_RESUME action called")
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            `/student/resume/${id}`,
            formData,
            config
        );
        dispatch({
            type: STUDENT_ADD_RESUME,
            payload: res.data,
        });
        dispatch(setAlert('resume added successfully ', 'success'));
        history.push(`/student/resume/${id}` );
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: STUDENT_RESUME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const getStudentResumes = (id) => async dispatch => {
    try {
        const res = await axios.get(`/student/resumes/${id}`)

        dispatch({
            type: STUDENT_GET_RESUME,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: STUDENT_RESUME_ERROR,
            payload: { msg: err, status: err.response.status }
        })

    }
}








/*






export const updatePrimary = (
    formData,
    history,
  ) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const res = await axios.post('/student/resume/', formData, config);
  
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
  */
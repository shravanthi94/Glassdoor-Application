import axios from 'axios';
import { setAlert } from '../alert';

import {
  COMPANY_CREATE_JOB,
  COMPANY_GETALLJOBS,
  COMPANY_GETJOB,
  COMPANY_JOBERROR,
  STUDENT_PROFILE_SUCCESS,
  STUDENT_PROFILE_FAIL,
} from '../../actions/types';

//create Job
export const createCompanyJob = (formData, history) => async (dispatch) => {
  console.log('action called');
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post('/company/jobposting', formData, config);
    dispatch({
      type: COMPANY_CREATE_JOB,
      payload: res.data,
    });
    dispatch(setAlert('Job successfully Posted', 'success'));
    history.push('/company/jobpostings');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: COMPANY_JOBERROR,
      payload: { msg: err, status: err.response.status },
    });
  }
};

// get all current company's jobs

export const getCurrentCompanyJobs = () => async (dispatch) => {
  try {
    const res = await axios.get('/company/jobposting/myjobs');

    dispatch({
      type: COMPANY_GETALLJOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_JOBERROR,
      payload: { msg: err, status: err.response.status },
    });
  }
};

export const getJobDetailById = (jobId) => async (dispatch) => {
  try {
    const res = await axios.get(`/company/applicant/${jobId}`);

    dispatch({
      type: COMPANY_GETJOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_JOBERROR,
      payload: { msg: err, status: err.response.status },
    });
  }
};

export const getStudentDetailByEmail = (stuEmailId) => async (dispatch) => {
  try {
    const res = await axios.get(`/company/applicant/student/${stuEmailId}`);

    dispatch({
      type: STUDENT_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_PROFILE_FAIL,
      payload: { msg: err, status: err.response.status },
    });
  }
};

// update applicant status

export const updateApplicantStatus = (
  applicantId,
  applicantStatus,
  history,
) => async (dispatch) => {
  // console.log("action called")
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    console.log('applicant status in action', applicantStatus);
    const body = JSON.stringify({ applicantStatus });
    const res = await axios.post(
      `/company/applicant/statusUpdate/${applicantId}`,
      body,
      config,
    );
    dispatch({
      type: COMPANY_GETJOB,
      payload: res.data,
    });
    dispatch(setAlert('Applicant status updated', 'success'));
    history.push('/company/jobpostings'); //company/viewapplicants/5fb4bcc5f742d11ae7f53293 -> Job ID
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;
    // if (errors) {
    //     errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({
    //     type: COMPANY_JOBERROR,
    //     payload: { msg: err, status: err.response.status },
    // });
  }
};

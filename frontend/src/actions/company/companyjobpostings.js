import axios from 'axios';
import { setAlert } from '../alert';

import { COMPANY_CREATE_JOB, COMPANY_GETALLJOBS, COMPANY_GETJOB, COMPANY_JOBERROR } from '../../actions/types'

//create Job
export const createCompanyJob = (formData, history) => async dispatch => {
    console.log("action called")
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            '/company/jobposting',
            formData,
            config
        );
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
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// get all current company's jobs

export const getCurrentCompanyJobs = () => async dispatch => {
    try {
        const res = await axios.get('/company/jobposting/myjobs')

        dispatch({
            type: COMPANY_GETALLJOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_JOBERROR,
            payload: { msg: err.repsonse.statusText, status: err.response.status }
        })

    }
}
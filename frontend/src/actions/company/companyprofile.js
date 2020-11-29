import axios from 'axios';
import { setAlert } from '../alert';

import {
    COMPANY_GETPROFILE,
    COMPANY_PROFILEERROR,
    COMPANY_EDITPROFILE
} from '../types';

// Get current logged in company profile

export const getCurrentCompanyProfile = () => async dispatch => {
    try {
        const res = await axios.get('/company/profile')

        dispatch({
            type: COMPANY_GETPROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_PROFILEERROR,
            payload: { msg: err, status: err.response.status }
        })

    }
}

//create or update profile
export const editCompanyProfile = (formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await axios.post(
            '/company/profile',
            formData,
            config
        );
        dispatch({
            type: COMPANY_EDITPROFILE,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/companydashboard');
        }
        history.push('/companydashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: COMPANY_PROFILEERROR,
            payload: { msg: err, status: err.response.status },
        });
    }
};
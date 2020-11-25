import axios from 'axios';
import { setAlert } from '../alert'
import {
    COMPANYSIGNUP_SUCCESS,
    COMPANYSIGNUP_FAIL,
    COMPANYUSER_LOADED,
    COMPANYAUTH_ERROR
} from '../types'
import setAuthToken from '../../helpers/setAuthToken';

// Load Company User

export const loadCompanyUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {

    } catch (err) {

    }
}


// Register User

export const companySignUP = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/company/signup', body, config);
        dispatch({
            type: COMPANYSIGNUP_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: COMPANYSIGNUP_FAIL
        })

    }
}
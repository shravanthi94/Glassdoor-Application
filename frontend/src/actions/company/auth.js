import axios from 'axios';
import { setAlert } from '../alert'
import {
    COMPANYSIGNUP_SUCCESS,
    COMPANYSIGNUP_FAIL,
    COMPANYUSER_LOADED,
    COMPANYAUTH_ERROR,
    COMPANYSIGNIN_SUCCESS,
    COMPANYSIGNIN_FAIL

} from '../types'
import setAuthToken from '../../helpers/setAuthToken';

// Load Company User

export const loadCompanyUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/company/login');

        dispatch({
            type: COMPANYUSER_LOADED,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: COMPANYAUTH_ERROR
        })

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
        dispatch(loadCompanyUser());
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

// SignIn User

export const companySignIn = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/company/login', body, config);
        dispatch({
            type: COMPANYSIGNIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadCompanyUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: COMPANYSIGNIN_FAIL
        })

    }
}
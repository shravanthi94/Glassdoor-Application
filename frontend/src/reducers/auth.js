/* eslint-disable import/no-anonymous-default-export */
import {
    COMPANYSIGNUP_SUCCESS,
    COMPANYSIGNUP_FAIL,
    COMPANYUSER_LOADED,
    COMPANYAUTH_ERROR,
    COMPANYSIGNIN_SUCCESS,
    COMPANYSIGNIN_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    companyuser: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COMPANYUSER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                companyuser: payload
            }
        case COMPANYSIGNUP_SUCCESS:
        case COMPANYSIGNIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case COMPANYSIGNUP_FAIL:
        case COMPANYSIGNIN_FAIL:
        case COMPANYAUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;
    }

}
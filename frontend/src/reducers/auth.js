/* eslint-disable import/no-anonymous-default-export */
import {
    COMPANYSIGNUP_SUCCESS,
    COMPANYSIGNUP_FAIL
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
        case COMPANYSIGNUP_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case COMPANYSIGNUP_FAIL:
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
/* eslint-disable import/no-anonymous-default-export */
import { COMPANY_GETPROFILE, COMPANY_PROFILEERROR } from '../actions/types';

const initialState = {
    companyprofile: null,
    companyprofiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COMPANY_GETPROFILE:
            return {
                ...state,
                companyprofile: payload,
                loading: false
            }
        case COMPANY_PROFILEERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;

    }
}
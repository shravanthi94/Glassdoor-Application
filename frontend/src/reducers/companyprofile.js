/* eslint-disable import/no-anonymous-default-export */
import { COMPANY_GETPROFILE, COMPANY_PROFILEERROR, COMPANY_EDITPROFILE } from '../actions/types';

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
        case COMPANY_EDITPROFILE:
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
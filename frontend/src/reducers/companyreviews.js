/* eslint-disable import/no-anonymous-default-export */
import { COMPANY_GETREVIEW, COMPANY_GETREVIEWS, COMPANY_REVIEWS_ERROR } from '../actions/types';

const initialState = {
    companyreview: null,
    companyreviews: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COMPANY_GETREVIEW:
            return {
                ...state,
                companyreview: payload,
                loading: false
            }
        case COMPANY_GETREVIEWS:
            return {
                ...state,
                companyreviews: payload,
                loading: false
            }
        case COMPANY_REVIEWS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;

    }
}
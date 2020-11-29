/* eslint-disable import/no-anonymous-default-export */
import {
    COMPANY_GETREVIEW,
    COMPANY_GETREVIEWS,
    COMPANY_REVIEWS_ERROR,
    MARK_FAVORITE_SUCCESS,
    MARK_FEATURED_SUCCESS,
    REPLY_MESSAGE

} from '../actions/types';

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
        case MARK_FAVORITE_SUCCESS:
        case MARK_FEATURED_SUCCESS:
        case REPLY_MESSAGE:
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
/* eslint-disable import/no-anonymous-default-export */
import { REVIEWS_GET_ERROR, REVIEWS_GET, POST_APPROVAL, POST_APPROVAL_ERROR } from "../actions/types";

const initialState = {
    newReviews : null, 
    newReviewsError : null,
    postReviewApproval : null,
    postReviewApprovalError : null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REVIEWS_GET:
            return {
                ...state,
                newReviews: payload,
                loading: false,
                postReviewApproval: null,
                postReviewApprovalError : null,
            }
        case REVIEWS_GET_ERROR:
            return {
                ...state,
                newReviewsError: payload,
                loading: false,
                postReviewApproval: null,
                postReviewApprovalError : null,
            }
        case POST_APPROVAL:
            return {
                ...state,
                postReviewApproval: payload,
                loading: false
            }
        case POST_APPROVAL_ERROR:
        return {
            ...state,
            postReviewApprovalError: payload,
            loading: false
        }
        default:
            return state;
    }
}
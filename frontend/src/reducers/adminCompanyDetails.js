import { COMPANY_LIST_GET, ADMIN_COMPANY_REVIEWS_GET, COMPANY_HIRED_APPLICANTS_GET, COMPANY_APPLICANT_DEMOGRAPHICS_GET } from "../actions/types";
import { COMPANY_LIST_GET_ERROR, ADMIN_COMPANY_REVIEWS_GET_ERROR, COMPANY_HIRED_APPLICANTS_GET_ERROR, COMPANY_APPLICANT_DEMOGRAPHICS_GET_ERROR } from "../actions/types";

const initialState = {
    
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // case COMPANY_LIST_GET:
        //     return {
        //         ...state,
        //         newReviews: payload,
        //         loading: false,
        //         postReviewApproval: null,
        //         postReviewApprovalError : null,
        //     }
        // case REVIEWS_GET_ERROR:
        //     return {
        //         ...state,
        //         newReviewsError: payload,
        //         loading: false,
        //         postReviewApproval: null,
        //         postReviewApprovalError : null,
        //     }
        
        default:
            return state;
    }
}
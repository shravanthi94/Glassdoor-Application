import { COMPANY_LIST_GET, ADMIN_COMPANY_REVIEWS_GET, COMPANY_HIRED_APPLICANTS_GET, COMPANY_APPLICANT_DEMOGRAPHICS_GET } from "../actions/types";
import { COMPANY_LIST_GET_ERROR, ADMIN_COMPANY_REVIEWS_GET_ERROR, COMPANY_HIRED_APPLICANTS_GET_ERROR, COMPANY_APPLICANT_DEMOGRAPHICS_GET_ERROR } from "../actions/types";

const initialState = {
    companyList: null,
    companyListError: null,
    companyReviews: null,
    companyReviewsError:null,
    hiredApplicantsError:null,
    hiredApplicants: null,
    demographics: null,
    demographicsError: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COMPANY_LIST_GET:
            return {
                ...state,
                companyList: payload,
                loading: false,
                companyReviews: null,
                companyReviewsError:null,
                hiredApplicantsError:null,
                hiredApplicants: null,
                demographics: null,
                demographicsError: null,
            }
        case COMPANY_LIST_GET_ERROR:
            return {
                ...state,
                companyListError: payload,
                loading: false,
            }
        case ADMIN_COMPANY_REVIEWS_GET:
            return {
                ...state,
                companyReviews: payload,
                loading: false,
            }
        case ADMIN_COMPANY_REVIEWS_GET_ERROR:
            return {
                ...state,
                companyReviewsError: payload,
                loading: false,
            }  
        case COMPANY_HIRED_APPLICANTS_GET:
            return {
                ...state,
                hiredApplicants: payload,
                loading: false,
            }
        case COMPANY_HIRED_APPLICANTS_GET_ERROR:
            return {
                ...state,
                hiredApplicantsError: payload,
                loading: false,
            }  
        case COMPANY_APPLICANT_DEMOGRAPHICS_GET:
            return {
                ...state,
                demographics: payload,
                loading: false,
            }
        case COMPANY_APPLICANT_DEMOGRAPHICS_GET_ERROR:
            return {
                ...state,
                demographicsError: payload,
                loading: false,
            }   
        default:
            return state;
    }
}
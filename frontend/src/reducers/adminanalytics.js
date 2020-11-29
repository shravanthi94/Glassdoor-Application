/* eslint-disable import/no-anonymous-default-export */
import { REVIEW_PER_DAY_ERROR, COMPANY_AVERAGE_RATING_ERROR, MOST_REVIEWED_COMPANY_ERROR, TOP_STUDENT_REVIEWERS_ERROR, TOP_CEO_ERROR, MOST_VIEWED_COMPANY_ERROR } from '../actions/types'
import { COMPANY_AVERAGE_RATING, MOST_REVIEWED_COMPANY, TOP_STUDENT_REVIEWERS, TOP_CEO, MOST_VIEWED_COMPANY, REVIEW_PER_DAY } from "../actions/types";

const initialState = {
    analyticsReviewPerDay : null, 
    analyticsReviewPerDayError : null,
    analyticsCompanyAverageRating : null, 
    analyticsCompanyAverageRatingError : null,
    analyticsMostReviewedCompany : null, 
    analyticsMostReviewedCompanyError : null,
    analyticsTopStudentReviewers : null, 
    analyticsTopStudentReviewersError : null,
    analyticsTopCeo : null,
    analyticsTopCeoError : null,
    analyticsMostViewedCompanies : null,
    analyticsMostViewedCompaniesError : null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REVIEW_PER_DAY:
            return {
                ...state,
                analyticsReviewPerDay: payload,
                loading: false
            }
        case REVIEW_PER_DAY_ERROR:
            return {
                ...state,
                analyticsReviewPerDayError: payload,
                loading: false
            }
        case COMPANY_AVERAGE_RATING:
            return {
                ...state,
                analyticsCompanyAverageRating: payload,
                loading: false
            }
        case COMPANY_AVERAGE_RATING_ERROR:
            return {
                ...state,
                analyticsCompanyAverageRatingError: payload,
                loading: false
            }
        case MOST_REVIEWED_COMPANY:
            return {
                ...state,
                analyticsMostReviewedCompany: payload,
                loading: false
            }
        case MOST_REVIEWED_COMPANY_ERROR:
            return {
                ...state,
                analyticsMostReviewedCompanyError: payload,
                loading: false
            }
        case TOP_STUDENT_REVIEWERS:
            return {
                ...state,
                analyticsTopStudentReviewers: payload,
                loading: false
            }
        case TOP_STUDENT_REVIEWERS_ERROR:
            return {
                ...state,
                analyticsTopStudentReviewersError: payload,
                loading: false
            }
        case TOP_CEO:
            return {
                ...state,
                analyticsTopCeo: payload,
                loading: false
            }
        case TOP_CEO_ERROR:
            return {
                ...state,
                analyticsTopCeoError: payload,
                loading: false
            }
        case MOST_VIEWED_COMPANY:
            return {
                ...state,
                analyticsMostViewedCompanies: payload,
                loading: false
            }
        case MOST_VIEWED_COMPANY_ERROR:
            return {
                ...state,
                analyticsMostViewedCompaniesError: payload,
                loading: false
            }
        default:
            return state;

    }
}
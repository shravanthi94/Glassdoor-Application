import axios from 'axios';
import { COMPANY_AVERAGE_RATING, MOST_REVIEWED_COMPANY, TOP_STUDENT_REVIEWERS, TOP_CEO, MOST_VIEWED_COMPANY, REVIEW_PER_DAY } from "../types";
import { REVIEW_PER_DAY_ERROR, COMPANY_AVERAGE_RATING_ERROR, MOST_REVIEWED_COMPANY_ERROR, TOP_STUDENT_REVIEWERS_ERROR, TOP_CEO_ERROR, MOST_VIEWED_COMPANY_ERROR } from "../types";

export const getReviewsPerDay = () => async dispatch => {
    console.log("analytics -> getReviewsPerDay -> method entered");
    try {
        const res = await axios.get('/admin/analytics/reviews-per-day')

        dispatch({
            type: REVIEW_PER_DAY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: REVIEW_PER_DAY_ERROR,
            payload: err.response.data 
        })

    }
}

export const getCompanyAverageRating = () => async dispatch => {
    console.log("analytics -> getCompanyAverageRating -> method entered");
    try {
        const res = await axios.get('/admin/analytics/best-average-rating?limit=5')

        dispatch({
            type: COMPANY_AVERAGE_RATING,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_AVERAGE_RATING_ERROR,
            payload: err.response.data 
        })

    }
}

export const getMostReviewedCompany = () => async dispatch => {
    console.log("analytics -> getMostReviewedCompany -> method entered");
    try {
        const res = await axios.get('/admin/analytics/most-reviewed-company?limit=5')

        dispatch({
            type: MOST_REVIEWED_COMPANY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: MOST_REVIEWED_COMPANY_ERROR,
            payload: err.response.data 
        })

    }
}

export const getTopStudentReviewers = () => async dispatch => {
    console.log("analytics -> getTopStudentReviewers -> method entered");
    try {
        const res = await axios.get('/admin/analytics/top-student-reviewer?limit=5')

        dispatch({
            type: TOP_STUDENT_REVIEWERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: TOP_STUDENT_REVIEWERS_ERROR,
            payload: err.response.data 
        })

    }
}

export const getTopCeo = () => async dispatch => {
    console.log("analytics -> getTopCeo -> method entered");
    try {
        const res = await axios.get('/admin/analytics/top-ceoy?limit=10')

        dispatch({
            type: TOP_CEO,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: TOP_CEO_ERROR,
            payload: err.response.data 
        })

    }
}

export const getMostViewedcompany = () => async dispatch => {
    console.log("analytics -> getMostViewedcompany -> method entered");
    try {
        const res = await axios.get('/admin/analytics/top-viewed-company?limit=10')

        dispatch({
            type: MOST_VIEWED_COMPANY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: MOST_VIEWED_COMPANY_ERROR,
            payload: err.response.data 
        })

    }
}
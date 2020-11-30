import axios from 'axios';
import { COMPANY_LIST_GET, ADMIN_COMPANY_REVIEWS_GET, COMPANY_HIRED_APPLICANTS_GET, COMPANY_APPLICANT_DEMOGRAPHICS_GET } from "../types";
import { COMPANY_LIST_GET_ERROR, ADMIN_COMPANY_REVIEWS_GET_ERROR, COMPANY_HIRED_APPLICANTS_GET_ERROR, COMPANY_APPLICANT_DEMOGRAPHICS_GET_ERROR } from "../types";

export const getCompaniesList = () => async dispatch => {
    console.log("analytics -> getNewReviews -> method entered");
    try {
        const res = await axios.get('/admin/companies')

        dispatch({
            type: COMPANY_LIST_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_LIST_GET_ERROR,
            payload: err.response.data 
        })

    }
}

export const getCompanyReviews = (company_id) => async dispatch => {
    console.log("analytics -> getNewReviews -> method entered");
    try {
        const res = await axios.get(`/admin/companies/${company_id}/reviews`)

        dispatch({
            type: ADMIN_COMPANY_REVIEWS_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ADMIN_COMPANY_REVIEWS_GET_ERROR,
            payload: err.response 
        })

    }
}

export const getCompanyHiredApplicants = (company_id) => async dispatch => {
    console.log("analytics -> getNewReviews -> method entered");
    try {
        const res = await axios.get(`/admin/companies/${company_id}/hired-applicants`)

        dispatch({
            type: COMPANY_HIRED_APPLICANTS_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_HIRED_APPLICANTS_GET_ERROR,
            payload: err.response.data 
        })

    }
}

export const getCompanyApplicantDemographics = (company_id) => async dispatch => {
    console.log("analytics -> getNewReviews -> method entered");
    try {
        const res = await axios.get(`/admin/companies/${company_id}/applicant-demographics`)

        dispatch({
            type: COMPANY_APPLICANT_DEMOGRAPHICS_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_APPLICANT_DEMOGRAPHICS_GET_ERROR,
            payload: err.response.data 
        })

    }
}

import axios from 'axios';
import { COMPANY_IMAGE_GET, COMPANY_IMAGE_GET_ERROR, COMPANY_IMAGE_POST_APPROVAL, COMPANY_IMAGE_POST_APPROVAL_ERROR } from "../types";
import { COMPANY_PROFILE_IMAGE_GET, COMPANY_PROFILE_IMAGE_GET_ERROR, COMPANY_PROFILE_IMAGE_POST_APPROVAL, COMPANY_PROFILE_IMAGE_POST_APPROVAL_ERROR } from "../types";
import { STUDENT_PROFILE_IMAGE_GET, STUDENT_PROFILE_IMAGE_GET_ERROR, STUDENT_PROFILE_IMAGE_POST_APPROVAL, STUDENT_PROFILE_IMAGE_POST_APPROVAL_ERROR } from "../types";

export const getNewCompanyPhotos = () => async dispatch => {
    console.log("analytics -> getNewCompanyPhotos -> method entered");
    try {
        const res = await axios.get('/admin/photos/company/newphotos')

        dispatch({
            type: COMPANY_IMAGE_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_IMAGE_GET_ERROR,
            payload: err.response.data 
        })

    }
}

export const approveCompanyPhotos = (company_id, photo_id, data) => async dispatch => {
    console.log("analytics -> approveCompanyPhotos -> method entered");
    try {
        const res = await axios.post(`/admin/photos/company/${company_id}/approve/photo/${photo_id}`, data)

        dispatch({
            type: COMPANY_IMAGE_POST_APPROVAL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_IMAGE_POST_APPROVAL_ERROR,
            payload: err.response.data 
        })

    }
}

export const getNewCompanyProfilePhotos = () => async dispatch => {
    console.log("analytics -> getNewCompanyProfilePhotos -> method entered");
    try {
        const res = await axios.get('/admin/review/newreviews')

        dispatch({
            type: COMPANY_PROFILE_IMAGE_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_PROFILE_IMAGE_GET_ERROR,
            payload: err.response.data 
        })

    }
}

export const approveCompanyProfilePhotos = (review_id, data) => async dispatch => {
    console.log("analytics -> approveCompanyProfilePhotos -> method entered");
    try {
        const res = await axios.post(`/admin/review/approve/${review_id}`, data)

        dispatch({
            type: COMPANY_PROFILE_IMAGE_POST_APPROVAL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_PROFILE_IMAGE_POST_APPROVAL_ERROR,
            payload: err.response.data 
        })

    }
}

export const getNewStudentProfilePhotos = () => async dispatch => {
    console.log("analytics -> getNewStudentProfilePhotos -> method entered");
    try {
        const res = await axios.get('/admin/review/newreviews')

        dispatch({
            type: STUDENT_PROFILE_IMAGE_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: STUDENT_PROFILE_IMAGE_GET_ERROR,
            payload: err.response.data 
        })

    }
}

export const approveStudentProfilePhotos = (review_id, data) => async dispatch => {
    console.log("analytics -> approveStudentProfilePhotos -> method entered");
    try {
        const res = await axios.post(`/admin/review/approve/${review_id}`, data)

        dispatch({
            type: STUDENT_PROFILE_IMAGE_POST_APPROVAL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: STUDENT_PROFILE_IMAGE_POST_APPROVAL_ERROR,
            payload: err.response.data 
        })

    }
}
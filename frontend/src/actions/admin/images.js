import axios from 'axios';
import { COMPANY_IMAGE_GET, COMPANY_IMAGE_GET_ERROR, COMPANY_IMAGE_POST_APPROVAL, COMPANY_IMAGE_POST_APPROVAL_ERROR } from "../types";

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
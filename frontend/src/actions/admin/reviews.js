import axios from 'axios';
import { REVIEWS_GET, REVIEWS_GET_ERROR, POST_APPROVAL, POST_APPROVAL_ERROR } from "../types";

export const getNewReviews = () => async dispatch => {
    console.log("analytics -> getNewReviews -> method entered");
    try {
        const res = await axios.get('/admin/review/newreviews')

        dispatch({
            type: REVIEWS_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: REVIEWS_GET_ERROR,
            payload: err.response.data 
        })

    }
}

export const postApproveReview = (review_id, data) => async dispatch => {
    console.log("analytics -> getCompanyAverageRating -> method entered");
    try {
        const res = await axios.post(`/admin/review/approve/${review_id}`, data)

        dispatch({
            type: POST_APPROVAL,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_APPROVAL_ERROR,
            payload: err.response.data 
        })

    }
}
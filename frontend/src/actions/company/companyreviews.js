import axios from 'axios';
import { setAlert } from '../alert';

import {
    COMPANY_GETREVIEWS,
    COMPANY_GETREVIEW,
    COMPANY_REVIEWS_ERROR,
    MARK_FAVORITE_SUCCESS,
    MARK_FEATURED_SUCCESS,
    REPLY_MESSAGE

} from '../types';

// Get current company's reviews

export const getCurrentCompanyReviews = () => async dispatch => {
    try {
        const res = await axios.get('/company/review/my/reviews')

        dispatch({
            type: COMPANY_GETREVIEWS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_REVIEWS_ERROR,
            payload: { msg: err, status: err.response.status }
        })

    }
}

// mark review as favorite

export const markReviewFav = (id) => async dispatch => {
    try {
        console.log("fav action called")
        const res = await axios.post(`/company/review/favorite/${id}`)
        dispatch(setAlert('Review marked as favorite', 'alert-success'));
        dispatch({
            type: MARK_FAVORITE_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: COMPANY_REVIEWS_ERROR,
            payload: { msg: err, status: err.response.status }
        })

    }
}


export const markReviewFeatured = (id) => async dispatch => {
    try {
        const res = await axios.post(`/company/review/featured/${id}`)

        dispatch({
            type: MARK_FEATURED_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: COMPANY_REVIEWS_ERROR,
            payload: { msg: err, status: err.response.status }
        })

    }
}

export const replyComment = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("formData is ", formData)
        const res = await axios.post(`/company/review/reply/${id}`, formData, config)

        dispatch({
            type: REPLY_MESSAGE,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: COMPANY_REVIEWS_ERROR,
            payload: { msg: err, status: err.response.status }
        })

    }
}
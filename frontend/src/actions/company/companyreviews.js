import axios from 'axios';
import { setAlert } from '../alert';

import {
    COMPANY_GETREVIEWS,
    COMPANY_GETREVIEW,
    COMPANY_REVIEWS_ERROR

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
            payload: { msg: err.repsonse.statusText, status: err.response.status }
        })

    }
}

// mark review as favorite

export const markReviewFav = (id) => async dispatch => {
    try {
        console.log("fav action called")
        const res = await axios.post(`/company/review/favorite/${id}`)

        dispatch({
            type: COMPANY_GETREVIEW,
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
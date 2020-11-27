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
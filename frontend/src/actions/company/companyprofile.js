import axios from 'axios';
import { setAlert } from '../alert';

import {
    COMPANY_GETPROFILE,
    COMPANY_PROFILEERROR
} from '../types';

// Get current logged in company profile

export const getCurrentCompanyProfile = () => async dispatch => {
    try {
        const res = await axios.get('/company/profile')

        dispatch({
            type: COMPANY_GETPROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMPANY_PROFILEERROR,
            payload: { msg: err.repsonse.statusText, status: err.response.status }
        })

    }
}
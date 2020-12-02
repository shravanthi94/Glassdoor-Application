import axios from 'axios';
import { STUDENT_WITHDRAW_APPLICATION , STUDENT_GET_APPLICATIONS, STUDENT_APPLICATIONS_ERROR , STUDENT_WITHDRAW_ERROR} from "../types";

export const getApplications = (student_id) => async dispatch => {
    console.log("inside getApplications ");
    try {
        const res = await axios.get(`/student/applications/job/${student_id}`)

        dispatch({
            type: STUDENT_GET_APPLICATIONS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: STUDENT_APPLICATIONS_ERROR,
            payload: err.response.data 
        })

    }
}

export const withdrawApplications = (application_id, job_id, data) => async dispatch => {
    console.log("inside withdrawApplications ");
    try {
        const res = await axios.post(`/student/applications/job/${job_id}/withdraw${application_id}`, data)

        dispatch({
            type: STUDENT_WITHDRAW_APPLICATION,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: STUDENT_WITHDRAW_ERROR,
            payload: err.response.data 
        })

    }
}
/* eslint-disable import/no-anonymous-default-export */
import { COMPANY_CREATE_JOB, COMPANY_GETALLJOBS, COMPANY_GETJOB, COMPANY_JOBERROR } from '../actions/types'

const initialState = {
    companyjob: null,
    companyjobs: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COMPANY_CREATE_JOB:
        case COMPANY_GETJOB:
            return {
                ...state,
                companyjob: payload,
                loading: false
            }
        case COMPANY_GETALLJOBS:
            return {
                ...state,
                companyjobs: payload,
                loading: false
            }
        case COMPANY_JOBERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;

    }
}
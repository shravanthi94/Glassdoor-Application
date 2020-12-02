import {
    STUDENT_GETALLJOBS,
    STUDENT_JOB_DETAILS,
    STUDENT_APPLY_JOB,
    STUDENT_JOBERROR
  } from '../actions/types'
  
  const initialState = {
    job: null,
    jobs: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case STUDENT_JOB_DETAILS:
            return {
                ...state,
                job: payload,
                loading: false
            }
        case STUDENT_GETALLJOBS:
            return {
                ...state,
                jobs: payload,
                loading: false
            }
        case STUDENT_JOBERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;

    }
}
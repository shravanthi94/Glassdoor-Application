import {
    STUDENT_ADD_RESUME,
    STUDENT_GET_RESUME,
    STUDENT_DELETE_RESUME,
    STUDENT_UPDATE_PRIMARY,
    STUDENT_RESUME_ERROR
} from '../../actions/types' 

const initialState = {
    resume: null,
    resumes: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case STUDENT_ADD_RESUME:
            return {
                ...state,
                resume: payload,
                loading: false
            }
        case STUDENT_GET_RESUME:
            return {
                ...state,
                resumes: payload,
                loading: false
            }
        case STUDENT_RESUME_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;

    }
}
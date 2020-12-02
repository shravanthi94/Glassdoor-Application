import { STUDENT_WITHDRAW_APPLICATION , STUDENT_GET_APPLICATIONS, STUDENT_APPLICATIONS_ERROR , STUDENT_WITHDRAW_ERROR}   from '../actions/types';

const initialState = {
    //loading :true,
    applications : null, 
    applicationsError : null,
    withdraw : null,
    withdrawError:null
    }

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case STUDENT_GET_APPLICATIONS:
            return {
                ...state,
                loading: false,
                applications : payload, 
                applicationsError : null,
                withdraw : null,
                withdrawError:null
            }
        case STUDENT_APPLICATIONS_ERROR:
            return {
                ...state,
                loading: false,
                applications : null, 
                applicationsError : payload,
                withdraw : null,
                withdrawError:null
            }
        case STUDENT_WITHDRAW_APPLICATION:
            return {
                ...state,
                loading: false,
                applications : null, 
                applicationsError : null,
                withdraw : payload,
                withdrawError:null
            }
        case STUDENT_WITHDRAW_ERROR:
            return {
                ...state,
                loading: false,
                applications : null, 
                applicationsError : null,
                withdraw : null,
                withdrawError:payload,
            }
        default:
            return state;
    }
}
/* eslint-disable import/no-anonymous-default-export */
import {
  STUDENT_PROFILE_SUCCESS,
  STUDENT_PROFILE_FAIL,
  STUDENT_COUNT_SUCCESS,
  STUDENT_COUNT_FAIL,
} from '../actions/types';

const initialState = {
  profile: '',
  counts: '',
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case STUDENT_COUNT_SUCCESS:
      return {
        ...state,
        counts: payload,
        loading: false,
      };
    case STUDENT_PROFILE_FAIL:
    case STUDENT_COUNT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

/* eslint-disable import/no-anonymous-default-export */
import {
  STUDENT_PROFILE_SUCCESS,
  STUDENT_PROFILE_FAIL,
  STUDENT_COUNT_SUCCESS,
  STUDENT_COUNT_FAIL,
  STUDENT_CONTRIBUTION_SUCCESS,
  STUDENT_CONTRIBUTION_FAIL,
} from '../actions/types';

const initialState = {
  profile: '',
  counts: '',
  contributions: [],
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
    case STUDENT_CONTRIBUTION_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case STUDENT_CONTRIBUTION_SUCCESS:
      return {
        ...state,
        contributions: payload,
        loading: false,
      };
    default:
      return state;
  }
}

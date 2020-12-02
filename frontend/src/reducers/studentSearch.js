/* eslint-disable import/no-anonymous-default-export */
import {
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_FAIL,
  SEARCH_CLEAR,
} from '../actions/types';

const initialState = {
  results: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_SEARCH_SUCCESS:
      return {
        ...state,
        results: payload,
        loading: false,
      };
    case COMPANY_SEARCH_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SEARCH_CLEAR:
      return {
        ...state,
        results: [],
        loading: false,
      };
    default:
      return state;
  }
}

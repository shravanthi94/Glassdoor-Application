/* eslint-disable import/no-anonymous-default-export */
import { COMPANY_SEARCH_SUCCESS, COMPANY_SEARCH_FAIL } from '../actions/types';

const initialState = {
  results: [],
  reviewCount: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COMPANY_SEARCH_SUCCESS:
      return {
        ...state,
        results: payload.results,
        reviewCount: payload.final,
        loading: false,
      };
    case COMPANY_SEARCH_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

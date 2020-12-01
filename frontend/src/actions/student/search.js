import axios from 'axios';
import {
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_FAIL,
  SEARCH_CLEAR,
} from '../types';

export const companySearchResults = (searchData, query) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/student/landing/search/${searchData}/${query}`,
    );

    dispatch({
      type: COMPANY_SEARCH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log('Error', err.response.data.errors[0].msg);
    dispatch({
      type: COMPANY_SEARCH_FAIL,
      payload: {
        msg: err.response.data.errors[0].msg,
        status: err.response.status,
      },
    });
  }
};

// Logout
export const clearResults = () => (dispatch) => {
  dispatch({
    type: SEARCH_CLEAR,
  });
};

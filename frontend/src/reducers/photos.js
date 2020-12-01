/* eslint-disable import/no-anonymous-default-export */
import { PHOTO_ERROR } from '../actions/types';

const initialState = {
  company: '',
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // case PHOTO_SUCCESS:
    //   return {
    //     ...state,
    //     company: payload,
    //     loading: false,
    //   };
    case PHOTO_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    default:
      return state;
  }
}

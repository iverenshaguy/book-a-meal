import {
  SET_UPLOADING, UNSET_UPLOADING,
  UPLOAD_SUCCESS, UPLOAD_FAILURE, CLEAR_UPLOAD_ERROR
} from '../actions/actionTypes';

const initialState = {
  uploading: false,
  error: null,
  url: null
};

/**
 * Upload Image Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action type
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOADING:
      return { ...state, uploading: true };
    case UNSET_UPLOADING:
      return { ...state, uploading: false };
    case CLEAR_UPLOAD_ERROR:
      return { ...state, error: null };
    case UPLOAD_SUCCESS:
      return { ...state, url: action.payload };
    case UPLOAD_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

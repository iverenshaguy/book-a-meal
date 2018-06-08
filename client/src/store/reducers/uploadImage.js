import {
  SET_UPLOADING, UNSET_UPLOADING,
  UPLOAD_SUCCESS, UPLOAD_FAILURE, CLEAR_UPLOAD_ERROR
} from '../types';

const initialState = {
  uploading: false,
  error: null,
  url: null
};

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

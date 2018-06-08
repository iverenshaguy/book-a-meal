import {
  SET_UPLOADING, UNSET_UPLOADING,
  CLEAR_UPLOAD_ERROR, UPLOAD_SUCCESS, UPLOAD_FAILURE
} from '../types';

const setUploading = () => ({ type: SET_UPLOADING });

const unsetUploading = () => ({ type: UNSET_UPLOADING });

const clearUploadError = () => ({ type: CLEAR_UPLOAD_ERROR });

const uploadSuccess = payload => ({ type: UPLOAD_SUCCESS, payload });

const uploadFailure = payload => ({ type: UPLOAD_FAILURE, payload });

export default {
  setUploading,
  uploadSuccess,
  uploadFailure,
  unsetUploading,
  clearUploadError,
};

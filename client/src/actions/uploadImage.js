import app from '../config/firebase';
import { errorHandler } from '../helpers';
import {
  SET_UPLOADING, UNSET_UPLOADING,
  CLEAR_UPLOAD_ERROR, UPLOAD_SUCCESS, UPLOAD_FAILURE
} from '../constants/actionTypes';

/**
 * @function setUploading
 * @returns {object} action
 */
export const setUploading = () => ({
  type: SET_UPLOADING
});

/**
 * @function unsetUploading
 * @returns {object} action
 */
export const unsetUploading = () => ({
  type: UNSET_UPLOADING
});

/**
 * @function clearUploadError
 * @returns {object} action
 */
export const clearUploadError = () => ({
  type: CLEAR_UPLOAD_ERROR
});

/**
 * @function uploadSuccess
 * @param {object} downloadUrl success response
 * @returns {object} action
 */
export const uploadSuccess = downloadUrl => ({
  type: UPLOAD_SUCCESS,
  payload: downloadUrl
});

/**
 * @function uploadFailure
 * @param {object} error payload error response
 * @returns {object} action
 */
export const uploadFailure = error => ({
  type: UPLOAD_FAILURE,
  payload: error
});

/**
 * Image Upload to Firebase
 * @function uploadImage
 * @param {object} image - image file
 * @param {object} formerImagePath - former user img
 * @param {string} newImagePath - image path
 * @param {function} successCallBack - success callback
 * @returns {function} success callback
 * deletes former image file from firebase if it exists and
 * is not equal to default image. This saves memory for deleted images
 */
export const uploadImage = (
  image,
  formerImagePath,
  newImagePath,
  successCallBack
) => async (dispatch) => {
  const defaultImage = 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg';

  const storage = app.storage();

  const storageRef = storage.ref(newImagePath);

  try {
    dispatch(setUploading());

    const snapshot = await storageRef.put(image);

    if (formerImagePath && formerImagePath !== defaultImage) {
      const formerStorageRef = storage.refFromURL(`${formerImagePath}`);

      formerStorageRef.delete();
    }

    return snapshot.ref.getDownloadURL().then((downloadUrl) => {
      dispatch(uploadSuccess(downloadUrl));
      dispatch(unsetUploading());

      return successCallBack(downloadUrl);
    });
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(uploadFailure(errorResponse));
    dispatch(unsetUploading());
  }
};

import app from 'src/config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { errorHandler } from 'src/features/common/utils/';
import {
  SET_UPLOADING,
  UNSET_UPLOADING,
  CLEAR_UPLOAD_ERROR,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
} from 'src/features/common/constants/actionTypes';

/**
 * @function setUploading
 * @returns {object} action
 */
export const setUploading = () => ({
  type: SET_UPLOADING,
});

/**
 * @function unsetUploading
 * @returns {object} action
 */
export const unsetUploading = () => ({
  type: UNSET_UPLOADING,
});

/**
 * @function clearUploadError
 * @returns {object} action
 */
export const clearUploadError = () => ({
  type: CLEAR_UPLOAD_ERROR,
});

/**
 * @function uploadSuccess
 * @param {object} downloadUrl success response
 * @returns {object} action
 */
export const uploadSuccess = (downloadUrl) => ({
  type: UPLOAD_SUCCESS,
  payload: downloadUrl,
});

/**
 * @function uploadFailure
 * @param {object} error payload error response
 * @returns {object} action
 */
export const uploadFailure = (error) => ({
  type: UPLOAD_FAILURE,
  payload: error,
});

/**
 * Image Upload to Firebase
 * @function actions
 * @param {Blob} image - image file
 * @param {object} formerImagePath - former user img
 * @param {string} newImagePath - image path
 * @param {function} successCallBack - success callback
 * @returns {function} success callback
 * deletes former image file from firebase if it exists and
 * is not equal to default image. This saves memory for deleted images
 */
export const actions = (image, formerImagePath, newImagePath, successCallBack) => async (dispatch) => {
  const defaultImage = 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg';

  const storage = getStorage(app);

  const storageRef = ref(storage, newImagePath);

  try {
    dispatch(setUploading());

    const snapshot = await uploadBytes(storageRef, image);

    if (formerImagePath && formerImagePath !== defaultImage) {
      const formerStorageRef = ref(storage, `${formerImagePath}`);

      // not awaiting this because we don't want to wait for it to finish
      deleteObject(formerStorageRef);
    }

    return getDownloadURL(snapshot.ref).then((downloadUrl) => {
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

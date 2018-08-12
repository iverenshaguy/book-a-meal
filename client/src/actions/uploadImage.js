import app from '../config/firebase';
import { errorHandler } from '../utils';
import {
  SET_UPLOADING, UNSET_UPLOADING,
  CLEAR_UPLOAD_ERROR, UPLOAD_SUCCESS, UPLOAD_FAILURE
} from './actionTypes';

export const setUploading = () => ({ type: SET_UPLOADING });

export const unsetUploading = () => ({ type: UNSET_UPLOADING });

export const clearUploadError = () => ({ type: CLEAR_UPLOAD_ERROR });

export const uploadSuccess = payload => ({ type: UPLOAD_SUCCESS, payload });

export const uploadFailure = payload => ({ type: UPLOAD_FAILURE, payload });

/**
 * Image Upload to Firebase
 * @function uploadImage
 * @param {object} image - image file
 * @param {object} formerImagePath - former user img
 * @param {string} imagePath - image path
 * @param {function} successCallBack - success callback
 * @returns {function} success callback
 */
export const uploadImage = (image, formerImagePath, imagePath, successCallBack) =>
  async (dispatch) => {
    const defaultImage = 'http://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg';

    const storage = app.storage();

    const storageRef = storage.ref(imagePath);

    try {
      dispatch(setUploading());

      const snapshot = await storageRef.put(image);

      if (formerImagePath && formerImagePath !== defaultImage) {
        const formerStorageRef = storage.refFromURL(`${formerImagePath}`);
        // delete file if it exists
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

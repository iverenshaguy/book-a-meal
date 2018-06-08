import app from '../../config/firebase';
import { errorHandler } from '../../utils';
import {
  setUploading,
  unsetUploading,
  clearUploadError,
  uploadSuccess,
  uploadFailure,
} from '../actions/uploadImage';

/**
 * Image Upload to Firebase
 * @function uploadImage
 * @param {object} image - image file
 * @param {object} formerImagePath - former user img
 * @param {string} imagePath - image path
 * @param {function} successCallBack - success callback
 * @returns {function} success callback
 */
const uploadImage = (image, formerImagePath, imagePath, successCallBack) => async (dispatch) => {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/book-a-meal.appspot.com/o/images%2Fplaceholder-image.jpg?alt=media&token=e688dcde-0496-4a10-a456-0825e5202c62';

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

    return snapshot.ref.getDownloadURL().then((downloadURL) => {
      dispatch(uploadSuccess(downloadURL));
      dispatch(unsetUploading());
      return successCallBack(downloadURL);
    });
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(uploadFailure(errorResponse));
    dispatch(unsetUploading());
  }
};

export default {
  setUploading,
  unsetUploading,
  clearUploadError,
  uploadSuccess,
  uploadFailure,
  uploadImage
};

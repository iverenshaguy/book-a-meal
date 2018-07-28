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

export default {
  setUploading,
  unsetUploading,
  clearUploadError,
  uploadSuccess,
  uploadFailure,
  uploadImage
};

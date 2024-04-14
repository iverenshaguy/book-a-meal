import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import {
  actions,
  setUploading,
  uploadSuccess,
  uploadFailure,
  unsetUploading,
  clearUploadError,
} from 'src/features/common/data/images/actions';

jest.mock('firebase/storage');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const uploadSuccessCallback = jest.fn();

// configure Mock store
const store = mockStore({
  uploadTask: null,
  uploading: false,
  error: null,
  url: null,
});

describe('UploadImage Actions', () => {
  describe('setUploading', () => {
    it('should return an object with type SET_UPLOADING', () => {
      const action = setUploading();

      expect(action).toEqual({ type: 'SET_UPLOADING' });
    });
  });

  describe('unsetUploading', () => {
    it('should return an object with type UNSET_UPLOADING', () => {
      const action = unsetUploading();

      expect(action).toEqual({ type: 'UNSET_UPLOADING' });
    });
  });

  describe('uploadSuccess', () => {
    it('should return an object with type UPLOAD_SUCCESS', () => {
      const action = uploadSuccess('a url');

      expect(action).toEqual({ type: 'UPLOAD_SUCCESS', payload: 'a url' });
    });
  });

  describe('uploadFailure', () => {
    it('should return an object with type UPLOAD_FAILURE', () => {
      const action = uploadFailure('an error');

      expect(action).toEqual({ type: 'UPLOAD_FAILURE', payload: 'an error' });
    });
  });

  describe('clearUploadError', () => {
    it('should return an object with type CLEAR_UPLOAD_ERROR', () => {
      const action = clearUploadError();

      expect(action).toEqual({ type: 'CLEAR_UPLOAD_ERROR' });
    });
  });

  describe('UploadImage Operations', () => {
    afterEach(() => {
      store.clearActions();
    });

    describe('UploadImage', () => {
      beforeEach(() => {
        getDownloadURL.mockResolvedValue('http.url.test');
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('should dispatch SET_UPLOADING, UPLOAD_SUCCESS and UNSET_UPLOADING on successful upload', () => {
        const expectedActions = ['SET_UPLOADING', 'UPLOAD_SUCCESS', 'UNSET_UPLOADING'];

        uploadBytes.mockResolvedValueOnce({
          ref: { fullPath: 'images/imagePath.jpg' },
        });

        return store
          .dispatch(actions('image', 'formerImagePath', 'images/imagePath.jpg', uploadSuccessCallback))
          .then(() => {
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map((action) => action.type);

            expect(actionTypes).toEqual(expectedActions);
            expect(deleteObject).toHaveBeenCalled();
          });
      });

      it("should not call delete method if former meal image doesn't exist", () => {
        store.dispatch(actions('image', '', 'images/imagePath.jpg', uploadSuccessCallback)).then(() => {
          expect(deleteObject).not.toHaveBeenCalled();
        });
      });

      it('should not call delete method if former meal image is the default image', () => {
        store
          .dispatch(
            actions(
              'image',
              'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
              'images/imagePath.jpg',
              uploadSuccessCallback
            )
          )
          .then(() => {
            expect(deleteObject).not.toHaveBeenCalled();
          });
      });

      it('should dispatch SET_UPLOADING, UPLOAD_FAILURE and UNSET_UPLOADING on unsuccessful upload', () => {
        const expectedActions = ['SET_UPLOADING', 'UPLOAD_FAILURE', 'UNSET_UPLOADING'];

        uploadBytes.mockImplementation(() => {
          throw new Error('error');
        });

        return store
          .dispatch(actions('image', 'formerImagePath', 'images/imagePath.jpg', uploadSuccessCallback))
          .then(() => {
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map((action) => action.type);

            expect(actionTypes).toEqual(expectedActions);
          });
      });
    });
  });
});

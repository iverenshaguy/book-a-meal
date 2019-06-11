import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  uploadImage,
  setUploading,
  uploadSuccess,
  uploadFailure,
  unsetUploading,
  clearUploadError,
} from '../../src/actions/uploadImage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const uploadSuccesCallback = jest.fn();

// configure Mock store
const store = mockStore({
  uploadTask: null,
  uploading: false,
  error: null,
  url: null
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
      it('should dispatch SET_UPLOADING, UPLOAD_SUCCESS and UNSET_UPLOADING on successful upload', () => {
        const expectedActions = ['SET_UPLOADING', 'UPLOAD_SUCCESS', 'UNSET_UPLOADING'];
        const deleteMock = jest.fn();

        mocksdk.storage().refFromURL = () => ({
          delete: deleteMock
        });

        mocksdk.storage().ref = () => ({
          put: () => ({
            ref: {
              getDownloadURL: () => ({
                then: (fn) => {
                  fn('http.url.test');
                }
              })
            }
          })
        });

        return store.dispatch(uploadImage('image', 'formerImagePath', 'images/imagePath.jpg', uploadSuccesCallback)).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
          expect(deleteMock).toHaveBeenCalled();
        });
      });

      it('should not call delete method if former meal image doesn\'t exist', () => store.dispatch(uploadImage('image', '', 'images/imagePath.jpg', uploadSuccesCallback)).then(() => {
        const deleteMock = jest.fn(() => 'second');

        mocksdk.storage().refFromURL = () => ({
          delete: deleteMock
        });

        expect(deleteMock).not.toHaveBeenCalled();
      }));

      it('should not call delete method if former meal image is the default image', () => store.dispatch(uploadImage('image', 'http://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg', 'images/imagePath.jpg', uploadSuccesCallback)).then(() => {
        const deleteMock = jest.fn(() => 'third');

        mocksdk.storage().refFromURL = () => ({
          delete: deleteMock
        });

        expect(deleteMock).not.toHaveBeenCalled();
      }));

      it('should dispatch SET_UPLOADING, UPLOAD_FAILURE and UNSET_UPLOADING on unsuccessful upload', () => {
        const expectedActions = ['SET_UPLOADING', 'UPLOAD_FAILURE', 'UNSET_UPLOADING'];

        mocksdk.storage().ref = () => ({
          put: () => { throw new Error('error'); }
        });

        return store.dispatch(uploadImage('image', 'formerImagePath', 'images/imagePath.jpg', uploadSuccesCallback)).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});

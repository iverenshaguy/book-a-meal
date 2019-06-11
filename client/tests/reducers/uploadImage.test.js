import reducer from '../../src/reducers/uploadImage';

const state = {
  uploading: false,
  error: null,
  url: null
};

describe('UploadImage Reducers', () => {
  it('should return initial state', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle SET_UPLOADING action', () => {
    const newState = reducer(state, {
      type: 'SET_UPLOADING'
    });

    expect(newState).toEqual({ ...state, uploading: true });
  });

  it('should handle UNSET_UPLOADING action', () => {
    const newState = reducer({ ...state, uploading: true }, {
      type: 'UNSET_UPLOADING'
    });

    expect(newState).toEqual({ ...state, uploading: false });
  });

  it('should handle CLEAR_UPLOAD_ERROR action', () => {
    const newState = reducer({ ...state, error: 'Error' }, {
      type: 'CLEAR_UPLOAD_ERROR'
    });

    expect(newState).toEqual({ ...state, error: null });
  });

  it('should handle UPLOAD_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'UPLOAD_SUCCESS',
      payload: 'http.test.com/image.jpg'
    });

    expect(newState).toEqual({ ...state, url: 'http.test.com/image.jpg' });
  });

  it('should handle UPLOAD_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'UPLOAD_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });
});


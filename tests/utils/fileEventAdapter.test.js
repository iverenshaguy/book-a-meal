import fileEventAdapter from '../../src/utils/fileEventAdapter';

const readAsDataURL = jest.fn();
const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
const dummyFileReader = { addEventListener, readAsDataURL, result: 'Result' };
window.FileReader = jest.fn(() => dummyFileReader);

describe('Utils: fileEventAdapter', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should adapt file data to preview source', () => {
    const preview = { src: '' };
    const file = new Blob();
    const event = { target: { files: [file] } };

    fileEventAdapter(preview)(event);

    expect(addEventListener).toHaveBeenCalled();
    expect(readAsDataURL).toHaveBeenCalledWith(file);
    expect(preview.src).toEqual('Result');
  });
});

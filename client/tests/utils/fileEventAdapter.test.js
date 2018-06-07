import fileEventAdapter from '../../src/utils/fileEventAdapter';

const readAsDataURL = jest.fn();
const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
const dummyFileReader = { addEventListener, readAsDataURL, result: 'Result' };
window.FileReader = jest.fn(() => dummyFileReader);

const event = { target: { files: ['My file'] } };

describe('Utils: fileEventAdapter', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('works as expected', () => {
    const preview = { src: '' };

    fileEventAdapter(preview)(event);

    expect(addEventListener).toHaveBeenCalled();
    expect(readAsDataURL).toHaveBeenCalledWith('My file');
    expect(preview.src).toEqual('Result');
  });
});

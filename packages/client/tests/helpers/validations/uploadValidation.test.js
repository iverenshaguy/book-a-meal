import uploadValidation from '../../../src/helpers/validations/uploadValidation';

const rightImgFile = { type: 'application/gif', size: '9803' };
const pdfFile = { type: 'application/pdf', size: '9803' };
const largeFile = { type: 'application/jpeg', size: 3 * 1024 * 1024 };
const actionTypes = ['application/jpeg', 'application/gif', 'application/png'];
const maxSize = 2 * 1024 * 1024;

describe('Upload Validation', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return null i.e. no error for right file input', () => {
    const validate = uploadValidation(rightImgFile, maxSize, actionTypes);

    expect(validate).toEqual(null);
  });

  it('should return an error for invalid file type', () => {
    const validate = uploadValidation(pdfFile, maxSize, actionTypes);

    expect(validate).toEqual('Invalid File Type');
  });

  it('should return an error for large file size', () => {
    const validate = uploadValidation(largeFile, maxSize, actionTypes);

    expect(validate).toEqual('File Too Large');
  });
});

import uploadValidation from '../../../src/helpers/validations/uploadValidation';

const rightImgFile = { type: 'application/gif', size: '9803' };
const pdfFile = { type: 'application/pdf', size: '9803' };
const largeFile = { type: 'application/jpeg', size: 3 * 1024 * 1024 };
const types = ['application/jpeg', 'application/gif', 'application/png'];
const maxSize = 2 * 1024 * 1024;

describe('Upload Validation', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Right Image File', () => {
    const validate = uploadValidation(rightImgFile, maxSize, types);

    expect(validate).toEqual(null);
  });

  test('PDF File', () => {
    const validate = uploadValidation(pdfFile, maxSize, types);

    expect(validate).toEqual('Invalid File Type');
  });

  test('Large File', () => {
    const validate = uploadValidation(largeFile, maxSize, types);

    expect(validate).toEqual('File Too Large');
  });
});

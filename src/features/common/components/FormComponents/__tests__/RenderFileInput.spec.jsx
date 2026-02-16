import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RenderFileInput } from 'src/features/common/components/FormComponents/RenderFileInput';

const props = {
  id: '1',
  name: 'image',
  label: 'Image',
  updating: false,
  uploading: false,
  uploadImage: jest.fn(),
  uploadError: null,
  formerImgUrl: 'image.jpg',
  clearUploadError: jest.fn(),
  successCallBack: jest.fn(),
};

const goodFile = new File([''], 'photo.jpg', { type: 'image/jpeg' });
const badFile = new File([''], 'doc.pdf', { type: 'application/pdf' });

describe('Form Components: RenderFileInput', () => {
  it('should render correctly', () => {
    const { container } = render(<RenderFileInput {...props} />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('div.file-feedback')).not.toBeInTheDocument();
  });

  it('should show error when there is an upload error', () => {
    const { container } = render(<RenderFileInput {...props} uploadError="This is an error" />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('should show preloader when uploading', () => {
    const { container } = render(<RenderFileInput {...props} uploading />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
  });

  it('should call clearUploadError on input click', async () => {
    const user = userEvent.setup();
    const clearUploadErrorMock = jest.fn();
    render(<RenderFileInput {...props} clearUploadError={clearUploadErrorMock} />);

    const input = screen.getByLabelText(/image/i);
    await user.click(input);

    expect(clearUploadErrorMock).toHaveBeenCalled();
  });

  it('should call uploadImage when a valid file is selected', async () => {
    const user = userEvent.setup();
    const uploadImageMock = jest.fn();
    const { container } = render(<RenderFileInput {...props} uploadImage={uploadImageMock} />);

    const input = container.querySelector('input[type="file"]');
    await user.upload(input, goodFile);

    expect(uploadImageMock).toHaveBeenCalled();
  });

  it('should not call uploadImage when an invalid file is selected', async () => {
    const user = userEvent.setup();
    const uploadImageMock = jest.fn();
    const { container } = render(<RenderFileInput {...props} uploadImage={uploadImageMock} />);

    const input = container.querySelector('input[type="file"]');
    await user.upload(input, badFile);

    expect(uploadImageMock).not.toHaveBeenCalled();
  });
});

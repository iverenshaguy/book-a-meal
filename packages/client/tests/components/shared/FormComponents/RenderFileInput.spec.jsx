import React from 'react';
import RenderFileInput from '../../../../src/components/shared/FormComponents/RenderFileInput';

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

const goodFile = new Blob([''], {
  type: 'image/jpeg',
  size: '500'
});

const badFile = new Blob([''], {
  type: 'image/pdf',
  size: '500'
});

describe('Form Components: RenderFileInput', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RenderFileInput {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('div.file-feedback').exists()).toBeFalsy();
  });

  it('should show error when there is an upload error', () => {
    const wrapper = shallow(<RenderFileInput {...props} uploadError="This is an error" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.file-feedback').text()).toEqual('This is an error');
  });

  it('should show preloader when uploading', () => {
    const wrapper = shallow(<RenderFileInput {...props} uploading />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('MiniPreloader')).toBeTruthy();
  });

  it('should call handle click on input click', () => {
    const uploadImageMock = jest.fn();
    const wrapper = shallow(<RenderFileInput {...props} uploadImage={uploadImageMock} />);

    wrapper.setState({ error: 'error' });
    wrapper.find('input').simulate('click');

    expect(wrapper.state().error).toEqual(null);
  });

  it('should call uploadImage if a valid file is passed in and there is no upload error', () => {
    const uploadImageMock = jest.fn();
    const wrapper = shallow(<RenderFileInput {...props} uploadImage={uploadImageMock} />);
    const event = {
      target: {
        files: [goodFile]
      }
    };

    wrapper.find('input').simulate('change', event);

    expect(uploadImageMock).toHaveBeenCalled();
  });

  it('should not call uploadImage if an invalid file is passed in', () => {
    const uploadImageMock = jest.fn();
    const wrapper = shallow(<RenderFileInput {...props} uploadImage={uploadImageMock} />);
    const event = {
      target: {
        files: [badFile]
      }
    };

    wrapper.find('input').simulate('change', event);

    expect(uploadImageMock).not.toHaveBeenCalled();
  });
});

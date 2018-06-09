import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MiniPreloader from '../../Preloader/MiniPreloader';
import fileEventAdapter from '../../../../utils/fileEventAdapter';
import uploadValidation from '../../../../helpers/validations/uploadValidation';

/**
 * @exports
 * @class RenderFileInput
 * @extends Component
 * @return {JSX} RenderFileInput
 */
class RenderFileInput extends Component {
  /**
   * @constructor
   * @return {JSX} RenderFileInput
   */
  constructor() {
    super();

    this.state = {
      error: null
    };
  }

  /**
   * @memberof Form
   * @param {object} event
   * @param {element} preview
   * @returns {nothing} Returns nothing
   */
  handleChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB max size
    const allowedTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const {
      clearUploadError, formerImgURL, successCallBack, uploadImage
    } = this.props;
    const preview = document.querySelector('#meal-form-image');

    this.setState({ error: null });
    clearUploadError();

    if (!uploadValidation(file, maxSize, allowedTypes)) {
      fileEventAdapter(preview)(event);
      const fileType = file.type;
      const fileExt = fileType.split('/')[1];

      return uploadImage(file, formerImgURL, `images/${Date.now()}.${fileExt}`, successCallBack);
    }

    this.setState({ error: uploadValidation(file, maxSize, allowedTypes) });
    // reset input box
    event.target.value = '';
  }

  /**
   * @function RenderFileInput
   * @return {JSX} RenderFileInput
   */
  render() {
    const {
      id, name, label, uploading, uploadError, updating, formerImgURL
    } = this.props;
    const error = this.state.error || uploadError;

    return (
      <div className="form-input form-img-input">
        {label && <label htmlFor={id}>{label}</label>}
        <div id="form-image-preview">
          {(uploading || updating) &&
            <div className="img-overlay" id="img-overlay">
              <MiniPreloader />
            </div>}
          <img src={formerImgURL} alt="meal" id="meal-form-image" />
        </div>
        <input
          id={id}
          type="file"
          name={name}
          accept="image/*"
          onChange={this.handleChange}
        />
        {error && <small className="file-feedback">{error}</small>}
      </div>
    );
  }
}

RenderFileInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updating: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadError: PropTypes.string,
  formerImgURL: PropTypes.string.isRequired,
  clearUploadError: PropTypes.func.isRequired,
  successCallBack: PropTypes.func.isRequired,
};

RenderFileInput.defaultProps = {
  uploadError: null,
};

export default RenderFileInput;

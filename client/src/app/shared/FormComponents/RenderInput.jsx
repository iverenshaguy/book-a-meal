import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderFormFieldPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function RenderInput
 * @param {object} props
 * @returns {JSX} RenderInput
 */
const RenderInput = ({
  id,
  rows,
  name,
  type,
  label,
  required,
  placeholder,
  meta: {
    error,
    touched
  },
  handleChange,
  handleBlur,
  handleFocus,
  value
}) => {
  const validInput = classNames({
    'is-invalid': touched && error,
    'is-valid': touched && !error
  });

  const validFeedBack = classNames({
    'invalid-feedback': touched && error,
    'd-none': touched && !error
  });

  const formInputClass = type === 'checkbox' ? 'form-input-checkbox' : 'form-input';

  return (
    <Fragment>
      <div className={formInputClass}>
        {label && type !== 'checkbox' &&
          <label htmlFor={id}>
            {label}
            {required && <span className="danger">*</span>}
          </label>}
        <input
          id={id}
          type={type}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={validInput}
          value={value}
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e)}
          onFocus={e => handleFocus(e)}
        />
        {type === 'checkbox' &&
          <label htmlFor={id}>
            {label}
          </label>}
        {touched && error && <div className={validFeedBack}>{error}</div>}
      </div>
    </Fragment>
  );
};

RenderInput.propTypes = {
  ...renderFormFieldPropTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
};

RenderInput.defaultProps = {
  value: ''
};

export default RenderInput;

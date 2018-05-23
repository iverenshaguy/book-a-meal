import React, { Fragment } from 'react';
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
  name,
  type,
  label,
  required,
  placeholder,
  meta: {
    error,
    touched,
    asyncValidating
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

  const input = (<input
    id={id}
    type={type}
    name={name}
    placeholder={placeholder}
    className={validInput}
    value={value}
    onChange={e => handleChange(e)}
    onBlur={e => handleBlur(e)}
    onFocus={e => handleFocus(e)}
  />);

  return (
    <Fragment>
      <div className="form-input">
        {label &&
          <label htmlFor={id}>
            {label}
            {required && <span className="danger">*</span>}
          </label>}
        {input}
        {touched && error && <div className={validFeedBack}>{error}</div>}
        {touched && (name === 'email' || name === 'username') &&
          asyncValidating && <small className="form-text">Checking...</small>}
      </div>
    </Fragment>
  );
};

RenderInput.propTypes = {
  ...renderFormFieldPropTypes
};

export default RenderInput;

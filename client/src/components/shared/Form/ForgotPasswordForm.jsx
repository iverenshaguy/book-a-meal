import React, { Fragment } from 'react';
import { RenderInput } from '../../shared/FormComponents';
import { formPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function ForgotPasswordForm
 * @param {object} props
 * @returns {JSX} ForgotPasswordForm
 */
const ForgotPasswordForm = ({ state, handlers }) => (
  <Fragment>
    <RenderInput
      type="email"
      name="email"
      label="Your Email Address"
      id="email"
      required
      value={state.values.email}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
        touched: state.touched.email,
        error: state.error.email
      }}
    />
  </Fragment>
);

ForgotPasswordForm.propTypes = {
  ...formPropTypes('forgotPassword')
};

export default ForgotPasswordForm;

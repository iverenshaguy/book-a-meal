import React, { Fragment } from 'react';
import { RenderInput } from 'src/features/common/components/FormComponents';
import { formPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @exports
 * @function ForgotPasswordForm
 * @param {object} props
 * @returns {React.ComponentClass} ForgotPasswordForm
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
        error: state.error.email,
      }}
    />
  </Fragment>
);

ForgotPasswordForm.propTypes = {
  ...formPropTypes('forgotPassword'),
};

export default ForgotPasswordForm;

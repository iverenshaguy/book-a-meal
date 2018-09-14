import React, { Fragment } from 'react';
import { RenderInput } from '../../shared/FormComponents';
import { formPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function ResetPasswordForm
 * @param {object} props
 * @returns {JSX} ResetPasswordForm
 */
const ResetPasswordForm = ({ state, handlers }) => (
  <Fragment>
    <RenderInput
      type="password"
      name="password"
      label="Password"
      id="password"
      required
      value={state.values.password}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
          touched: state.touched.password,
          error: state.error.password,
        }}
    />

    <RenderInput
      type="password"
      name="passwordConfirm"
      label="Confirm Your Password"
      id="passwordConfirm"
      required
      value={state.values.passwordConfirm}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
          touched: state.touched.passwordConfirm,
          error: state.error.passwordConfirm
        }}
    />
  </Fragment>
);

ResetPasswordForm.propTypes = {
  ...formPropTypes('resetPassword')
};

export default ResetPasswordForm;

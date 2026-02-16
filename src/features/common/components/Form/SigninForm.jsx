import React, { Fragment } from 'react';
import { RenderInput } from 'src/features/common/components/FormComponents';
import { formPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @exports
 * @function SigninForm
 * @param {object} props
 * @returns {React.ComponentClass} SigninForm
 */
const SigninForm = ({ state, handlers }) => (
  <Fragment>
    <RenderInput
      type="email"
      name="email"
      label="Email Address"
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
        asyncValidating: state.asyncValidating,
      }}
    />

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
  </Fragment>
);

SigninForm.propTypes = {
  ...formPropTypes('signin'),
};

export default SigninForm;

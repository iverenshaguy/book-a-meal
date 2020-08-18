import React, { Fragment } from 'react';
import { RenderInput } from '../FormComponents';
import { formPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function CustomerSignupForm
 * @param {object} props
 * @returns {JSX} CustomerSignupForm
 */
const CustomerSignupForm = ({ state, handlers }) => (
  <Fragment>
    <RenderInput
      type="text"
      name="firstname"
      id="firstname"
      label="First Name"
      required
      value={state.values.firstname}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
        touched: state.touched.firstname,
        error: state.error.firstname,
        asyncValidating: state.asyncValidating
      }}
    />
    <RenderInput
      type="text"
      name="lastname"
      id="lastname"
      label="Last Name"
      required
      value={state.values.lastname}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
        touched: state.touched.lastname,
        error: state.error.lastname,
        asyncValidating: state.asyncValidating
      }}
    />
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
        asyncValidating: state.asyncValidating
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
        error: state.error.password
      }}
    />
    <RenderInput
      type="password"
      name="passwordConfirm"
      label="Password Confirm"
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

CustomerSignupForm.propTypes = {
  ...formPropTypes('customerSignup')
};

export default CustomerSignupForm;

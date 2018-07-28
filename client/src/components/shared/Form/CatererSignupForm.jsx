import React, { Fragment } from 'react';
import { RenderInput } from '../../shared/FormComponents';
import { formPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function CatererSignupForm
 * @param {object} props
 * @returns {JSX} CatererSignupForm
 */
const CatererSignupForm = ({ state, handlers }) => (
  <Fragment>
    <RenderInput
      type="text"
      name="businessName"
      id="businessName"
      label="Business Name"
      required
      value={state.values.businessName}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
        touched: state.touched.businessName,
        error: state.error.businessName,
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
    <RenderInput
      type="text"
      name="businessPhoneNo"
      id="businessPhoneNo"
      label="Business Phone Number (e.g. 08123456789)"
      required
      value={state.values.businessPhoneNo}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
        touched: state.touched.businessPhoneNo,
        error: state.error.businessPhoneNo,
        asyncValidating: state.asyncValidating
      }}
    />
    <RenderInput
      type="text-area"
      row={2}
      name="businessAddress"
      id="businessAddress"
      label="Business Address"
      required
      value={state.values.businessAddress}
      placeholder=""
      handleChange={handlers.handleChange}
      handleBlur={handlers.handleBlur}
      handleFocus={handlers.handleFocus}
      meta={{
        touched: state.touched.businessAddress,
        error: state.error.businessAddress,
        asyncValidating: state.asyncValidating
      }}
    />
  </Fragment>
);

CatererSignupForm.propTypes = {
  ...formPropTypes('catererSignup')
};

export default CatererSignupForm;

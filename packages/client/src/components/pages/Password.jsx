import React, { Fragment, Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { authPropTypes } from '../../helpers/proptypes';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import Form from '../../containers/shared/Form';

/**
 * @exports
 * @class Password
 * @extends Component
 * @classdesc Creates Password Component
 * @returns {JSX} Password Component
 */
class Password extends Component {
  static propTypes = {
    ...authPropTypes,
    type: PropTypes.string.isRequired,
    passwordSetSuccess: PropTypes.bool.isRequired,
    mailSendSuccess: PropTypes.bool.isRequired
  }

  /**
   * @memberof Password
   * @returns {object} Password Meta Object
   */
  getMeta = () => {
    let btnText;
    const { type } = this.props;

    const catererSignupLink = <Link to="/signup?role=caterer">Caterer</Link>;

    const customerSignupLink = <Link to="/signup?role=customer">Customer</Link>;

    const signinLink = (
      <Fragment>
        <Link to="/signin">Sign In</Link>
      </Fragment>
    );

    switch (type) {
      case 'forgotPassword':
        btnText = 'SEND ME THE LINK';
        break;
      default:
        btnText = 'RESET PASSWORD';
    }

    return {
      btnText,
      extra: (
        <Fragment>
          {type === 'forgotPassword'
          && (
          <Fragment>
            <p className="form-extra-info text-center">{signinLink}</p>
            <p className="text-center">Or</p>
            <p className="form-extra-info text-center">
              Signup as a
              {catererSignupLink}
              {' '}
              or a
              {customerSignupLink}
            </p>
          </Fragment>
          )
          }
        </Fragment>)
    };
  }

  /**
   * @memberof Password
   * @returns {string|JSX} Confirmation Text|Message
   */
  renderResetPasswordSuccess = () => (
    <div className="password-div">
      <p className="text-center">Password Reset Successful. Please Sign In Below.</p>
      <Link to="/signin">
        <button type="button" className="btn btn-pri">Sign In</button>
      </Link>
    </div>
  )

  /**
   * @memberof Password
   * @returns {string|JSX} Confirmation Text|Message
   */
  renderInvalidTokenError = () => (
    <div className="password-div">
      <p className="text-center">Password reset token is invalid or has expired.</p>
      <Link to="/forgot-password">
        <button type="button" className="btn btn-pri">Resend Email</button>
      </Link>
    </div>
  )

  /**
   * @memberof Password
   * @returns {string} Confirmation Text
   */
  renderForgotPasswordComp = () => {
    const { mailSendSuccess, type } = this.props;
    const meta = this.getMeta();

    return (
      <Fragment>
        <div className="title">
          <h2>Forgot Password</h2>
          {!mailSendSuccess
          && <h4 className="text-info">A link will be sent to your mail to use to reset your password</h4>}
          <hr className="w-75" />
        </div>
        {!mailSendSuccess && <Form {...this.props} type={type} meta={meta} />}
        {mailSendSuccess && <p className="text-center">A mail with a reset token has been sent to your mail.</p>}
      </Fragment>
    );
  }

  /**
   * @memberof Password
   * @returns {string} Confirmation Text
   */
  renderResetPasswordComp = () => {
    const {
      passwordSetSuccess, location, submitError, type
    } = this.props;
    const query = queryString.parse(location.search);
    const { token, email } = query;
    const meta = this.getMeta();
    const invalidTokenError = submitError === 'Password reset token is invalid or has expired';

    return (
      <Fragment>
        <div className="title">
          <h2>Reset Your Password</h2>
          <hr className="w-75" />
        </div>
        {!passwordSetSuccess && !invalidTokenError
        && <Form {...this.props} token={token} email={email} type={type} meta={meta} />}
        {!passwordSetSuccess && invalidTokenError && this.renderInvalidTokenError()}
        {passwordSetSuccess && this.renderResetPasswordSuccess()}
      </Fragment>
    );
  }

  /**
   * @memberof Password
   * @returns {JSX} Password Component
   */
  render() {
    const { isAuthenticated, type } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Header type="unauth" />
        <div className="main-wrapper auth-wrapper">
          <div className="auth">
            {type === 'forgotPassword' && this.renderForgotPasswordComp()}
            {type === 'resetPassword' && this.renderResetPasswordComp()}
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Password;

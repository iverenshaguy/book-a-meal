import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { authPropTypes } from 'src/features/common/utils/proptypes';
import Header from 'src/features/common/components/Header';
import Footer from 'src/features/common/components/Footer';
import Form from 'src/features/common/components/Form';

/**
 * @exports
 * @class Auth
 * @extends Component
 * @classdesc Creates Index Component
 * @returns {React.ComponentClass} Index Component
 */
export class Auth extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    ...authPropTypes,
  };

  /**
   * @static
   * @memberof Auth
   * @param {object} props
   * @returns {nothing} nothing
   */
  static getDerivedStateFromProps(props) {
    const query = queryString.parse(props.location.search);
    const { role } = query;

    if (props.type === 'signup') {
      return { type: role === 'caterer' ? 'catererSignup' : 'customerSignup' };
    }

    return { type: 'signin' };
  }

  state = {
    type: '',
  };

  /**
   * @memberof Auth
   * @returns {object} Index Meta Object
   */
  getMeta = () => {
    let btnText, para1, para2;

    const { type } = this.state;
    const catererSignupLink = <Link to="/signup?role=caterer">Signup as a Caterer</Link>;
    const customerSignupLink = <Link to="/signup?role=customer">Signup as a Customer</Link>;
    const signinLink = (
      <Fragment>
        Already have an account? <Link to="/signin">Sign In Here</Link>
      </Fragment>
    );

    switch (type) {
      case 'customerSignup':
        btnText = 'SIGN UP';
        para1 = signinLink;
        para2 = catererSignupLink;
        break;
      case 'catererSignup':
        btnText = 'SIGN UP';
        para1 = signinLink;
        para2 = customerSignupLink;
        break;
      default:
        btnText = 'SIGN IN';
        para1 = (
          <Fragment>
            Don't have an account? <Link to="/signup?role=customer">Signup Here</Link>
          </Fragment>
        );
        para2 = catererSignupLink;
    }

    return {
      btnText,
      extra: (
        <Fragment>
          {type === 'signin' && (
            <p className="form-extra-info forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          )}
          <p className="form-extra-info text-center">{para1}</p>
          <p className="text-center">Or</p>
          <p className="form-extra-info text-center">{para2}</p>
        </Fragment>
      ),
    };
  };

  /**
   * @memberof Auth
   * @returns {string} Index Form Title
   */
  getFormTitle = () => {
    const { type } = this.state;

    switch (type) {
      case 'customerSignup':
        return 'Start Filling Your Belly';
      case 'catererSignup':
        return 'Start Serving Customers';
      default:
        return 'Welcome Back';
    }
  };

  /**
   * @memberof Auth
   * @returns {React.ComponentClass} Index Component
   */
  render() {
    const { location, isAuthenticated, type } = this.props;
    const { type: authType } = this.state;
    const meta = this.getMeta();
    const title = this.getFormTitle();
    const { from } = location.state ? location.state : { from: { pathname: '/' } };
    const newLocation = type === 'signin' ? from : '/';

    if (isAuthenticated) {
      return <Redirect to={newLocation} />;
    }

    return (
      <Fragment>
        <Header type="unauth" />
        <div className="main-wrapper auth-wrapper">
          <div className="auth">
            <div className="title">
              <h2>{title}</h2>
              <hr className="w-75" />
            </div>
            <Form {...this.props} type={authType} meta={meta} />
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  submitting: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  submitError: state.auth.error,
});

export default connect(mapStateToProps)(Auth);

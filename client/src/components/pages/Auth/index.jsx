import React, { Fragment, Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { urlPropTypes, authPropTypes } from '../../../helpers/proptypes';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Form from '../../../containers/shared/Form';

/**
 * @exports
 * @class Auth
 * @extends Component
 * @classdesc Creates Auth Component
 * @returns {JSX} Auth Component
 */
class Auth extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    ...urlPropTypes,
    ...authPropTypes
  }

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
    type: ''
  }

  /**
   * @memberof Auth
   * @returns {object} Auth Meta Object
   */
  getMeta = () => {
    let btnText, para1, para2;

    const catererSignupLink =
      <Link href="/signup?role=caterer" to="/signup?role=caterer">Signup as a Caterer</Link>;
    const customerSignupLink =
      <Link href="/signup?role=customer" to="/signup?role=customer">Signup as a Customer</Link>;
    const signinLink = (
      <Fragment>
        Already have an account? Sign in <Link href="/signin" to="/signin">here</Link>
      </Fragment>
    );

    switch (this.state.type) {
      case 'customerSignup':
        btnText = 'SIGN UP'; para1 = signinLink; para2 = catererSignupLink;
        break;
      case 'catererSignup':
        btnText = 'SIGN UP'; para1 = signinLink; para2 = customerSignupLink;
        break;
      default:
        btnText = 'SIGN IN';
        para1 = <Fragment>{"Don't have an account, signup"} <Link href="/signup?role=customer" to="/signup?role=customer">here</Link></Fragment>;
        para2 = catererSignupLink;
    }

    return {
      btnText,
      extra: (
        <Fragment>
          <p className="form-extra-info text-center">{para1}</p>
          <p className="text-center">Or</p>
          <p className="form-extra-info text-center">{para2}</p>
        </Fragment>)
    };
  }

  /**
   * @memberof Auth
   * @returns {string} Auth Form Title
   */
  getFormTitle = () => {
    switch (this.state.type) {
      case 'customerSignup':
        return 'Start Filling Your Belly';
      case 'catererSignup':
        return 'Start Serving Customers';
      default:
        return 'Welcome Back';
    }
  }

  /**
   * @memberof Auth
   * @returns {JSX} Auth Component
   */
  render() {
    const meta = this.getMeta();
    const title = this.getFormTitle();
    const { from } = this.props.location.state ? this.props.location.state : { from: { pathname: '/' } };
    const newLocation = this.props.type === 'signin' ? from : '/';

    if (this.props.isAuthenticated) {
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
            <Form {...this.props} type={this.state.type} meta={meta} />
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Auth;

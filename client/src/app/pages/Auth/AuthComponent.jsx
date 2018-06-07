import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { urlPropTypes, authPropTypes } from '../../../helpers/proptypes';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Form from '../../shared/Form';
import LinkBtn from '../../shared/Link';

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
    ...authPropTypes,
    changeUrl: PropTypes.func.isRequired
  }

  /**
   * @memberof Auth
   * @returns {nothin} nothing
   */
  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    const { role } = query;

    if (this.props.type === 'signup' && role === 'caterer') {
      return this.setState({ type: 'catererSignup' });
    }

    if (this.props.type === 'signup' && (!role || role === 'customer')) {
      return this.setState({ type: 'customerSignup' });
    }

    return this.setState({ type: 'signin' });
  }

  /**
   * @memberof Auth
   * @returns {object} Auth Meta Object
   */
  getMeta = () => {
    let btnText, para1, para2;

    switch (this.state.type) {
      case 'customerSignup':
        btnText = 'SIGN UP';
        para1 = <Fragment>Already have an account? Sign in <LinkBtn clickHandler={() => this.changeForm('signin')}>here</LinkBtn></Fragment>;
        para2 = <LinkBtn clickHandler={() => this.changeForm('catererSignup')}>Signup as a Caterer</LinkBtn>;
        break;
      case 'catererSignup':
        btnText = 'SIGN UP';
        para1 = <Fragment>Already have an account? Sign in <LinkBtn clickHandler={() => this.changeForm('signin')}>here</LinkBtn></Fragment>;
        para2 = <LinkBtn clickHandler={() => this.changeForm('customerSignup')}>Signup as a Customer</LinkBtn>;
        break;
      default:
        btnText = 'SIGN IN';
        para1 = <Fragment>{"Don't have an account, signup"} <LinkBtn clickHandler={() => this.changeForm('customerSignup')}>here</LinkBtn></Fragment>;
        para2 = <LinkBtn clickHandler={() => this.changeForm('catererSignup')}>Signup as a Caterer</LinkBtn>;
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
   * @param {string} type auth type
   * @desc changes active form
   * @returns {nothing} returns nothing
   */
  changeForm = (type) => {
    this.setState({ type });

    switch (type) {
      case 'customerSignup':
        return this.props.changeUrl('/signup?role=customer');
      case 'catererSignup':
        return this.props.changeUrl('/signup?role=caterer');
      default:
        return this.props.changeUrl('/signin');
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

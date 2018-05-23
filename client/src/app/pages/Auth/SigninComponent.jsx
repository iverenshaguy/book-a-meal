import React, { Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Form from '../../shared/Form';

const signinMeta = {
  btnText: 'SIGN IN',
  extra: (
    <div className="content">
      <p className="form-extra-info text-center">{"Don't have an account, signup"}
        <a href="./signup?role=user"> here</a>
      </p>
      <p className="text-center">Or</p>
      <p className="form-extra-info text-center">
        <a href="./signup?role=caterer">Signup as a Caterer</a>
      </p>
    </div>)
};

const Signin = props => (
  <Fragment>
    <Header />
    <div className="main-wrapper auth-wrapper">
      <div className="auth">
        <div className="title">
          <h2>Welcome Back</h2>
          <hr className="w-75" />
        </div>
        <Form {...props} type="signin" meta={signinMeta} />
      </div>
    </div>
    <Footer />
  </Fragment>
);

export default Signin;

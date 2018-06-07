import React, { Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';

const message = 'I\'M HUNGRY';

const Welcome = () => (
  <Fragment>
    <Header type="home" />
    <div className="main-wrapper home">
      <div className="landing">
        <h1>Delicious Meals At Your Fingertips</h1>
        <a href="/signin">
          <button className="btn btn-pri">{message}</button>
        </a>
      </div>
    </div>
    <Footer />
  </Fragment>
);

export default Welcome;

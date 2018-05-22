import React, { Fragment } from 'react';
import { HeaderComponent as Header } from '../../shared/Header';
import { FooterComponent as Footer } from '../../shared/Footer';

const message = 'I\'M HUNGRY';

const Welcome = () => (
  <Fragment>
    <Header />
    <div className="main-wrapper home">
      <div className="landing">
        <h1>Delicious Meals At Your Fingertips</h1>
        <a href="./login.html">
          <button className="btn btn-pri">{message}</button>
        </a>
      </div>
    </div>
    <Footer />
  </Fragment>
);

export default Welcome;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Dashboard from '../Dashboard';
import Preloader from '../../shared/Preloader';
import { userPropTypes } from '../../../helpers/proptypes';

const message = 'I\'M HUNGRY';

const Welcome = ({ user, isAuthenticated, authenticating }) => {
  document.body.classList.remove('admin');

  if (authenticating) return <Preloader type="user" />;
  if (!authenticating && isAuthenticated && user.role === 'caterer') return <Dashboard user={user} />;

  return (
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
};

Welcome.propTypes = {
  ...userPropTypes,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Welcome;

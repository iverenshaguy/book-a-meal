import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'src/features/common/components/Header';
import Footer from 'src/features/common/components/Footer';
import Dashboard from 'src/features/dashboard';
import Menu from 'src/features/menu';
import Preloader from 'src/features/common/components/Preloader';
import { userPropTypes } from 'src/features/common/utils/proptypes';
import './Welcome.scss';

const message = "I'M HUNGRY";

export const Welcome = ({ user, isAuthenticated, authenticating }) => {
  document.body.classList.remove('admin');

  if (authenticating) return <Preloader type="user" />;
  if (!authenticating && isAuthenticated && user.role === 'caterer') return <Dashboard user={user} />;
  if (!authenticating && isAuthenticated && user.role === 'customer') return <Menu user={user} />;

  return (
    <Fragment>
      <Header type="home" />
      <div className="main-wrapper home">
        <div className="landing">
          <h1>Delicious Meals At Your Fingertips</h1>
          <Link to="/signin">
            <button type="button" className="btn btn-pri">
              {message}
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Welcome.propTypes = {
  ...userPropTypes,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticating: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Welcome);

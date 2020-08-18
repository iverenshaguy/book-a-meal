import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import './NotFound.scss';

/**
 * @exports
 * @function NotFound
 * @returns {JSX} NotFound
 */
const NotFound = () => (
  <div className="not-found">
    <Header type="unauth" />
    <div className="content">
      <div className="smiley">
        <div className="eyes">
          <span>.</span>
          <span>.</span>
        </div>
        <div className="sad" />
      </div>
      <p>
        You Lost Your Way!
        &nbsp;
        <Link to="/">Go Back Home</Link>
      </p>
    </div>
    <Footer />
  </div>
);

export default NotFound;

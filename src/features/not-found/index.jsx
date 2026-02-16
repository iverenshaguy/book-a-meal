import React from 'react';
import { Link } from 'react-router-dom';
import Header from 'src/features/common/components/Header';
import Footer from 'src/features/common/components/Footer';
import './NotFound.scss';

/**
 * @exports
 * @function NotFound
 * @returns {React.ReactComponentElement} NotFound
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
        You Lost Your Way! &nbsp;
        <Link to="/">Go Back Home</Link>
      </p>
    </div>
    <Footer />
  </div>
);

export default NotFound;

import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * @exports
 * @function CatererHeader
 * @param {object} props
 * @returns {JSX} CatererHeader
 */
const CatererHeader = ({ date, showTime }) => (
  <Fragment>
    <div className="menu-control d-none-md">
      <a href="#sidenav" className="d-none-md">
        <img src="./img/toggler.png" alt="toggler" />
      </a>
    </div>
    <div className="page-title d-flex-md">
      <div className="date">
        <h2>{date}&nbsp; &nbsp; {showTime && moment().format('HH:mm')}</h2>
      </div>
    </div>
  </Fragment>
);

CatererHeader.propTypes = {
  date: PropTypes.string,
  showTime: PropTypes.bool
};

CatererHeader.defaultProps = {
  date: moment().format('dddd[,] Do MMMM YYYY'),
  showTime: true
};

export default CatererHeader;

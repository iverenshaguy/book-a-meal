import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * @exports
 * @function CatererHeader
 * @param {object} props
 * @returns {JSX} CatererHeader
 */
const CatererHeader = ({ currentDay, showTime, dateType }) => {
  const date = dateType === 'menu' ? moment(currentDay).format('dddd[,] Do MMMM YYYY') : moment().format('dddd[,] Do MMMM YYYY');

  return (
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
};

CatererHeader.propTypes = {
  currentDay: PropTypes.string.isRequired,
  showTime: PropTypes.bool,
  dateType: PropTypes.string
};

CatererHeader.defaultProps = {
  showTime: true,
  dateType: null
};

export default CatererHeader;

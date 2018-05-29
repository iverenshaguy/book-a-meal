import React, { Fragment } from 'react';
import moment from 'moment';

/**
 * @exports
 * @function CatererHeader
 * @param {object} props
 * @returns {JSX} CatererHeader
 */
const CatererHeader = () => (
  <Fragment>
    <div className="menu-control d-none-md">
      <a href="#sidenav" className="d-none-md">
        <img src="./img/toggler.png" alt="toggler" />
      </a>
    </div>
    <div className="page-title d-flex-md">
      <div className="date">
        <h2>{moment().format('dddd[,] Do MMMM YYYY')}&nbsp; &nbsp; {moment().format('HH:mm')}</h2>
      </div>
    </div>
  </Fragment>
);

export default CatererHeader;

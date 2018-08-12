import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import LinkBtn from '../../Link';
import DatePicker from '../../DatePicker';

/**
 * @exports
 * @function CatererHeader
 * @param {object} props
 * @returns {JSX} CatererHeader
 */
const CatererHeader = ({
  currentDay, showTime, dateType, toggleSideNav, updateCurrentDate
}) => {
  const date = dateType === 'menu' ? moment(currentDay).format('dddd[,] Do MMMM YYYY') : moment().format('dddd[,] Do MMMM YYYY');

  return (
    <Fragment>
      <div className="menu-control d-none-md">
        <LinkBtn className="d-none-md" clickHandler={toggleSideNav}>
          <img src="/img/toggler.png" alt="toggler" />
        </LinkBtn>
      </div>
      <div className="page-title d-none-md">
        <h3>
          <Link href="/" to="/">BOOK-A-MEAL</Link>
        </h3>
      </div>
      <div className="page-title d-flex-md">
        <div className="date">
          <h2>
            {date}
            {showTime && <span>&nbsp; &nbsp;{moment().format('HH:mm')}</span>}
            {dateType === 'menu' && <span style={{ cursor: 'pointer' }}>&nbsp;&#9662;</span>}
          </h2>
          <DatePicker screenSize="md" handleSelectDate={updateCurrentDate} />
        </div>
      </div>
    </Fragment>
  );
};

CatererHeader.propTypes = {
  currentDay: PropTypes.string.isRequired,
  showTime: PropTypes.bool,
  dateType: PropTypes.string,
  toggleSideNav: PropTypes.func.isRequired,
  updateCurrentDate: PropTypes.func
};

CatererHeader.defaultProps = {
  showTime: true,
  dateType: null,
  updateCurrentDate: null
};

export default CatererHeader;

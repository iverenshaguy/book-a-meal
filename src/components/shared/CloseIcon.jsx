import React from 'react';
import PropTypes from 'prop-types';
import LinkBtn from './Link';

/**
 * @exports
 * @function CloseIcon
 * @param {object} props
 * @returns {JSX} CloseIcon
 */
const CloseIcon = ({ divClass, btnID, clickHandler }) => (
  <div className={`close ${divClass}`}>
    <LinkBtn aria-hidden="true" id={btnID} clickHandler={clickHandler}>&times;</LinkBtn>
  </div>
);

CloseIcon.propTypes = {
  divClass: PropTypes.string,
  btnID: PropTypes.string,
  clickHandler: PropTypes.func.isRequired
};

CloseIcon.defaultProps = {
  divClass: null,
  btnID: null
};


export default CloseIcon;

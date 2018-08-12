import React, { Fragment } from 'react';
import CatererMenu from '../../../containers/pages/Menu/CatererMenu';
import CustomerMenu from '../../../containers/pages/Menu/CustomerMenu';
import { userPropTypes } from '../../../helpers/proptypes';
import './Menu.scss';

/**
 * @exports
 * @function Menu
 * @param {object} props
 * @desc Creates Menu Component
 * @returns {JSX} Menu Component
 */
const Menu = (props) => {
  const { user } = props;
  return (
    <Fragment>
      {user.role === 'caterer' &&
        <CatererMenu {...props} />}
      {user.role === 'customer' &&
        <CustomerMenu {...props} />}
    </Fragment>
  );
};


Menu.propTypes = {
  ...userPropTypes
};

export default Menu;

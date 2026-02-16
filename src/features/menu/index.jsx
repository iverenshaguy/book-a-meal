import React, { Fragment } from 'react';
import CatererMenu from 'src/features/menu/caterer/CatererMenu';
import CustomerMenu from 'src/features/menu/customer/CustomerMenu';
import { userPropTypes } from 'src/features/common/utils/proptypes';
import 'src/features/menu/Menu.scss';

/**
 * @exports
 * @function Menu
 * @param {object} props
 * @desc Creates Menu Component
 * @returns {React.ComponentElement} Menu Component
 */
const Menu = (props) => {
  const { user } = props;

  return (
    <Fragment>
      {user.role === 'caterer' && <CatererMenu {...props} />}
      {user.role === 'customer' && <CustomerMenu {...props} />}
    </Fragment>
  );
};

Menu.propTypes = {
  ...userPropTypes,
};

export default Menu;

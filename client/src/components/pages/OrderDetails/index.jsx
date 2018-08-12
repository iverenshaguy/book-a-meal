import React, { Fragment } from 'react';
import CatererOrderDetails from '../../../containers/pages/OrderDetails/CatererOrderDetails';
import CustomerOrderDetails from '../../../containers/pages/OrderDetails/CustomerOrderDetails';
import { userPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function OrderDetails
 * @param {object} props
 * @desc Creates OrderDetails Component
 * @returns {JSX} OrderDetails Component
 */
const OrderDetails = (props) => {
  const { user } = props;
  return (
    <Fragment>
      {user.role === 'caterer' &&
        <CatererOrderDetails {...props} />}
      {user.role === 'customer' &&
        <CustomerOrderDetails {...props} />}
    </Fragment>
  );
};


OrderDetails.propTypes = {
  ...userPropTypes
};

export default OrderDetails;

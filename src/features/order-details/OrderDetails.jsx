import React, { Fragment } from 'react';
import CatererOrderDetails from 'src/features/order-details/caterer/CatererOrderDetails';
import CustomerOrderDetails from 'src/features/order-details/customer/CustomerOrderDetails';
import { userPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @exports
 * @function OrderDetails
 * @param {object} props
 * @desc Creates OrderDetails Component
 * @returns {React.ComponentClass} OrderDetails Component
 */
const OrderDetails = (props) => {
  const { user } = props;
  return (
    <Fragment>
      {user.role === 'caterer' && <CatererOrderDetails {...props} />}
      {user.role === 'customer' && <CustomerOrderDetails {...props} />}
    </Fragment>
  );
};

OrderDetails.propTypes = {
  ...userPropTypes,
};

export default OrderDetails;

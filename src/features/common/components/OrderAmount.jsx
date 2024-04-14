import React from 'react';
import PropTypes from 'prop-types';
import { orderMealPropTypes } from 'src/features/common/utils/proptypes';
import calculateCashEarnedFromOrder from 'src/features/common/utils/calculateCashEarnedFromOrder';

/**
 * @exports
 * @function OrderAmount
 * @param {string} type
 * @param {array} meals
 * @returns {React.ComponentClass} OrderAmount
 */
const OrderAmount = ({ type, meals }) => (
  <div className={`order-amount ${type === 'admin' && 'admin-order-total'}`}>
    <div>
      <p>Total</p>
      <h2>₦{calculateCashEarnedFromOrder(meals)}</h2>
    </div>
  </div>
);

OrderAmount.propTypes = {
  type: PropTypes.string,
  meals: PropTypes.arrayOf(orderMealPropTypes).isRequired,
};

OrderAmount.defaultProps = {
  type: 'user',
};

export default OrderAmount;

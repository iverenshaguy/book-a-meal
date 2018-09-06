import React from 'react';
import PropTypes from 'prop-types';
import { orderMealPropTypes } from '../../helpers/proptypes';
import calculateCashEarnedFromOrder from '../../helpers/calculateCashEarnedFromOrder';

/**
 * @exports
 * @function OrderAmount
 * @param {string} type
 * @param {array} meals
 * @returns {JSX} OrderAmount
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
  meals: PropTypes.arrayOf(orderMealPropTypes).isRequired
};

OrderAmount.defaultProps = {
  type: 'user'
};

export default OrderAmount;

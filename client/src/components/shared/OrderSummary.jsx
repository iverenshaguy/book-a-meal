import React from 'react';
import PropTypes from 'prop-types';
import { orderMealPropTypes } from '../../helpers/proptypes';
/**
 * @exports
 * @function OrderSummary
 * @param {array} meals
 * @param {string} status
 * @returns {JSX} OrderSummary
 */
const OrderSummary = ({ meals, status }) => (
  <div className="order-summary">
    {meals.map(meal => (
      <div key={meal.id}>
        <p>{meal.quantity}x</p>
        <p style={{ wordWrap: 'break-word', paddingLeft: '5px', paddingRight: '5px' }}>{meal.title}</p>
        <p>&#8358;{meal.quantity * meal.price}</p>
        {Object.keys(meal).includes('caterer') && status !== 'canceled' &&
          <p style={{ marginLeft: '30px' }} className={meal.delivered ? 'success' : 'warning'}>{meal.delivered ? 'Delivered' : 'Pending'}</p>}
      </div>
  ))}
  </div>
);

OrderSummary.propTypes = {
  meals: PropTypes.arrayOf(orderMealPropTypes).isRequired,
  status: PropTypes.string
};

OrderSummary.defaultProps = {
  status: 'pending'
};

export default OrderSummary;

import React from 'react';
import moment from 'moment';
import className from 'classnames';
import { Link } from 'react-router-dom';
import { calculateCashEarnedFromOrder } from '../../../helpers';
import { userPropTypes, catererOrderObjPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function OrderPill
 * @returns {JSX} OrderPill
 */
const OrderPill = ({ order, user }) => {
  const statusClass = className({
    danger: order.status === 'canceled',
    warning: order.status === 'pending' || order.status === 'started',
    success: order.status === 'delivered',
  });

  const status = order.status === 'started' ? 'Pending' : order.status;

  return (
    <div className="order-history-pill admin-order-history-pill">
      <Link to={`/orders/${order.id}`}>
        <div className="order-history-header">
          <h3>{`#${order.id}`}</h3>
          <h3>&nbsp;&nbsp;{moment(order.createdAt).format('DD/MM/YY hh:mm')}</h3>
        </div>
        <hr />
        <div>
          {user.role === 'caterer' &&
            <p>{`${order.customer.firstname} ${order.customer.lastname}`}&nbsp; - &nbsp;{`${order.deliveryAddress}`}&nbsp; - &nbsp;{`${order.deliveryPhoneNo}`}</p>}
          {user.role === 'customer' &&
            <p key={order.meals[0].id}>
              {`${order.meals[0].quantity}x ${order.meals[0].title}`}{order.meals.length > 1 ? '...' : null}
            </p>}
        </div>
        <div className="order-history-footer">
          <h4 style={{ textTransform: 'capitalize' }}>Status:
            <span style={{ textTransform: 'capitalize' }} className={statusClass}> {status}</span>
          </h4>
          <h2>&#8358;{calculateCashEarnedFromOrder(order.meals)}</h2>
        </div>
      </Link>
    </div>
  );
};

OrderPill.propTypes = {
  ...userPropTypes,
  order: catererOrderObjPropTypes
};

OrderPill.defaultProps = {
  order: {}
};

export default OrderPill;

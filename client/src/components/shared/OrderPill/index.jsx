import React from 'react';
import moment from 'moment';
import className from 'classnames';
import { Link } from 'react-router-dom';
import { calculateCashEarnedFromOrder } from '../../../helpers';
import { catererOrderObjPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function OrderPill
 * @returns {JSX} OrderPill
 */
const OrderPill = ({ order }) => {
  const statusClass = className({
    danger: order.status === 'canceled',
    warning: order.status === 'pending',
    success: order.status === 'delivered',
  });

  return (
    <div className="order-history-pill admin-order-history-pill">
      <Link href={`/orders/${order.id}`} to={`/orders/${order.id}`}>
        <div className="order-history-header">
          <h3>{`#${order.id}`}</h3>
          <h3>&nbsp;&nbsp;{moment(order.createdAt).format('YY/MM/DD hh:mm')}</h3>
        </div>
        <hr />
        <div>
          <p>{`${order.customer.firstname} ${order.customer.lastname}`}&nbsp; - &nbsp;{`${order.deliveryAddress}`}&nbsp; - &nbsp;{`${order.deliveryPhoneNo}`}</p>
        </div>
        <div className="order-history-footer">
          <h4>Status:
            <span style={{ textTransform: 'capitalize' }} className={statusClass}> {order.status}</span>
          </h4>
          <h2>&#8358;{calculateCashEarnedFromOrder(order.meals)}</h2>
        </div>
      </Link>
    </div>
  );
};

OrderPill.propTypes = {
  order: catererOrderObjPropTypes.isRequired
};

export default OrderPill;

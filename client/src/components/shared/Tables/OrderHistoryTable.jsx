import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import LinkBtn from '../Link';
import { calculateCashEarnedFromOrder } from '../../../helpers';
import { catererOrderObjPropTypes } from '../../../helpers/proptypes';
import './Table.scss';

/**
 * @exports
 * @function OrderHistoryTable
 * @returns {JSX} OrderHistoryTable
 */
const OrderHistoryTable = ({ orders, deliverOrder }) => (
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Meal Item(s)</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.meals.map(meal => <p key={meal.id}>-{meal.title}</p>)}</td>
            <td>{`${item.customer.firstname} ${item.customer.lastname}`}</td>
            <td>&#8358;{calculateCashEarnedFromOrder(item.meals)}</td>
            <td>{moment(item.updatedAt).format('dddd[,] Do MMMM YYYY hh.mm ss')}</td>
            <td>
              <span>
                {item.status === 'canceled' && <p className="danger">Canceled</p>}
                {item.meals[0].delivered && <p className="success">Delivered</p>}
                {!item.meals[0].delivered && item.status !== 'canceled' &&
                  <Fragment>
                    <LinkBtn className="warning" clickHandler={() => deliverOrder(item.id)}>Deliver</LinkBtn>
                  </Fragment>}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

OrderHistoryTable.propTypes = {
  orders: PropTypes.arrayOf(catererOrderObjPropTypes).isRequired,
  deliverOrder: PropTypes.func.isRequired
};

export default OrderHistoryTable;

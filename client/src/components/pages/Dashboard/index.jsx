import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import View from '../../../containers/shared/View';
import { OrderHistoryTable } from '../../shared/Tables';
import { catererOrdersObjPropTypes } from '../../../helpers/proptypes';
import './Dashboard.scss';

/**
 * @exports
 * @class Dashboard
 * @extends Component
 * @classdesc Creates Dashboard Component
 * @returns {JSX} Dashboard Component
 */
class Dashboard extends Component {
  static propTypes = {
    ...catererOrdersObjPropTypes,
    fetchOrders: PropTypes.func.isRequired,
    deliverOrder: PropTypes.func.isRequired,
  }

  /**
   * @memberof Dashboard
   * @returns {JSX} Dashboard Component
   */
  componentDidMount() {
    const { fetchOrders } = this.props;
    const todaysDate = moment().format('YYYY-MM-DD');

    fetchOrders(todaysDate);
  }

  /**
   * @memberof Dashboard
   * @returns {JSX} Board Component
   */
  renderDashBoard = () => {
    const {
      orders, pendingOrders, totalCashEarned, deliverOrder
    } = this.props;

    return (
      <Fragment>
        <div className="date d-none-md">
          <h2>
            {moment().format('dddd[,] Do MMMM YYYY')}
&nbsp; &nbsp;
            {moment().format('HH:mm')}
          </h2>
        </div>
        <div className="card-group summary">
          <div className="card total-sum">
            <div className="count">{orders.length}</div>
            <div>{'Today\'s Orders'}</div>
          </div>
          <div className="card pending">
            <div className="count">{pendingOrders}</div>
            <div>Pending Orders</div>
          </div>
          <div className="card total-cash">
            <div className="count">
&#8358;
              {totalCashEarned}
            </div>
            <div>{'Today\'s Revenue'}</div>
          </div>
        </div>
        <div className="order-details">
          <OrderHistoryTable
            orders={orders}
            deliverOrder={deliverOrder}
          />
        </div>
      </Fragment>
    );
  }


  /**
   * @memberof Dashboard
   * @returns {JSX} Dashboard Component
   */
  render() {
    return (
      <View type="dashboard" showTime>
        {this.renderDashBoard()}
      </View>
    );
  }
}

export default Dashboard;

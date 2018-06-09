import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import CatererView from '../../shared/CatererView';
import { OrderHistoryTable } from '../../shared/Tables';
import { userPropTypes, catererOrdersObjPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @class Dashboard
 * @extends Component
 * @classdesc Creates Dashboard Component
 * @returns {JSX} Dashboard Component
 */
class Dashboard extends Component {
  static propTypes = {
    ...userPropTypes,
    ...catererOrdersObjPropTypes,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    deliverOrder: PropTypes.func.isRequired,
  }

  /**
   * @memberof Dashboard
   * @returns {JSX} Dashboard Component
   */
  componentDidMount() {
    const todaysDate = moment().format('YYYY-MM-DD');
    this.props.fetchOrders('caterer', todaysDate);
  }

  /**
   * @memberof Dashboard
   * @returns {JSX} Board Component
   */
  renderDashBoard = () => (
    <Fragment>
      <div className="date d-none-md">
        <h2>{moment().format('dddd[,] Do MMMM YYYY')}&nbsp; &nbsp; {moment().format('HH:mm')}</h2>
      </div>
      <div className="card-group summary">
        <div className="card total-sum">
          <div className="count">{this.props.orders.length}</div>
          <div>{'Today\'s Orders'}</div>
        </div>
        <div className="card pending">
          <div className="count">{this.props.pendingOrders}</div>
          <div>Pending Orders</div>
        </div>
        <div className="card total-cash">
          <div className="count">&#8358; {this.props.totalCashEarned}</div>
          <div>{'Today\'s Revenue'}</div>
        </div>
      </div>
      <div className="order-details">
        <OrderHistoryTable
          orders={this.props.orders}
          deliverOrder={this.props.deliverOrder}
        />
      </div>
    </Fragment>
  )


  /**
   * @memberof Dashboard
   * @returns {JSX} Dashboard Component
   */
  render() {
    const { user, logout, isFetching } = this.props;

    return (
      <CatererView user={user} logout={logout} type="dashboard" isFetching={isFetching}>
        {this.renderDashBoard()}
      </CatererView>
    );
  }
}

export default Dashboard;

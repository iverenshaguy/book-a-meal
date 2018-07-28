import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { userPropTypes, catererOrderObjPropTypes } from '../../../../helpers/proptypes';
import View from '../../../shared/View';
import OrderSummary from '../../../shared/OrderSummary';
import OrderAmount from '../../../shared/OrderAmount';
import updateLocalStorageOrder from '../../../../helpers/updateLocalStorageOrder';

/**
 * @exports
 * @class CustomerOrderDetails
 * @extends Component
 * @classdesc Creates CustomerOrderDetails Component
 * @returns {JSX} CustomerOrderDetails Component
 */
class CustomerOrderDetails extends Component {
  static propTypes = {
    ...userPropTypes,
    order: catererOrderObjPropTypes,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    editOrder: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func.isRequired,
  }

  static defaultProps = {
    order: null
  }

  /**
   * @memberof CustomerOrderDetails
   * @returns {func} fetchOrders
  */
  componentDidMount() {
    this.fetchOrders();
  }

  /**
   * @memberof CustomerOrderDetails
   * @returns {func} fetchOrders
  */
  fetchOrders = () => {
    this.props.fetchOrders();
  }

  /**
   * @memberof CustomerOrderDetails
   * @param {object} e
   * @returns {func} push
  */
  editOrder = (e) => {
    e.preventDefault();

    const { user, order } = this.props;
    const { id, meals } = order;
    const { deliveryAddress, deliveryPhoneNo } = order;

    updateLocalStorageOrder(
      user.id,
      {
        id, meals, deliveryAddress, deliveryPhoneNo
      }
    );

    this.props.push('/');
  }

  /**
   * @memberof CustomerOrderDetails
   * @param {object} e
   * @returns {func} editOrder
  */
 cancelOrder = (e) => {
   e.preventDefault();

   this.props.cancelOrder(this.props.order.id);
 }

  /**
   * @memberof CustomerOrderDetails
   * @param {object} order
   * @returns {JSX} CustomerOrderDetails Component
   */
  renderCustomerDetails = (order) => {
    const status = order.status === 'started' ? 'pending' : order.status;

    const statusClass = classNames({
      'order-status': true,
      warning: status === 'pending',
      success: status === 'delivered',
      danger: status === 'canceled'
    });

    return (
      <div className="customer-details">
        <p>Order Status:
          <span className={statusClass} style={{ textTransform: 'capitalize' }}> {status}</span>
        </p>
        <p>Address Provided: {order.deliveryAddress}</p>
        <p>Number Provided: {order.deliveryPhoneNo}</p>
      </div>
    );
  }

  /**
   * @memberof CustomerOrderDetails
   * @returns {JSX} CustomerOrderDetails Component
  */
  renderControlBtns = () => (
    <Fragment>
      <br />
      <div className="d-flex-row control-btns">
        <a onClick={this.editOrder} href="/">
          <button className="btn btn-sec order-details-btn">Edit</button>
        </a>
        <a onClick={this.cancelOrder} href="./user-menu.html">
          <button className="btn btn-sec-danger order-details-btn">Cancel</button>
        </a>
      </div>
    </Fragment>
  )

  /**
   * @memberof CustomerOrderDetails
   * @returns {JSX} CustomerOrderDetails Component
  */
  renderDetails = () => {
    const { order } = this.props;

    return (
      <Fragment>
        <OrderSummary meals={order.meals} status={order.status} />
        <OrderAmount meals={order.meals} />
        {this.renderCustomerDetails(order)}
        {order.status === 'started' && this.renderControlBtns()}
      </Fragment>
    );
  }

  /**
   * @memberof CustomerOrderDetails
   * @returns {JSX} CustomerOrderDetails Component
    */
  renderCustomerOrderDetails = () => {
    const { order } = this.props;

    return (
      <Fragment>
        <div className="order-confirmation order-details">
          <h2 className="text-center">Order #{order.id}</h2>
          <p className="order-date text-center">{moment().format('YY/MM/DD h:mm a')}</p>
          <hr />
          {this.renderDetails()}
        </div>
      </Fragment>
    );
  }

  /**
   * @memberof CustomerOrderDetails
   * @returns {JSX} CustomerOrderDetails Component
  */
  render() {
    const { user, logout, isFetching } = this.props;

    return (
      <View user={user} logout={logout} type="customerOrderDetails" isFetching={isFetching}>
        <Fragment>
          <Link href="/orders" to="/orders" className="orders-back-link">&#8592; Back To Orders</Link>
          {!this.props.order && <p className="text-center">This Order Does Not Exist</p>}
          {this.props.order && this.renderCustomerOrderDetails()}
        </Fragment>
      </View>
    );
  }
}

export default CustomerOrderDetails;

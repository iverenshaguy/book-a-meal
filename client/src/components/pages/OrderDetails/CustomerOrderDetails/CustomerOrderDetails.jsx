import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { userPropTypes, catererOrderObjPropTypes } from '../../../../helpers/proptypes';
import View from '../../../shared/View';
import OrderSummary from '../../../shared/OrderSummary';
import OrderAmount from '../../../shared/OrderAmount';

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
    fetchOrders: PropTypes.func.isRequired,
  }

  static defaultProps = {
    order: null
  }

  /**
   * @memberof CustomerOrderDetails
   * @returns {JSX} CustomerOrderDetails Component
  */
  componentDidMount() {
    this.fetchOrders();
  }

  /**
   * @memberof CustomerOrderDetails
   * @returns {JSX} CustomerOrderDetails Component
  */
  fetchOrders = () => {
    this.props.fetchOrders();
  }

  /**
   * @memberof CustomerOrderDetails
   * @param {object} order
   * @param {func} deliverOrder
   * @returns {JSX} CustomerOrderDetails Component
   */
  renderCustomerDetails = (order) => {
    const status = order.status === 'started' ? 'pending' : order.status;

    const statusClass = classNames({
      warning: status === 'pending',
      success: status === 'delivered',
      danger: status === 'canceled'
    });

    return (
      <div className="customer-details">
        <p>Status:
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
        <a href="./order-confirmation.html">
          <button className="btn btn-sec order-details-btn">Edit</button>
        </a>
        <a href="./user-menu.html">
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
        <OrderSummary meals={order.meals} />
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
          <h2 className="text-center" style={{ paddingTop: '1em' }}>Order #{order.id}</h2>
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
          {!this.props.order && <p className="text-center">This Order Does Not Exist</p>}
          {this.props.order && this.renderCustomerOrderDetails()}
        </Fragment>
      </View>
    );
  }
}

export default CustomerOrderDetails;

import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { editOrder, cancelOrder } from 'src/features/orders/data/actions';
import { fetchOrder } from 'src/features/order-details/data/actions';

import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { userPropTypes, catererOrderObjPropTypes } from 'src/features/common/utils/proptypes';
import View from 'src/features/common/components/View';
import OrderSummary from 'src/features/common/components/OrderSummary';
import OrderAmount from 'src/features/common/components/OrderAmount';
import updateLocalStorageOrder from 'src/features/common/utils/updateLocalStorageOrder';

/**
 * @exports
 * @class CustomerOrderDetails
 * @extends Component
 * @classdesc Creates CustomerOrderDetails Component
 * @returns {React.ComponentClass} CustomerOrderDetails Component
 */
export class CustomerOrderDetails extends Component {
  static propTypes = {
    ...userPropTypes,
    order: catererOrderObjPropTypes,
    push: PropTypes.func.isRequired,
    fetchOrder: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func.isRequired,
  };

  static defaultProps = {
    order: null,
  };

  /**
   * @memberof CustomerOrderDetails
   * @returns {func} fetchOrders
   */
  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id);
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

    updateLocalStorageOrder(user.id, {
      id,
      meals,
      deliveryAddress,
      deliveryPhoneNo,
    });

    this.props.push('/');
  };

  /**
   * @memberof CustomerOrderDetails
   * @param {object} e
   * @returns {func} editOrder
   */
  cancelOrder = (e) => {
    e.preventDefault();

    this.props.cancelOrder(this.props.order.id);
  };

  /**
   * @memberof CustomerOrderDetails
   * @param {object} order
   * @returns {React.ComponentClass} CustomerOrderDetails Component
   */
  renderCustomerDetails = (order) => {
    const status = order.status === 'started' ? 'pending' : order.status;

    const statusClass = classNames({
      'order-status': true,
      warning: status === 'pending',
      success: status === 'delivered',
      danger: status === 'canceled',
    });

    return (
      <div className="customer-details">
        <p>
          Order Status:
          <span className={statusClass} style={{ textTransform: 'capitalize' }}>
            {' '}
            {status}
          </span>
        </p>
        <p>
          Address Provided:
          {order.deliveryAddress}
        </p>
        <p>
          Number Provided:
          {order.deliveryPhoneNo}
        </p>
      </div>
    );
  };

  /**
   * @memberof CustomerOrderDetails
   * @returns {React.ComponentClass} CustomerOrderDetails Component
   */
  renderControlBtns = () => (
    <Fragment>
      <br />
      <div className="d-flex-row control-btns">
        <a onClick={this.editOrder} href="/">
          <button type="button" className="btn btn-sec order-details-btn">
            Update Basket
          </button>
        </a>
        <a onClick={this.cancelOrder} href="./user-menu.html">
          <button type="button" className="btn btn-sec-danger order-details-btn">
            Cancel Order
          </button>
        </a>
      </div>
    </Fragment>
  );

  /**
   * @memberof CustomerOrderDetails
   * @returns {React.ComponentClass} CustomerOrderDetails Component
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
  };

  /**
   * @memberof CustomerOrderDetails
   * @returns {React.ComponentClass} CustomerOrderDetails Component
   */
  renderCustomerOrderDetails = () => {
    const { order } = this.props;

    return (
      <Fragment>
        <div className="order-confirmation order-details">
          <h3 className="text-center">Order #{order.id}</h3>
          <p className="order-date text-center">{moment().format('dddd[,] Do MMMM YYYY h:mm a')}</p>
          <hr />
          {this.renderDetails()}
        </div>
      </Fragment>
    );
  };

  /**
   * @memberof CustomerOrderDetails
   * @returns {React.ComponentClass} CustomerOrderDetails Component
   */
  render() {
    return (
      <View type="customerOrderDetails">
        <Fragment>
          <Link to="/orders" className="orders-back-link">
            &#8592; Back To Orders
          </Link>
          {!this.props.order && <p className="text-center info">This Order Does Not Exist</p>}
          {this.props.order && this.renderCustomerOrderDetails()}
        </Fragment>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.singleOrder.item,
});

export default connect(mapStateToProps, {
  fetchOrder,
  push,
  editOrder,
  cancelOrder,
})(CustomerOrderDetails);

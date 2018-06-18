import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import LinkBtn from '../../../shared/Link';
import MiniPreloader from '../../../shared/Preloader/MiniPreloader';
import CatererView from '../../../shared/CatererView';
import { calculateCashEarnedFromOrder } from '../../../../helpers';
import { userPropTypes, catererOrderObjPropTypes } from '../../../../helpers/proptypes';

/**
 * @exports
 * @class CatererOrderDetails
 * @extends Component
 * @classdesc Creates CatererOrderDetails Component
 * @returns {JSX} CatererOrderDetails Component
 */
class CatererOrderDetails extends Component {
  static propTypes = {
    ...userPropTypes,
    order: catererOrderObjPropTypes,
    isFetching: PropTypes.bool.isRequired,
    delivering: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    deliverOrder: PropTypes.func.isRequired,
  }

  static defaultProps = {
    order: null
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
  */
  componentDidMount() {
    this.fetchOrders();
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
  */
  fetchOrders = () => {
    this.props.fetchOrders();
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
  */
  deliverOrder = () => {
    this.props.deliverOrder(this.props.order.id);
  }

  /**
   * @memberof CatererOrderDetails
   * @param {object} order
   * @returns {JSX} CatererOrderDetails Component
   */
  renderOrderSummary = order => (
    <div className="order-summary">
      {order.meals.map(meal => (
        <div key={meal.id}>
          <p>{meal.quantity}x</p>
          <p>{meal.title}</p>
          <p>₦{meal.price}</p>
        </div>
      ))}
    </div>
  )

  /**
   * @memberof CatererOrderDetails
   * @param {object} order
   * @returns {JSX} CatererOrderDetails Component
   */
  renderOrderAmount = order => (
    <div className="order-amount admin-order-total">
      <div>
        <p>Total</p>
        <h2>₦{calculateCashEarnedFromOrder(order.meals)}</h2>
      </div>
    </div>
  )

  /**
   * @memberof CatererOrderDetails
   * @param {object} order
   * @param {func} deliverOrder
   * @returns {JSX} CatererOrderDetails Component
   */
  renderOrderMisc = order => (
    <div className="order-misc">
      <p className="order-date">Order Date: {moment(order.createdAt).format('YY/MM/DD hh:mm')}</p>
      <p>
        Status:&nbsp;
        {order.status === 'canceled' && <span className="danger">Canceled</span>}
        {order.meals[0].delivered && <span className="success">Delivered</span>}
        {!order.meals[0].delivered && order.status !== 'canceled' &&
          <Fragment>
            <LinkBtn className="warning" clickHandler={this.deliverOrder}>Deliver</LinkBtn>
          </Fragment>}
      </p>
      <p>Customer: {`${order.customer.firstname} ${order.customer.lastname}`}</p>
      <p>Address Provided: {order.deliveryAddress}</p>
      <p>Number Provided: {order.deliveryPhoneNo}</p>
    </div>
  )

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
   */
  renderDetails = () => {
    const { order } = this.props;

    return (
      <Fragment>
        {this.renderOrderMisc(order)}
        {this.renderOrderSummary(order)}
        {this.renderOrderAmount(order)}
      </Fragment>
    );
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
   */
  renderCatererOrderDetails = () => {
    const { order } = this.props;

    return (
      <div className="main-wrapper">
        <div className="order-confirmation order-details">
          <h3 className="text-center" style={{ paddingTop: '1em' }}>Order #{order.id}</h3>
          {!this.props.delivering && this.renderDetails()}
          {this.props.delivering && <div className="text-center"><MiniPreloader /></div>}
        </div>
      </div>
    );
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
  */
  render() {
    const { user, logout, isFetching } = this.props;

    return (
      <Fragment>
        <CatererView user={user} logout={logout} type="orders" showTime isFetching={isFetching}>
          <Fragment>
            {!isFetching && !this.props.order && <p className="text-center">This Order Does Not Exist</p>}
            {!isFetching && this.props.order && this.renderCatererOrderDetails()}
          </Fragment>
        </CatererView>
      </Fragment>
    );
  }
}

export default CatererOrderDetails;

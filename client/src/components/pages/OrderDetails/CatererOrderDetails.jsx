import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import LinkBtn from '../../shared/Link';
import MiniPreloader from '../../shared/Preloader/MiniPreloader';
import View from '../../shared/View';
import { userPropTypes, catererOrderObjPropTypes } from '../../../helpers/proptypes';
import OrderSummary from '../../shared/OrderSummary';
import OrderAmount from '../../shared/OrderAmount';

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
    fetchOrder: PropTypes.func.isRequired,
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
    this.props.fetchOrder(this.props.match.params.id);
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
        <OrderSummary meals={order.meals} status={order.status} />
        <OrderAmount meals={order.meals} type="admin" />
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
        <Link href="/orders" to="/orders" className="orders-back-link">&#8592; Back To Orders</Link>
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
      <View user={user} logout={logout} type="orders" showTime isFetching={isFetching}>
        <Fragment>
          {!this.props.order && <p className="text-center info">This Order Does Not Exist</p>}
          {this.props.order && this.renderCatererOrderDetails()}
        </Fragment>
      </View>
    );
  }
}

export default CatererOrderDetails;

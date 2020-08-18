import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import LinkBtn from '../../shared/Link';
import MiniPreloader from '../../shared/Preloader/MiniPreloader';
import View from '../../../containers/shared/View';
import { catererOrderObjPropTypes, urlMatchPropTypes } from '../../../helpers/proptypes';
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
    ...urlMatchPropTypes,
    order: catererOrderObjPropTypes,
    delivering: PropTypes.bool.isRequired,
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
  renderOrderMisc = () => {
    const { order } = this.props;

    return (
      <div className="order-misc">
        <p className="order-date text-center">{moment(order.createdAt).format('dddd[,] Do MMMM YYYY h:mm a')}</p>
        <p>
          Status:&nbsp;
          {order.status === 'canceled' && <span className="danger">Canceled</span>}
          {order.meals[0].delivered && <span className="success">Delivered</span>}
          {!order.meals[0].delivered && order.status !== 'canceled'
          && (
          <Fragment>
            <LinkBtn className="warning" clickHandler={this.deliverOrder}>Deliver</LinkBtn>
          </Fragment>
          )}
        </p>
        <p>
          Customer:
          &nbsp;
          {`${order.customer.firstname} ${order.customer.lastname}`}
        </p>
        <p>
          Address Provided:
          &nbsp;
          {order.deliveryAddress}
        </p>
        <p>
          Number Provided:
          &nbsp;
          {order.deliveryPhoneNo}
        </p>
      </div>
    );
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
   */
  renderDetails = () => {
    const { order } = this.props;

    return (
      <Fragment>
        {this.renderOrderMisc()}
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
    const { order, delivering } = this.props;

    return (
      <div className="main-wrapper caterer">
        <Link to="/orders" className="orders-back-link">&#8592; Back To Orders</Link>
        <div className="order-confirmation order-details">
          <h3 className="text-center" style={{ paddingTop: '1em' }}>
            Order #
            {order.id}
          </h3>
          {!delivering && this.renderDetails()}
          {delivering && <div className="text-center"><MiniPreloader /></div>}
        </div>
      </div>
    );
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {JSX} CatererOrderDetails Component
  */
  render() {
    const { order } = this.props;

    return (
      <View type="orders" showTime>
        <Fragment>
          {!order && <p className="text-center info">This Order Does Not Exist</p>}
          {order && this.renderCatererOrderDetails()}
        </Fragment>
      </View>
    );
  }
}

export default CatererOrderDetails;

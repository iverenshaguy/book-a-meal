import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deliverOrder } from 'src/features/orders/data/actions';
import { fetchOrder } from 'src/features/order-details/data/actions';

import moment from 'moment';
import PropTypes from 'prop-types';
import LinkBtn from 'src/features/common/components/Link';
import MiniPreloader from 'src/features/common/components/Preloader/MiniPreloader';
import View from 'src/features/common/components/View';
import { catererOrderObjPropTypes, urlMatchPropTypes } from 'src/features/common/utils/proptypes';
import OrderSummary from 'src/features/common/components/OrderSummary';
import OrderAmount from 'src/features/common/components/OrderAmount';

/**
 * @exports
 * @class CatererOrderDetails
 * @extends Component
 * @classdesc Creates CatererOrderDetails Component
 * @returns {React.ComponentClass} CatererOrderDetails Component
 */
export class CatererOrderDetails extends Component {
  static propTypes = {
    ...urlMatchPropTypes,
    order: catererOrderObjPropTypes,
    delivering: PropTypes.bool.isRequired,
    fetchOrder: PropTypes.func.isRequired,
    deliverOrder: PropTypes.func.isRequired,
  };

  static defaultProps = {
    order: null,
  };

  /**
   * @memberof CatererOrderDetails
   * @returns {React.ComponentClass} CatererOrderDetails Component
   */
  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id);
  }

  /**
   * @memberof CatererOrderDetails
   * @returns {React.ComponentClass} CatererOrderDetails Component
   */
  deliverOrder = () => {
    this.props.deliverOrder(this.props.order.id);
  };

  /**
   * @memberof CatererOrderDetails
   * @param {object} order
   * @param {func} deliverOrder
   * @returns {React.ComponentClass} CatererOrderDetails Component
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
          {!order.meals[0].delivered && order.status !== 'canceled' && (
            <Fragment>
              <LinkBtn className="warning" clickHandler={this.deliverOrder}>
                Deliver
              </LinkBtn>
            </Fragment>
          )}
        </p>
        <p>
          Customer: &nbsp;
          {`${order.customer.firstname} ${order.customer.lastname}`}
        </p>
        <p>
          Address Provided: &nbsp;
          {order.deliveryAddress}
        </p>
        <p>
          Number Provided: &nbsp;
          {order.deliveryPhoneNo}
        </p>
      </div>
    );
  };

  /**
   * @memberof CatererOrderDetails
   * @returns {React.ComponentClass} CatererOrderDetails Component
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
  };

  /**
   * @memberof CatererOrderDetails
   * @returns {React.ComponentClass} CatererOrderDetails Component
   */
  renderCatererOrderDetails = () => {
    const { order, delivering } = this.props;

    return (
      <div className="main-wrapper caterer">
        <Link to="/orders" className="orders-back-link">
          &#8592; Back To Orders
        </Link>
        <div className="order-confirmation order-details">
          <h3 className="text-center" style={{ paddingTop: '1em' }}>
            Order #{order.id}
          </h3>
          {!delivering && this.renderDetails()}
          {delivering && (
            <div className="text-center">
              <MiniPreloader />
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * @memberof CatererOrderDetails
   * @returns {React.ComponentClass} CatererOrderDetails Component
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

const mapStateToProps = (state) => ({
  delivering: state.orders.delivering,
  order: state.singleOrder.item,
});

export default connect(mapStateToProps, { fetchOrder, deliverOrder })(CatererOrderDetails);

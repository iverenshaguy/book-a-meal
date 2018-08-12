import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OrderPill from '../../shared/OrderPill';
import View from '../../shared/View';
import { userPropTypes, metadataPropTypes, catererOrderObjPropTypes, customerOrderObjPropTypes } from '../../../helpers/proptypes';
import InfiniteLoader from '../../shared/InfiniteLoader';
import './Orders.scss';

/**
 * @exports
 * @class Orders
 * @extends Component
 * @classdesc Creates Orders Component
 * @returns {JSX} Orders Component
 */
class Orders extends Component {
  static propTypes = {
    ...userPropTypes,
    ...metadataPropTypes,
    orders: PropTypes.oneOfType([
      PropTypes.arrayOf(catererOrderObjPropTypes),
      PropTypes.arrayOf(customerOrderObjPropTypes)]).isRequired,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
  }

  /**
   * @memberof Orders
   * @returns {JSX} Orders Component
  */
  componentDidMount() {
    if (!this.props.metadata.pages) this.props.fetchOrders();
  }

  /**
   * @memberof Meals
   * @param {object} metadata
   * @returns {func} load more meals
  */
  loadMoreOrders = () => this.props.fetchOrders(null, this.props.metadata)

  /**
   * @memberof Orders
   * @returns {JSX} Orders Component
   */
  renderOrders = () => {
    const orders = this.props.orders.map(order =>
      <OrderPill key={order.id} order={order} user={this.props.user} />);

    return (
      <div className={`main-wrapper ${this.props.user.role === 'caterer' ? 'dashboard' : null}`}>
        <div className="order-history">
          <div className="page-heading">
            <h2>Order History</h2>
            <hr />
          </div>
          {this.props.orders.length === 0 && <p className="text-center">You Have No Orders</p>}
          {this.props.orders.length !== 0 &&
            <div className="pills">
              <InfiniteLoader
                items={orders}
                metadata={this.props.metadata}
                loadMore={this.loadMoreOrders}
              />
            </div>}
        </div>
      </div>
    );
  }


  /**
   * @memberof Orders
   * @returns {JSX} Orders Component
   */
  render() {
    const { user, logout, isFetching } = this.props;

    return (
      <Fragment>
        <View user={user} logout={logout} type="orders" showTime isFetching={isFetching}>
          {this.renderOrders()}
        </View>
      </Fragment>
    );
  }
}

export default Orders;

import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { fetchOrders, deliverOrder } from 'src/features/orders/data/actions';

import PropTypes from 'prop-types';
import OrderPill from 'src/features/common/components/OrderPill';
import View from 'src/features/common/components/View';
import {
  userPropTypes,
  metadataPropTypes,
  catererOrderObjPropTypes,
  customerOrderObjPropTypes,
} from 'src/features/common/utils/proptypes';
import InfiniteLoader from 'src/features/common/components/InfiniteLoader';
import 'src/features/orders/Orders.scss';

/**
 * @exports
 * @class Orders
 * @extends Component
 * @classdesc Creates Orders Component
 * @returns {React.ComponentClass} Orders Component
 */
export class Orders extends Component {
  static propTypes = {
    ...userPropTypes,
    ...metadataPropTypes,
    orders: PropTypes.oneOfType([
      PropTypes.arrayOf(catererOrderObjPropTypes),
      PropTypes.arrayOf(customerOrderObjPropTypes),
    ]).isRequired,
    fetchOrders: PropTypes.func.isRequired,
  };

  /**
   * @memberof Orders
   * @returns {React.ComponentClass} Orders Component
   */
  componentDidMount() {
    this.props.fetchOrders();
  }

  /**
   * @memberof Meals
   * @param {object} metadata
   * @returns {func} load more meals
   */
  loadMoreOrders = () => this.props.fetchOrders(null, this.props.metadata);

  /**
   * @memberof Orders
   * @returns {React.ComponentClass} Orders Component
   */
  renderOrders = () => {
    const orders = this.props.orders.map((order) => <OrderPill key={order.id} order={order} user={this.props.user} />);

    return (
      <div className={`main-wrapper ${this.props.user.role === 'caterer' ? 'dashboard' : ''} orders`}>
        <div className="order-history">
          <div className="page-heading">
            <h2>Order History</h2>
            <hr />
          </div>
          {this.props.orders.length === 0 && <p className="text-center info">You Have No Orders</p>}
          {this.props.orders.length !== 0 && (
            <div className="pills">
              <InfiniteLoader items={orders} metadata={this.props.metadata} loadMore={this.loadMoreOrders} />
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * @memberof Orders
   * @returns {React.ComponentClass} Orders Component
   */
  render() {
    return (
      <Fragment>
        <View type="orders" showTime>
          {this.renderOrders()}
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.items,
  metadata: state.orders.metadata,
});

export default connect(mapStateToProps, { fetchOrders, deliverOrder })(Orders);

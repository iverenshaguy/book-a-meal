import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OrderPill from '../../../shared/OrderPill';
import View from '../../../shared/View';
import { userPropTypes, catererOrderObjPropTypes } from '../../../../helpers/proptypes';
import './Orders.scss';

/**
 * @exports
 * @class CatererOrders
 * @extends Component
 * @classdesc Creates CatererOrders Component
 * @returns {JSX} CatererOrders Component
 */
class CatererOrders extends Component {
  static propTypes = {
    ...userPropTypes,
    orders: PropTypes.arrayOf(catererOrderObjPropTypes).isRequired,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
  }

  /**
   * @memberof CatererOrders
   * @returns {JSX} CatererOrders Component
  */
  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = () => {
    this.props.fetchOrders();
  }

  /**
   * @memberof CatererOrders
   * @returns {JSX} CatererOrders Component
   */
  renderCatererOrders = () => (
    <div className="main-wrapper dashboard">
      <div className="order-history">
        <div className="page-heading">
          <h2>Order History</h2>
          <hr />
        </div>
        {this.props.orders.length === 0 && <p className="text-center">You Have No Orders</p>}
        {this.props.orders.length !== 0 &&
          <div className="pills">
            {this.props.orders.map(order =>
              <OrderPill key={order.id} order={order} />)}
          </div>}
      </div>
    </div>
  )


  /**
   * @memberof CatererOrders
* @returns {JSX} CatererOrders Component
      */
  render() {
    const { user, logout, isFetching } = this.props;

    return (
      <Fragment>
        <View user={user} logout={logout} type="orders" showTime isFetching={isFetching}>
          {this.renderCatererOrders()}
        </View>
      </Fragment>
    );
  }
}

export default CatererOrders;

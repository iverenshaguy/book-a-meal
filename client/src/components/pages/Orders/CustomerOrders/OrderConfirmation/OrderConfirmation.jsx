import React, { Component } from 'react';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userPropTypes } from '../../../../../helpers/proptypes';
import getOrderFromLocalStorage from '../../../../../helpers/getOrderFromLocalStorage';
import View from '../../../../shared/View';
import OrderSummary from '../../../../shared/OrderSummary';
import OrderAmount from '../../../../shared/OrderAmount';

/**
 * @exports
 * @class OrderConfirmation
 * @extends Component
 * @classdesc Creates OrderConfirmation Component
 * @returns {JSX} OrderConfirmation Component
 */
class OrderConfirmation extends Component {
  static propTypes = {
    ...userPropTypes,
    logout: PropTypes.func.isRequired,
    addOrder: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  /**
   * @constructor
   * @memberof OrderConfirmation
   * @param {object} props
   * @returns {JSX} OrderConfirmation Component
   */
  constructor(props) {
    super();

    this.state = {
      order: getOrderFromLocalStorage(props.user)
    };
  }

  /**
   * @memberof OrderConfirmation
   * @returns {func} addOrder
  */
  handleSubmit = () => {
    const { order } = this.state;
    const { deliveryAddress, deliveryPhoneNo } = order;

    const newOrder = {
      deliveryAddress,
      deliveryPhoneNo,
      meals: [...order.meals.map(meal => ({ mealId: meal.id, quantity: meal.quantity }))]
    };

    localStorage.removeItem('bookamealorder');

    return order.id ? this.props.editOrder(order.id, newOrder) : this.props.addOrder(newOrder);
  }

  /**
   * @memberof OrderReview
   * @returns {JSX} Order Summary Component
  */
  renderCustomerDetails = () => (
    <div className="customer-details">
      <p>{moment().format('dddd, Do MMMM YYYY  h:mm a')}</p>
      <p>Customer: {this.props.user.firstname}&nbsp;{this.props.user.lastname}</p>
      <p>Phone Number: {this.state.order.deliveryPhoneNo}</p>
      <p>Address: {this.state.order.deliveryAddress}</p>
    </div>
  );

  /**
   * @memberof OrderConfirmation
   * @returns {JSX} OrderConfirmation Component
  */
  render() {
    const { user, logout, isFetching } = this.props;
    const msg = 'Please note that orders CANNOT be modified or canceled after 15 minutes of order placement.';

    if (this.state.order.meals.length === 0) return <Redirect to="/" />;

    return (
      <View user={user} logout={logout} type="orderConfirm" isFetching={isFetching}>
        <div className="order-confirmation">
          <div>
            <p className="text-center" style={{ marginTop: '30px', marginBottom: '0' }}>{msg}</p>
            <br />
            <h2>Please Confirm Your Order Details</h2>
            <hr />
            <OrderSummary meals={this.state.order.meals} />
            <OrderAmount meals={this.state.order.meals} />
            {this.renderCustomerDetails()}
            <br />
            <Link to="/" href="/"><button className="btn btn-sec btn-block">Edit Order</button></Link>
            <br /><br />
            <button className="btn btn-pri btn-block" id="checkout" onClick={this.handleSubmit}>Confirm Order</button>
          </div>
        </div>
      </View>
    );
  }
}

export default OrderConfirmation;

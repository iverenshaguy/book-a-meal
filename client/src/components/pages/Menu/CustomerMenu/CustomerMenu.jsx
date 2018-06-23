import React, { Component, Fragment } from 'react';
// import { Redirect } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import MealCard from '../../../shared/MealCard';
import Cart from '../../../shared/Cart';
import { userPropTypes, mealObjPropTypes } from '../../../../helpers/proptypes';
import CustomerView from '../../../shared/CustomerView';
import Notification from '../../../shared/Notification';
import checkShopOpen from '../../../../helpers/checkShopOpen';

/**
 * @exports
 * @class CustomerMenu
 * @extends Component
 * @classdesc Creates CustomerMenu Component
 * @returns {JSX} CustomerMenu Component
 */
class CustomerMenu extends Component {
  static propTypes = {
    ...userPropTypes,
    meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    fetchMenu: PropTypes.func.isRequired,
  }

  /**
   * @constructor
   * @memberof CustomerMenu
   * @param {object} props
   * @returns {JSX} CustomerMenu Component
   */
  constructor(props) {
    super();

    this.state = {
      order: this.getOrderFromLocalStorage(props.user)
    };
  }

  /**
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
   */
  componentDidMount() {
    this.fetchMenu();
  }

  /**
   * @memberof CustomerMenu
   * @param {string} itemId
   * @returns {nothing} nothing
   */
  getItemIndex = itemId => this.state.order.findIndex(item => item.id === itemId)

  /**
   * @memberof CustomerMenu
   * @param {object} user
   * @returns {array} orderItem
  */
  getOrderFromLocalStorage = (user) => {
    if (localStorage.getItem('bookamealorder')) {
      const storedObj = JSON.parse(localStorage.getItem('bookamealorder'));

      if (storedObj.userId === user.id && moment().format('YYYY-MM-DD') === storedObj.date) {
        return storedObj.order;
      }

      return [];
    }

    return [];
  }

  /**
   * @memberof CustomerMenu
   * @returns {nothing} nothing
  */
  updateLocalStorage = () => {
    const { order } = this.state;

    localStorage.setItem('bookamealorder', JSON.stringify({
      userId: this.props.user.id,
      order,
      date: moment().format('YYYY-MM-DD')
    }));
  }

  /**
   * @memberof CustomerMenu
   * @param {object} meal
   * @returns {func} addOrderItem|updateOrderItem
   */
  handleOrderMealClick = (meal) => {
    const itemIndex = this.getItemIndex(meal.id);

    if (itemIndex !== -1) {
      const newQuantity = this.state.order[itemIndex].quantity + 1;

      const orderItem = this.changeOrderQuantity(meal.id, newQuantity);

      return this.updateOrderItem(orderItem);
    }

    return this.addOrderItem(meal);
  }

  /**
   * @memberof CustomerMenu
   * @param {object} meal
   * @returns {nothing} nothing
   */
  addOrderItem = (meal) => {
    const item = {
      id: meal.id,
      title: meal.title,
      price: meal.price,
      quantity: 1
    };

    this.setState(prevState => ({
      order: [...prevState.order, item]
    }), this.updateLocalStorage);
  }

  /**
   * @memberof CustomerMenu
   * @param {string} itemId
   * @returns {nothing} nothing
   */
  removeOrderItem = (itemId) => {
    this.setState(prevState => ({
      order: prevState.order.filter(orderItem => orderItem.id !== itemId)
    }), this.updateLocalStorage);
  }

  /**
   * @memberof CustomerMenu
   * @param {object} event
   * @param {string} itemId
   * @returns {func} updateOrderItem
   */
  handleQuantityInputChange = (event, itemId) => {
    const quantity = event.target.value <= 0 ? 1 : event.target.value;

    const orderItem = this.changeOrderQuantity(itemId, parseInt(quantity, 10));
    return this.updateOrderItem(orderItem);
  }

  /**
   * @memberof CustomerMenu
   * @param {string} itemId
   * @param {number} quantity
   * @returns {object} orderItem
   */
  changeOrderQuantity = (itemId, quantity) => {
    const orderItem = this.state.order.find(item => item.id === itemId);

    orderItem.quantity = quantity;

    return orderItem;
  }

  /**
   * @memberof CustomerMenu
   * @param {object} orderItem
   * @returns {nothing} nothing
   */
  updateOrderItem = (orderItem) => {
    const itemIndex = this.getItemIndex(orderItem.id);

    this.setState(prevState => ({
      order: [
        ...prevState.order.slice(0, itemIndex),
        {
          ...prevState.order[itemIndex],
          ...orderItem
        },
        ...prevState.order.slice(itemIndex + 1)
      ]
    }), this.updateLocalStorage);
  }

  /**
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
  */
  fetchMenu = () => this.props.fetchMenu(this.props.currentDay);

  /**
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
  */
  renderMenu = () => {
    const { meals } = this.props;
    return (
      <Fragment>
        {meals.length === 0 && <p className="text-center">{'There are no Meals on Today\'s Menu'}</p>}
        {meals.length !== 0 &&
          <div className="card-group meals-wrapper" id="card-group">
            {meals.map(meal =>
              (<MealCard
                type="customer"
                key={meal.id}
                meal={meal}
                orderMeal={() => this.handleOrderMealClick(meal)}
              />))}
          </div>}
      </Fragment>
    );
  }

  /**
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
  */
  render() {
    const { user, logout, isFetching } = this.props;
    const { order } = this.state;
    const isShopOpen = checkShopOpen();

    return (
      <CustomerView
        user={user}
        logout={logout}
        type="menu"
        isFetching={isFetching}
      >
        <div className="content-wrapper meals user-meals">
          <div className="user-menu">
            <div className="main-menu">
              <div className="page-heading">
                <h2>{'Today\'s Menu'}</h2>
                <hr />
              </div>
              {!isShopOpen && <Notification message="Ordering is not available between 4:00pm and 8:30am. Please check back later." />}
              {this.renderMenu()}
            </div>
            <Cart
              order={order}
              handleQuantityInputChange={this.handleQuantityInputChange}
              removeOrderItem={this.removeOrderItem}
            />
          </div>
        </div>
      </CustomerView>
    );
  }
}

export default CustomerMenu;

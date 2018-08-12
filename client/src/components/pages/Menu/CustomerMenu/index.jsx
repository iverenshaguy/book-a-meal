import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MealCard from '../../../shared/MealCard';
import Cart from '../../../shared/Cart';
import { userPropTypes, mealObjPropTypes } from '../../../../helpers/proptypes';
import View from '../../../shared/View';
import Notification from '../../../shared/Notification';
import checkShopOpen from '../../../../helpers/checkShopOpen';
import getOrderFromLocalStorage from '../../../../helpers/getOrderFromLocalStorage';
import updateLocalStorageOrder from '../../../../helpers/updateLocalStorageOrder';
import CardGroup from '../../../shared/CardGroup';
import './CustomerMenu.scss';

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
      order: getOrderFromLocalStorage(props.user)
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
   * @returns {void}
   */
  getItemIndex = itemId => this.state.order.meals.findIndex(item => item.id === itemId)

  /**
   * @memberof CustomerMenu
   * @param {object} meal
   * @returns {func} addOrderItem|updateOrderItem
   */
  handleOrderMealClick = (meal) => {
    const itemIndex = this.getItemIndex(meal.id);

    if (itemIndex !== -1) {
      const newQuantity = this.state.order.meals[itemIndex].quantity + 1;

      const orderItem = this.changeOrderQuantity(meal.id, newQuantity);

      return this.updateOrderItem(orderItem);
    }

    return this.addOrderItem(meal);
  }

  /**
   * @memberof CustomerMenu
   * @param {object} meal
   * @returns {void}
   */
  addOrderItem = (meal) => {
    const item = {
      id: meal.id,
      title: meal.title,
      price: meal.price,
      quantity: 1
    };

    this.setState(prevState => ({
      order: {
        ...prevState.order,
        meals: [...prevState.order.meals, item]
      }
    }), () =>
      updateLocalStorageOrder(this.props.user.id, this.state.order));
  }

  /**
   * @memberof CustomerMenu
   * @param {object} orderItem
   * @returns {void}
   */
  updateOrderItem = (orderItem) => {
    const itemIndex = this.getItemIndex(orderItem.id);

    this.setState(prevState => ({
      order: {
        ...prevState.order,
        meals: [
          ...prevState.order.meals.slice(0, itemIndex),
          {
            ...prevState.order.meals[itemIndex],
            ...orderItem
          },
          ...prevState.order.meals.slice(itemIndex + 1)
        ]
      }
    }), () =>
      updateLocalStorageOrder(this.props.user.id, this.state.order));
  }

  /**
   * @memberof CustomerMenu
   * @param {string} itemId
   * @returns {void}
   */
  removeOrderItem = (itemId) => {
    this.setState(prevState => ({
      order: {
        ...prevState.order,
        meals: prevState.order.meals.filter(orderItem => orderItem.id !== itemId)
      }
    }), () =>
      updateLocalStorageOrder(this.props.user.id, this.state.order));
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
    const orderItem = this.state.order.meals.find(item => item.id === itemId);

    orderItem.quantity = quantity;

    return orderItem;
  }

  /**
   * @memberof CustomerMenu
   * @param {object} metadata
   * @returns {func} fetchMenu
  */
  fetchMenu = metadata => this.props.fetchMenu(this.props.currentDay, metadata);

  /**
   * @memberof CustomerMenu
   * @param {object} metadata
   * @returns {func} load more menu
  */
  loadMoreMenu = () => this.fetchMenu(this.props.metadata)

  /**
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
  */
  renderMenu = () => {
    const { meals } = this.props;
    const menu = meals.map(meal =>
      (<MealCard
        type="customer"
        key={meal.id}
        meal={meal}
        orderMeal={() => this.handleOrderMealClick(meal)}
        inBasket={!!this.state.order.meals.find(item => item.id === meal.id)}
      />));

    return (
      <Fragment>
        {meals.length === 0 && <p className="text-center">{'There are no Meals on Today\'s Menu'}</p>}
        {meals.length !== 0 &&
          <CardGroup
            items={menu}
            metadata={this.props.metadata}
            loadMore={this.loadMoreMenu}
          />}
      </Fragment>
    );
  }

  /**
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
  */
  render() {
    const { user, logout, isFetching } = this.props;
    const isShopOpen = checkShopOpen();

    return (
      <View user={user} logout={logout} type="menu" isFetching={isFetching}>
        <div className="meals user-meals">
          <div className="user-menu">
            <div className="main-menu">
              <div className="page-heading">
                <h2>{'Today\'s Menu'}</h2>
                <hr />
              </div>
              {!isShopOpen && <Notification message="Ordering is only available between 8:30am and 4:00pm. Please check back later." />}
              {this.renderMenu()}
            </div>
            <Cart
              order={this.state.order.meals}
              handleQuantityInputChange={this.handleQuantityInputChange}
              removeOrderItem={this.removeOrderItem}
            />
          </div>
        </div>
      </View>
    );
  }
}

export default CustomerMenu;

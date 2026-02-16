import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchMenu } from 'src/features/menu/data/actions';

import Cart from 'src/features/common/components/Cart';
import { userPropTypes } from 'src/features/common/utils/proptypes';
import View from 'src/features/common/components/View';
import Notification from 'src/features/common/components/Notification';
import checkShopOpen from 'src/features/common/utils/checkShopOpen';
import getOrderFromLocalStorage from 'src/features/common/utils/getOrderFromLocalStorage';
import updateLocalStorageOrder from 'src/features/common/utils/updateLocalStorageOrder';
import SearchForm from 'src/features/common/components/Form/SearchForm';
import MenuItems from 'src/features/menu/customer/components/CustomerMenuItems';
import 'src/features/menu/customer/CustomerMenu.scss';

/**
 * @exports
 * @class CustomerMenu
 * @extends Component
 * @classdesc Creates CustomerMenu Component
 * @returns {React.ComponentClass} CustomerMenu Component
 */
export class CustomerMenu extends Component {
  static propTypes = {
    ...userPropTypes,
    fetchMenu: PropTypes.func.isRequired,
  };

  /**
   * @constructor
   * @memberof CustomerMenu
   * @param {object} props
   * @returns {React.ComponentClass} CustomerMenu Component
   */
  constructor(props) {
    super();

    this.state = {
      order: getOrderFromLocalStorage(props.user),
    };
  }

  /**
   * @memberof CustomerMenu
   * @returns {React.ComponentClass} CustomerMenu Component
   */
  componentDidMount() {
    this.fetchMenu();
  }

  /**
   * @memberof CustomerMenu
   * @param {string} itemId
   * @returns {void}
   */
  getItemIndex = (itemId) => this.state.order.meals.findIndex((item) => item.id === itemId);

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
      quantity: 1,
    };

    this.setState(
      (prevState) => ({
        order: {
          ...prevState.order,
          meals: [...prevState.order.meals, item],
        },
      }),
      () => updateLocalStorageOrder(this.props.user.id, this.state.order)
    );
  };

  /**
   * @memberof CustomerMenu
   * @param {object} orderItem
   * @returns {void}
   */
  updateOrderItem = (orderItem) => {
    const itemIndex = this.getItemIndex(orderItem.id);

    this.setState(
      (prevState) => ({
        order: {
          ...prevState.order,
          meals: [
            ...prevState.order.meals.slice(0, itemIndex),
            {
              ...prevState.order.meals[itemIndex],
              ...orderItem,
            },
            ...prevState.order.meals.slice(itemIndex + 1),
          ],
        },
      }),
      () => updateLocalStorageOrder(this.props.user.id, this.state.order)
    );
  };

  /**
   * @memberof CustomerMenu
   * @param {string} itemId
   * @returns {void}
   */
  removeOrderItem = (itemId) => {
    this.setState(
      (prevState) => ({
        order: {
          ...prevState.order,
          meals: prevState.order.meals.filter((orderItem) => orderItem.id !== itemId),
        },
      }),
      () => updateLocalStorageOrder(this.props.user.id, this.state.order)
    );
  };

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
  };

  /**
   * @memberof CustomerMenu
   * @param {string} itemId
   * @param {number} quantity
   * @returns {object} orderItem
   */
  changeOrderQuantity = (itemId, quantity) => {
    const orderItem = this.state.order.meals.find((item) => item.id === itemId);

    orderItem.quantity = quantity;

    return orderItem;
  };

  /**
   * @memberof CustomerMenu
   * @param {object} metadata
   * @param {string} searchTerm
   * @returns {void}
   */
  fetchMenu = (metadata, searchTerm) => {
    this.props.fetchMenu(this.props.currentDay, metadata, searchTerm);
  };

  /**
   * @memberof CustomerMenu
   * @returns {React.ComponentClass} CustomerMenu Component
   */
  render() {
    const isShopOpen = checkShopOpen();

    return (
      <View type="menu">
        <div className="meals user-meals">
          <div className="user-menu">
            <div className="main-menu">
              <div className="page-heading">
                <h2>Today's Menu</h2>
                <hr />
              </div>
              <SearchForm type="customer" fetchItems={this.fetchMenu} />
              {!isShopOpen && (
                <Notification message="Ordering is only available between 8:30am and 4:00pm. Please check back later." />
              )}
              <MenuItems loadMoreMenu={this.fetchMenu} order={this.state.order} addOrderItem={this.addOrderItem} />
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

export default connect(null, { fetchMenu })(CustomerMenu);

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MealCard from '../../../shared/MealCard';
import { userPropTypes, mealObjPropTypes } from '../../../../helpers/proptypes';
import CustomerView from '../../../shared/CustomerView';

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
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
   */
  componentDidMount() {
    this.fetchMenu();
  }

  /**
   * @memberof CustomerMenu
   * @returns {JSX} CustomerMenu Component
  */
  fetchMenu = () => {
    this.props.fetchMenu(this.props.currentDay);
  }

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

    return (
      <CustomerView
        user={user}
        logout={logout}
        type="menu"
        isFetching={isFetching}
      >
        <div className="content-wrapper meals user-meals">
          <div className="page-heading">
            <h2>{'Today\'s Menu'}</h2>
            <hr />
          </div>
          {this.renderMenu()}
        </div>
      </CustomerView>
    );
  }
}

export default CustomerMenu;

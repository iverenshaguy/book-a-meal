import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
import MealCard from '../../shared/MealCard';
import View from '../../shared/View';
import { userPropTypes, mealObjPropTypes } from '../../../helpers/proptypes';
import CardGroup from '../../shared/CardGroup';

/**
 * @exports
 * @class Meals
 * @extends Component
 * @classdesc Creates Meals Component
 * @returns {JSX} Meals Component
 */
class Meals extends Component {
  static propTypes = {
    ...userPropTypes,
    meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    fetchMeals: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    uploading: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    submitError: null
  }

  state = {
    currentMealId: null
  }

  /**
   * @memberof Meals
   * @returns {JSX} Meals Component
   */
  componentDidMount() {
    this.props.fetchMeals();
  }

  /**
   * @memberof Meals
   * @param {string} id
   * @returns {JSX} Meals Component
  */
  getCurrentMeal = id => this.props.meals.find(item => item.id === id);


  /**
   * @memberof Meals
   * @param {string} id
   * @param {string} type
   * @returns {JSX} Meals Component
  */
  toggleModal = (id, type) => {
    this.setState({
      currentMealId: id
    });

    return this.props.toggleModal(type);
  }

  /**
   * @memberof Meals
   * @returns {JSX} Board Component
   */
  renderMeals = () => {
    const mealItems = this.props.meals.map(meal =>
      (<MealCard
        type="caterer"
        key={meal.id}
        meal={meal}
        toggleModal={type => this.toggleModal(meal.id, type)}
      />));


    return (
      <Fragment>
        <div className="content-wrapper meals caterer-meals">
          <div className="top">
            <button className="btn btn-pri" id="add-meal-btn" onClick={() => this.props.toggleModal('addMeal')}>
            Add a New Meal
            </button>
          </div>
          {this.props.meals.length === 0 && <p className="text-center">You Do Not Have Any Meals Yet</p>}
          {this.props.meals.length !== 0 && <CardGroup items={mealItems} limit={8} />}
        </div>
      </Fragment>
    );
  }


  /**
   * @memberof Meals
   * @returns {JSX} Meals Component
   */
  render() {
    const {
      user, logout, submitting, submitError, isFetching, uploading
    } = this.props;

    const { currentMealId } = this.state;

    if (user.role === 'customer') return <Redirect to="/" />;

    return (
      <Fragment>
        <View
          user={user}
          logout={logout}
          type="meals"
          showTime
          isFetching={isFetching}
          meal={this.getCurrentMeal(currentMealId)}
          uploading={uploading}
          submitting={submitting}
          submitError={submitError}
        >
          {this.renderMeals()}
        </View>
      </Fragment>
    );
  }
}

export default Meals;

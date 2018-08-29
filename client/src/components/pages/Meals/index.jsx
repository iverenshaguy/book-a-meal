import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MealCard from '../../shared/MealCard';
import View from '../../../containers/shared/View';
import { mealObjPropTypes, metadataPropTypes } from '../../../helpers/proptypes';
import CardGroup from '../../shared/CardGroup';
import './Meals.scss';

/**
 * @exports
 * @class Meals
 * @extends Component
 * @classdesc Creates Meals Component
 * @returns {JSX} Meals Component
 */
class Meals extends Component {
  static propTypes = {
    ...metadataPropTypes,
    meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
    fetchMeals: PropTypes.func.isRequired,
    submitError: PropTypes.string,
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
    if (!this.props.metadata.pages) this.props.fetchMeals();
  }

  /**
   * @memberof Meals
   * @param {string} id
   * @returns {JSX} Meals Component
  */
  getCurrentMeal = id => this.props.meals.find(item => item.id === id);

  /**
   * @memberof Meals
   * @param {object} metadata
   * @returns {func} load more meals
  */
  loadMoreMeals = () => this.props.fetchMeals(this.props.metadata)

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
          {this.props.meals.length === 0 && <p className="text-center info">You Do Not Have Any Meals Yet</p>}
          {this.props.meals.length !== 0 &&
            <CardGroup
              items={mealItems}
              metadata={this.props.metadata}
              loadMore={this.loadMoreMeals}
            />}
        </div>
      </Fragment>
    );
  }


  /**
   * @memberof Meals
   * @returns {JSX} Meals Component
   */
  render() {
    const { submitting, submitError } = this.props;

    const { currentMealId } = this.state;

    return (
      <Fragment>
        <View
          type="meals"
          showTime
          meal={this.getCurrentMeal(currentMealId)}
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

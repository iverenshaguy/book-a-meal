import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../shared/Modal';
import MealCard from '../../shared/MealCard';
import CatererView from '../../shared/CatererView';
import { userPropTypes, mealObjPropTypes } from '../../../helpers/proptypes';

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
    submitting: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    submitError: null
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
   * @returns {JSX} Board Component
   */
  renderMeals = () => (
    <Fragment>
      <div className="content-wrapper meals caterer-meals">
        <div className="top">
          <button className="btn btn-pri" id="add-meal-btn" onClick={() => this.props.toggleModal('addMeal')}>
            Add a New Meal
          </button>
        </div>
        <div className="card-group meals-wrapper" id="card-group">
          {[...this.props.meals].reverse().map(meal => <MealCard type="caterer" key={meal.id} meal={meal} />)}
        </div>
      </div>
    </Fragment>
  )


  /**
   * @memberof Meals
   * @returns {JSX} Meals Component
   */
  render() {
    const {
      user, logout, submitting, submitError, isFetching
    } = this.props;

    return (
      <Fragment>
        <CatererView user={user} logout={logout} type="meals" isFetching={isFetching}>
          {this.renderMeals()}
        </CatererView>
        <Modal type="addMeal" submitting={submitting} submitError={submitError} />
      </Fragment>
    );
  }
}

export default Meals;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Modal from '../../shared/Modal';
import SideNav from '../../shared/SideNav';
import MealCard from '../../shared/MealCard';
import Preloader from '../../shared/Preloader';
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
    submitting: PropTypes.bool.isRequired
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
  renderMeals = () => {
    if (this.props.isFetching) return <Preloader type="admin" />;

    return (
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
    );
  }


  /**
   * @memberof Meals
   * @returns {JSX} Meals Component
   */
  render() {
    const {
      user, logout, submitting, submitError
    } = this.props;

    return (
      <div className="admin">
        <Header type="caterer" />
        <div className="content">
          <SideNav user={user} logout={logout} active="meals" />
          <div className="content-wrapper" id="has-modal">
            {this.renderMeals()}
          </div>
        </div>
        <Footer />
        <Modal type="addMeal" submitting={submitting} submitError={submitError} />
      </div>
    );
  }
}

export default Meals;

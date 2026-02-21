import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { fetchMeals } from 'src/features/meals/data/actions';
import { toggleModal } from 'src/features/common/data/actions';

import PropTypes from 'prop-types';
import MealCard from 'src/features/common/components/MealCard';
import View from 'src/features/common/components/View';
import { mealObjPropTypes, metadataPropTypes } from 'src/features/common/utils/proptypes';
import CardGroup from 'src/features/common/components/CardGroup';
import 'src/features/meals/Meals.scss';

/**
 * @exports
 * @class Meals
 * @extends Component
 * @classdesc Creates Meals Component
 * @returns {React.ComponentClass} Meals Component
 */
export class Meals extends Component {
  static propTypes = {
    ...metadataPropTypes,
    meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
    fetchMeals: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    submitError: null,
  };

  state = {
    currentMealId: null,
  };

  /**
   * @memberof Meals
   * @returns {React.ComponentClass} Meals Component
   */
  componentDidMount() {
    this.props.fetchMeals();
  }

  /**
   * @memberof Meals
   * @param {string} id
   * @returns {React.ComponentClass} Meals Component
   */
  getCurrentMeal = (id) => this.props.meals.find((item) => item.id === id);

  /**
   * @memberof Meals
   * @param {object} metadata
   * @returns {func} load more caterer
   */
  loadMoreMeals = () => this.props.fetchMeals(this.props.metadata);

  /**
   * @memberof Meals
   * @param {string} id
   * @param {string} type
   * @returns {React.ComponentClass} Meals Component
   */
  toggleMealModal = (id, type) => {
    this.setState({
      currentMealId: id,
    });

    return this.props.toggleModal(type);
  };

  /**
   * @memberof Meals
   * @returns {React.ComponentClass} Board Component
   */
  renderMeals = () => {
    const mealItems = this.props.meals.map((meal) => (
      <MealCard type="caterer" key={meal.id} meal={meal} toggleModal={(type) => this.toggleMealModal(meal.id, type)} />
    ));

    return (
      <Fragment>
        <div className="content-wrapper meals caterer-meals">
          <div className="top">
            <button
              type="button"
              className="btn btn-pri"
              id="add-meal-btn"
              onClick={() => this.props.toggleModal('addMeal')}
            >
              Add a New Meal
            </button>
          </div>
          {this.props.meals.length === 0 && <p className="text-center info">You Do Not Have Any Meals Yet</p>}
          {this.props.meals.length !== 0 && (
            <CardGroup items={mealItems} metadata={this.props.metadata} loadMore={this.loadMoreMeals} />
          )}
        </div>
      </Fragment>
    );
  };

  /**
   * @memberof Meals
   * @returns {React.ComponentClass} Meals Component
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

const mapStateToProps = (state) => ({
  meals: state.meals.items,
  submitting: state.meals.working,
  submitError: state.meals.error,
  metadata: state.meals.metadata,
});

export default connect(mapStateToProps, { fetchMeals, toggleModal })(Meals);

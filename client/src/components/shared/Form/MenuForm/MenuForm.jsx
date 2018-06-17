import React, { Fragment, Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { mealObjPropTypes } from '../../../../helpers/proptypes';
import MiniPreloader from '../../Preloader/MiniPreloader';

/**
 * @exports
 * @extends Component
 * @class MenuForm
 * @returns {JSX} MenuForm
 */
class MenuForm extends Component {
  static propTypes = {
    meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
    menu: PropTypes.shape({
      date: PropTypes.string,
      meals: PropTypes.arrayOf(mealObjPropTypes),
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchMeals: PropTypes.func.isRequired,
    fetchMenu: PropTypes.func.isRequired,
    addMenu: PropTypes.func.isRequired,
    clearMenuError: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitError: PropTypes.string
  }

  static defaultProps = {
    submitError: null
  }

  state = {
    date: this.props.menu.date,
    meals: this.props.menu.meals.map(meal => meal.id)
  }

  /**
   * @memberof MenuForm
   * @returns {JSX} MenuForm
   */
  async componentDidMount() {
    this.props.clearMenuError();
    await this.props.fetchMeals();
    await this.props.fetchMenu(this.props.menu.date);
  }

  /**
   * @memberof MenuForm
   * @param {object} event
   * @returns {JSX} MenuForm
   */
  handleChangeDate = (event) => {
    this.props.clearMenuError();
    const date = moment(event.target.value).format('YYYY-MM-DD');

    this.setState({ date }, () => this.props.fetchMenu(date));
  }

  /**
   * @memberof MenuForm
   * @param {object} event
   * @returns {JSX} MenuForm
   */
  handleSelectMeal = (event) => {
    this.props.clearMenuError();
    const { target } = event;
    const { name } = target;

    return target.checked ? this.addMeal(name) : this.removeMeal(name);
  }

  /**
   * @memberof MenuForm
   * @param {object} meal
   * @returns {JSX} MenuForm
   */
  addMeal = (meal) => {
    this.setState(prevState => ({
      meals: [...prevState.meals, meal]
    }));
  }

  /**
   * @memberof MenuForm
   * @param {object} meal
   * @returns {JSX} MenuForm
   */
  removeMeal = (meal) => {
    this.setState(prevState => ({
      meals: prevState.meals.filter(item => item !== meal)
    }));
  }

  /**
   * @memberof MenuForm
   * @param {object} meal
   * @returns {JSX} MenuForm
   */
  submitMenu = () => {
    this.props.addMenu(this.state);
  }

  /**
   * @memberof MenuForm
   * @returns {JSX} MenuForm
   */
  render() {
    const {
      meals, isFetching, submitError, submitting
    } = this.props;

    return (
      <Fragment>
        {(isFetching || submitting) && <div className="text-center"><MiniPreloader /></div>}
        {!isFetching && meals.length === 0 && <p className="text-center">You Do Not Have Any Meals Yet</p>}
        {!isFetching && !submitting && meals.length !== 0 &&
          <Fragment>
            {submitError && <p className="text-center">{submitError}</p>}
            <div className="meal-options-list">
              <div className="form-input">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={this.state.date} onChange={this.handleChangeDate} />
              </div>
              {meals.map(meal => (
                <div className="form-input-checkbox" key={meal.id}>
                  <input
                    type="checkbox"
                    id={meal.id}
                    name={meal.id}
                    checked={this.state.meals.includes(meal.id)}
                    onChange={this.handleSelectMeal}
                  />
                  &nbsp;&nbsp;
                  <label htmlFor="checkbox">{meal.title}</label>
                </div>))}
            </div>
            <button className="btn btn-pri btn-block" onClick={this.submitMenu}>ADD MEAL OPTIONS</button>
          </Fragment>}
      </Fragment>
    );
  }
}

export default MenuForm;

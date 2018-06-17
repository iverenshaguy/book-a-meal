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
    editMenu: PropTypes.func.isRequired,
    clearMenuError: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  /**
   * @static
   * @memberof MenuForm
   * @param {object} props
   * @returns {JSX} MenuForm
   */
  static getDerivedStateFromProps(props) {
    return { error: props.submitError };
  }

  state = {
    date: this.props.menu.date,
    meals: this.props.menu.meals.map(meal => meal.id),
    error: null
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
  clearFormError = () => {
    this.setState({ error: null });
    this.props.clearMenuError();
  }

  /**
   * @memberof MenuForm
   * @param {object} event
   * @returns {JSX} MenuForm
   */
  handleChangeDate = (event) => {
    this.clearFormError();

    const date = moment(event.target.value).format('YYYY-MM-DD');

    this.setState({ date }, () => this.props.fetchMenu(date));
  }

  /**
   * @memberof MenuForm
   * @param {object} event
   * @returns {JSX} MenuForm
   */
  handleSelectMeal = (event) => {
    this.clearFormError();

    const { target } = event;
    const { name } = target;

    return target.checked ? this.addMealToState(name) : this.removeMealToState(name);
  }

  /**
   * @memberof MenuForm
   * @param {object} meal
   * @returns {JSX} MenuForm
   */
  addMealToState = (meal) => {
    this.setState(prevState => ({
      meals: [...prevState.meals, meal]
    }));
  }

  /**
   * @memberof MenuForm
   * @param {object} meal
   * @returns {JSX} MenuForm
   */
  removeMealToState = (meal) => {
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
    const { menu, addMenu, editMenu } = this.props;
    const { meals } = this.state;

    if (meals.length === 0) return this.setState({ error: 'You Cannot Set Empty Meals as a Menu' });

    return !menu.id ? addMenu(this.state) : editMenu(menu.id, { meals: this.state.meals });
  }

  /**
   * @memberof MenuForm
   * @returns {JSX} MenuForm
   */
  renderMenuForm = () => (
    <Fragment>
      {this.state.error && <p className="text-center danger">{this.state.error}</p>}
      <div className="meal-options-list">
        <div className="form-input">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={this.state.date} onChange={this.handleChangeDate} />
        </div>
        {this.props.meals.map(meal => (
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
      <button className="btn btn-pri btn-block" onClick={this.submitMenu}>SAVE MEAL OPTIONS</button>
    </Fragment>
  )

  /**
   * @memberof MenuForm
   * @returns {JSX} MenuForm
   */
  render() {
    const { meals, isFetching, submitting } = this.props;

    return (
      <Fragment>
        {(isFetching || submitting) && <div className="text-center"><MiniPreloader /></div>}
        {!isFetching && meals.length === 0 && <p className="text-center">You Do Not Have Any Meals Yet</p>}
        {!isFetching && !submitting && meals.length !== 0 && this.renderMenuForm()}
      </Fragment>
    );
  }
}

export default MenuForm;

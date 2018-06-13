import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Modal from '../../../shared/Modal';
import MealCard from '../../../shared/MealCard';
import DatePicker from '../../../shared/DatePicker';
import CatererView from '../../../shared/CatererView';
import { userPropTypes, mealObjPropTypes } from '../../../../helpers/proptypes';

/**
 * @exports
 * @class CatererMenu
 * @extends Component
 * @classdesc Creates CatererMenu Component
 * @returns {JSX} CatererMenu Component
 */
class CatererMenu extends Component {
  static propTypes = {
    ...userPropTypes,
    meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    fetchMenu: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    submitError: null
  }

  state = {
    currentDay: moment().format('YYYY-MM-DD')
  }

  /**
 * @memberof CatererMenu
 * @returns {JSX} CatererMenu Component
 */
  componentDidMount() {
    this.fetchMenu();
  }

  /**
   * @memberof CatererMenu
   * @param {string} date
   * @returns {JSX} CatererMenu Component
   */
  updateCurrentDate = (date) => {
    this.setState({
      currentDay: date
    }, () => this.fetchMenu());
  }

  fetchMenu = () => {
    this.props.fetchMenu(this.state.currentDay);
  }

  /**
   * @memberof CatererMenu
   * @returns {JSX} CatererMenu Component
   */
  renderCatererMenu = () => {
    const now = moment().format('YYYY-MM-DD');
    const disableAddButton = moment(now).isAfter(moment(this.state.currentDay)) ? true : null;

    return (
      <Fragment>
        <div className="content-wrapper meals menu-meals">
          <div className="date d-none-md">
            <h2>{moment(this.state.currentDay).format('dddd[,] Do MMMM YYYY')}</h2>
            <DatePicker handleSelectDate={this.updateCurrentDate} />
          </div>
          <DatePicker screenSize="md" handleSelectDate={this.updateCurrentDate} />
          <div className="top">
            <button disabled={disableAddButton} className="btn btn-pri" id="menu-modal-btn" onClick={() => this.props.toggleModal('menu')}>Set Menu</button>
          </div>
          <div className="page-heading">
            <h2>{'Meal Items on This Day\'s Menu'}</h2>
            <hr />
          </div>
          <div className="card-group meals-wrapper" id="card-group">
            {[...this.props.meals].map(meal =>
              (<MealCard
                type="menu"
                key={meal.id}
                meal={meal}
              />))}
          </div>
        </div>
      </Fragment>
    );
  }


  /**
   * @memberof CatererMenu
* @returns {JSX} CatererMenu Component
  */
  render() {
    const {
      user, meals, logout, submitting, submitError, isFetching
    } = this.props;

    return (
      <Fragment>
        <CatererView
          date={moment(this.state.currentDay).format('dddd[,] Do MMMM YYYY')}
          showTime={false}
          user={user}
          logout={logout}
          type="menu"
          isFetching={isFetching}
        >
          {this.renderCatererMenu()}
        </CatererView>
        <Modal
          meals={meals}
          submitting={submitting}
          submitError={submitError}
        />
      </Fragment>
    );
  }
}

export default CatererMenu;

import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Modal from '../../../../containers/shared/Modal';
import MealCard from '../../../shared/MealCard';
import DatePicker from '../../../shared/DatePicker';
import View from '../../../shared/View';
import { userPropTypes, mealObjPropTypes } from '../../../../helpers/proptypes';
import CardGroup from '../../../shared/CardGroup';

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
    currentDay: PropTypes.string.isRequired,
    submitError: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      date: PropTypes.shape({
        value: PropTypes.string
      })
    })]),
    submitting: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    setCurrentDay: PropTypes.func.isRequired,
  }

  static defaultProps = {
    submitError: null
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
  updateCurrentDate = async (date) => {
    await this.props.setCurrentDay(date);
    this.fetchMenu();
  }

  /**
   * @memberof CatererMenu
   * @param {object} metadata
   * @returns {func} fetchMenu
  */
  fetchMenu = (metadata = null) => {
    this.props.fetchMenu(this.props.currentDay, metadata);
  }

  /**
   * @memberof CatererMenu
   * @param {object} metadata
   * @returns {func} load more menu
  */
 loadMoreMenu = () => this.fetchMenu(this.props.metadata)

  /**
   * @memberof CatererMenu
   * @returns {JSX} CatererMenu Component
   */
  renderCatererMenu = () => {
    const now = moment().format('YYYY-MM-DD');
    const showMenuBtn = !moment(now).isAfter(moment(this.props.currentDay));

    const menu = this.props.meals.map(meal =>
      (<MealCard
        type="menu"
        key={meal.id}
        meal={meal}
      />));

    return (
      <Fragment>
        <div className="content-wrapper meals menu-meals">
          <div className="date d-none-md">
            <h2>{moment(this.props.currentDay).format('dddd[,] Do MMMM YYYY')} <span style={{ cursor: 'pointer' }}>&nbsp;&#9662;</span></h2>
            <DatePicker handleSelectDate={this.updateCurrentDate} />
          </div>
          <div className="top">
            {showMenuBtn && <button className="btn btn-pri" id="menu-modal-btn" onClick={() => this.props.toggleModal('menu')}>View Menu</button>}
          </div>
          <div className="page-heading">
            <h2>{'Meal Items on This Day\'s Menu'}</h2>
            <hr />
          </div>
          {this.props.meals.length === 0 && <p className="text-center">There are no Meal Items on this Menu</p>}
          {this.props.meals.length !== 0 &&
            <CardGroup
              items={menu}
              metadata={this.props.metadata}
              loadMore={this.loadMoreMenu}
            />}
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
        <View
          showTime={false}
          user={user}
          logout={logout}
          type="menu"
          isFetching={isFetching}
          updateCurrentDate={this.updateCurrentDate}
        >
          {this.renderCatererMenu()}
        </View>
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

import React, { Component, Fragment } from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
import { fetchMenu, setCurrentDay } from 'src/features/menu/data/actions';
import { toggleModal } from 'src/features/common/data/actions';

import PropTypes from 'prop-types';
import MealCard from 'src/features/common/components/MealCard';
import DatePicker from 'src/features/common/components/DatePicker';
import View from 'src/features/common/components/View';
import { mealObjPropTypes, metadataPropTypes } from 'src/features/common/utils/proptypes';
import CardGroup from 'src/features/common/components/CardGroup';

/**
 * @exports
 * @class CatererMenu
 * @extends Component
 * @classdesc Creates CatererMenu Component
 * @returns {React.ComponentClass} CatererMenu Component
 */
export class CatererMenu extends Component {
  static propTypes = {
    ...metadataPropTypes,
    meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
    fetchMenu: PropTypes.func.isRequired,
    currentDay: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    setCurrentDay: PropTypes.func.isRequired,
  };

  /**
   * @memberof CatererMenu
   * @returns {React.ComponentClass} CatererMenu Component
   */
  componentDidMount() {
    this.fetchMenu();
  }

  /**
   * @memberof CatererMenu
   * @param {string} date
   * @returns {React.ComponentClass} CatererMenu Component
   */
  updateCurrentDate = async (date) => {
    await this.props.setCurrentDay(date);
    this.fetchMenu();
  };

  /**
   * @memberof CatererMenu
   * @param {object} metadata
   * @returns {func} fetchMenu
   */
  fetchMenu = (metadata = null) => {
    this.props.fetchMenu(this.props.currentDay, metadata);
  };

  /**
   * @memberof CatererMenu
   * @param {object} metadata
   * @returns {func} load more menu
   */
  loadMoreMenu = () => this.fetchMenu(this.props.metadata);

  /**
   * @memberof CatererMenu
   * @returns {React.ComponentClass} CatererMenu Component
   */
  renderCatererMenu = () => {
    const now = moment().format('YYYY-MM-DD');
    const showMenuBtn = !moment(now).isAfter(moment(this.props.currentDay));

    const menu = this.props.meals.map((meal) => <MealCard type="menu" key={meal.id} meal={meal} />);

    return (
      <Fragment>
        <div className="content-wrapper meals menu-meals">
          <div className="date d-none-md">
            <h2>
              {moment(this.props.currentDay).format('dddd[,] Do MMMM YYYY')}{' '}
              <span style={{ cursor: 'pointer' }}>&nbsp;&#9662;</span>
            </h2>
            <DatePicker handleSelectDate={this.updateCurrentDate} />
          </div>
          <div className="top">
            {showMenuBtn && (
              <button
                type="button"
                className="btn btn-pri"
                id="menu-modal-btn"
                onClick={() => this.props.toggleModal('menu')}
              >
                Set Menu
              </button>
            )}
          </div>
          <div className="page-heading">
            <h2>Meal Items on This Day's Menu</h2>
            <hr />
          </div>
          {this.props.meals.length === 0 && <p className="text-center info">There are no Meal Items on this Menu</p>}
          {this.props.meals.length !== 0 && (
            <CardGroup items={menu} metadata={this.props.metadata} loadMore={this.loadMoreMenu} />
          )}
        </div>
      </Fragment>
    );
  };

  /**
   * @memberof CatererMenu
   * @returns {React.ComponentClass} CatererMenu Component
   */
  render() {
    return (
      <Fragment>
        <View showTime={false} type="menu" updateCurrentDate={this.updateCurrentDate}>
          {this.renderCatererMenu()}
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.menu.meals,
  currentDay: state.menu.currentDay,
  metadata: state.menu.metadata,
});

export default connect(mapStateToProps, { fetchMenu, toggleModal, setCurrentDay })(CatererMenu);

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Dropdown from '../Dropdown';
import LinkBtn from '../Link';
import { mealObjPropTypes } from '../../../helpers/proptypes';
import checkShopOpen from '../../../helpers/checkShopOpen';

/**
 * @exports
 * @extends Component
 * @class MealCard
 * @returns {JSX} MealCard
 */
class MealCard extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    meal: mealObjPropTypes.isRequired,
    toggleModal: PropTypes.func,
    orderMeal: PropTypes.func,
    inBasket: PropTypes.bool
  };

  static defaultProps = {
    toggleModal: null,
    orderMeal: null,
    inBasket: false
  };

  /**
   * @memberof MealCard
   * @returns {JSX} MealCardBody Component
  */
  renderMealCardBody = () => {
    const { meal, type, orderMeal } = this.props;
    const isShopOpen = checkShopOpen();
    const btnText = this.props.inBasket ? 'Added To Basket' : 'Add To Basket';
    const btnDisabled = this.props.inBasket ? 'disabled' : null;

    return (
      <div className="meal-card-body">
        <div>
          <h3>&#8358; {meal.price}</h3>
          <p data-tip={meal.description} className="meal-description">{meal.description}</p>
        </div>
        {type === 'customer' && isShopOpen &&
          <div className="meal-card-action">
            <button className="btn btn-sec meal-card-btn" onClick={orderMeal} disabled={btnDisabled}>{btnText}</button>
          </div>}
      </div>
    );
  }

  /**
   * @memberof MealCard
   * @returns {JSX} MealCard Component
  */
  render() {
    const { meal, type, toggleModal } = this.props;

    return (
      <div className={`meal-card ${type === 'customer' && 'order-meal-card'}`} id="meal-card">
        <div className="meal-card-header">
          {meal.vegetarian === true && <span className="veg-ribbon">Vegetarian</span>}
          <img src={meal.imageUrl} alt="meal" />
          {type === 'caterer' &&
            <Dropdown
              type="card"
              toggler={<Fragment>&hellip;</Fragment>}
              content={
                <Fragment>
                  <LinkBtn href="#add-edit-modal" id="edit-meal" clickHandler={() => toggleModal('editMeal')}>Edit</LinkBtn>
                  <LinkBtn href="#add-edit-modal" id="delete-meal" clickHandler={() => toggleModal('deleteMeal')}>Delete</LinkBtn>
                </Fragment>
              }
            />}
          <div className="menu-card-title"><p>{meal.title}</p></div>
        </div>
        {this.renderMealCardBody()}
        <ReactTooltip place="top" type="dark" effect="solid" className="tooltip" />
      </div>
    );
  }
}

export default MealCard;

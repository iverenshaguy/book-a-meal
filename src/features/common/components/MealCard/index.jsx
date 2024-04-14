import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Dropdown from 'src/features/common/components/Dropdown';
import LinkBtn from 'src/features/common/components/Link';
import { mealObjPropTypes } from 'src/features/common/utils/proptypes';
import checkShopOpen from 'src/features/common/utils/checkShopOpen';
import './MealCard.scss';

/**
 * @exports
 * @extends Component
 * @class MealCard
 * @returns {React.ComponentClass} MealCard
 */
class MealCard extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    meal: mealObjPropTypes.isRequired,
    toggleModal: PropTypes.func,
    orderMeal: PropTypes.func,
    inBasket: PropTypes.bool,
  };

  static defaultProps = {
    toggleModal: null,
    orderMeal: null,
    inBasket: false,
  };

  /**
   * @memberof MealCard
   * @returns {React.ComponentClass} MealCardBody Component
   */
  renderMealCardBody = () => {
    const { meal, type, orderMeal } = this.props;
    const isShopOpen = checkShopOpen();
    const btnText = this.props.inBasket ? 'Added To Basket' : 'Add To Basket';
    const btnDisabled = this.props.inBasket ? 'disabled' : null;

    return (
      <div className="meal-card-body">
        <div>
          <h3>
            &#8358;
            {meal.price}
          </h3>
          <p className="meal-description" data-tooltip-content={meal.description} data-tooltip-id="meal-card-tooltip">
            {meal.description}
          </p>
        </div>
        {type === 'customer' && isShopOpen && (
          <div className="meal-card-action">
            <button type="button" className="btn btn-sec meal-card-btn" onClick={orderMeal} disabled={btnDisabled}>
              {btnText}
            </button>
          </div>
        )}
      </div>
    );
  };

  /**
   * @memberof MealCard
   * @returns {React.ComponentClass} MealCard Component
   */
  render() {
    const { meal, type, toggleModal } = this.props;
    const orderMealCardClass = type === 'customer' ? ' customer-meal-card' : '';

    return (
      <div className={`meal-card${orderMealCardClass}`} id={meal.id}>
        <div className="meal-card-header">
          {meal.vegetarian === true && <span className="veg-ribbon">Vegetarian</span>}
          <img src={meal.imageUrl} alt="meal" />
          {type === 'caterer' && (
            <Dropdown
              type="card"
              toggler={<Fragment>&hellip;</Fragment>}
              content={
                <Fragment>
                  <LinkBtn id="edit-meal" clickHandler={() => toggleModal('editMeal')}>
                    Edit
                  </LinkBtn>
                  <LinkBtn id="delete-meal" clickHandler={() => toggleModal('deleteMeal')}>
                    Delete
                  </LinkBtn>
                </Fragment>
              }
            />
          )}
          <div className="menu-card-title">
            <p>{meal.title}</p>
          </div>
        </div>
        {this.renderMealCardBody()}
        <ReactTooltip place="top" type="dark" effect="solid" className="tooltip" id="meal-card-tooltip" />
      </div>
    );
  }
}

export default MealCard;

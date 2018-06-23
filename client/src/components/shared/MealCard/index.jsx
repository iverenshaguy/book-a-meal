import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import LinkBtn from '../Link';
import { mealObjPropTypes } from '../../../helpers/proptypes';
import checkShopOpen from '../../../helpers/checkShopOpen';

/**
 * @exports
 * @function MealCard
 * @param {object} props
 * @returns {JSX} MealCard
 */
const MealCard = (props) => {
  const {
    meal, type, toggleModal, orderMeal
  } = props;

  const isShopOpen = checkShopOpen();

  return (
    <div className={`meal-card ${type === 'customer' && 'order-meal-card'}`} id="meal-card">
      <div className="meal-card-header">
        <img src={meal.imageURL} alt="meal" />
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
        <div className="menu-card-title">
          <p>{meal.title}</p>
        </div>
      </div>
      <div className="meal-card-body">
        <div>
          <h3>&#8358; {meal.price}</h3>
          <p>{meal.description}</p>
        </div>
        {type === 'customer' && isShopOpen &&
          <div className="meal-card-action">
            <button className="btn btn-sec meal-card-btn" onClick={orderMeal}>Click to Order</button>
          </div>}
      </div>
    </div>
  );
};

MealCard.propTypes = {
  type: PropTypes.string.isRequired,
  meal: mealObjPropTypes.isRequired,
  toggleModal: PropTypes.func,
  orderMeal: PropTypes.func,
};

MealCard.defaultProps = {
  toggleModal: null,
  orderMeal: null
};

export default MealCard;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import LinkBtn from '../Link';
import { mealObjPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function MealCard
 * @returns {JSX} MealCard
 */
const MealCard = ({ meal, type }) => (
  <div className="meal-card" id="meal-card">
    <div className="meal-card-header">
      <img src={meal.imageURL} alt="meal" />
      {type === 'caterer' &&
      <Dropdown
        type="card"
        toggler={<Fragment>&hellip;</Fragment>}
        content={
          <Fragment>
            <LinkBtn href="#add-edit-modal" id="edit-meal">Edit</LinkBtn>
            <LinkBtn href="#add-edit-modal" id="delete-meal">Delete</LinkBtn>
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
      {type === 'user' &&
      <div className="meal-card-action">
        <button className="btn btn-sec meal-card-btn">Click to Order</button>
      </div>}
    </div>
  </div>
);

MealCard.propTypes = {
  type: PropTypes.string.isRequired,
  meal: mealObjPropTypes.isRequired
};

export default MealCard;

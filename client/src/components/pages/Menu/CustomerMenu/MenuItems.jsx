import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CardGroup from '../../../shared/CardGroup';
import MealCard from '../../../shared/MealCard';
import Preloader from '../../../shared/Preloader';
import { mealObjPropTypes, metadataPropTypes } from '../../../../helpers/proptypes';

/**
 * @exports
 * @function Menu
 * @param {object} props
 * @returns {JSX} Footer
 */
const MenuItems = (props) => {
  const { meals, addOrderItem, isFetching } = props;

  const menu = meals.map(meal => (
    <MealCard
      type="customer"
      key={meal.id}
      meal={meal}
      orderMeal={() => addOrderItem(meal)}
      inBasket={!!props.order.meals.find(item => item.id === meal.id)}
    />
  ));

  return (
    <Fragment>
      {isFetching && <Preloader type="menu" />}
      {!isFetching && meals.length === 0 && <p className="text-center info">No Meals Found</p>}
      {!isFetching && meals.length !== 0
        && (
        <CardGroup
          items={menu}
          metadata={props.metadata}
          loadMore={() => props.loadMoreMenu(props.metadata)}
        />
        )}
    </Fragment>
  );
};

MenuItems.propTypes = {
  ...metadataPropTypes,
  meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
  order: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.any).isRequired
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadMoreMenu: PropTypes.func.isRequired,
  addOrderItem: PropTypes.func.isRequired,
};

export default MenuItems;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CardGroup from 'src/features/common/components/CardGroup';
import MealCard from 'src/features/common/components/MealCard';
import Preloader from 'src/features/common/components/Preloader';
import { mealObjPropTypes, metadataPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @exports
 * @function Menu
 * @param {object} props
 * @returns {React.ComponentClass} Footer
 */
export const CustomerMenuItems = (props) => {
  const { meals, addOrderItem, isFetching } = props;

  const menu = meals.map((meal) => (
    <MealCard
      type="customer"
      key={meal.id}
      meal={meal}
      orderMeal={() => addOrderItem(meal)}
      inBasket={!!props.order.meals.find((item) => item.id === meal.id)}
    />
  ));

  return (
    <Fragment>
      {isFetching && <Preloader type="menu" />}
      {!isFetching && meals.length === 0 && <p className="text-center info">No Meals Found</p>}
      {!isFetching && meals.length !== 0 && (
        <CardGroup items={menu} metadata={props.metadata} loadMore={() => props.loadMoreMenu(props.metadata)} />
      )}
    </Fragment>
  );
};

CustomerMenuItems.propTypes = {
  ...metadataPropTypes,
  meals: PropTypes.arrayOf(mealObjPropTypes).isRequired,
  order: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    // eslint-disable-next-line react/forbid-prop-types
    meals: PropTypes.arrayOf(PropTypes.any).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadMoreMenu: PropTypes.func.isRequired,
  addOrderItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.menu.isFetching,
  meals: state.menu.meals,
  metadata: state.menu.metadata,
});

export default connect(mapStateToProps)(CustomerMenuItems);

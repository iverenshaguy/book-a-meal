import React, { Fragment } from 'react';
import { RenderInput, RenderFileInput } from '../../shared/FormComponents';
import { formPropTypes, mealObjPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function MealForm
 * @param {object} props
 * @returns {JSX} MealForm
 */
const MealForm = (props) => {
  const {
    state, handlers, meal, type, updating, editMeal
  } = props;

  return (
    <Fragment>
      <RenderInput
        type="text"
        name="title"
        id="title"
        label="Meal Name"
        required
        value={state.values.title}
        placeholder=""
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.title,
          error: state.error.title,
          asyncValidating: state.asyncValidating
        }}
      />
      <RenderInput
        type="number"
        name="price"
        id="price"
        label="Price"
        required
        value={state.values.price}
        placeholder=""
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.price,
          error: state.error.price
        }}
      />
      {type === 'editMeal' &&
        <RenderFileInput
          id="imageURL"
          name="imageURL"
          mealId={meal.id}
          label="Meal Image"
          updating={updating}
          formerImgURL={meal.imageURL}
          successCallBack={imageURL => editMeal(meal.id, { imageURL })}
        />}
      <RenderInput
        type="textarea"
        name="description"
        label="Description (not more than 65 words)"
        id="description"
        rows={2}
        maxLength="65"
        required={false}
        value={state.values.description}
        placeholder=""
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.description,
          error: state.error.description
        }}
      />
      <RenderInput
        type="checkbox"
        name="vegetarian"
        label="Suitable for Vegetarians"
        id="vegetarian"
        required={false}
        value={state.values.vegetarian}
        placeholder=""
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.vegetarian,
          error: state.error.vegetarian
        }}
      />
    </Fragment>
  );
};

MealForm.propTypes = {
  ...formPropTypes('addMeal'),
  meal: mealObjPropTypes
};

MealForm.defaultProps = {
  meal: null
};

export default MealForm;

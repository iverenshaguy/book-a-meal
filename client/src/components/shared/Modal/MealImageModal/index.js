import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MealImageModal from './MealImageModal';
import { editMeal } from '../../../../store/operations/meals';
import { getLastMealItem } from '../../../../store/selectors/meals';

const mapStateToProps = state => ({
  updating: state.meals.working,
  mealId: getLastMealItem(state.meals.items).id,
  formerImgURL: getLastMealItem(state.meals.items).imageURL
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editMeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MealImageModal);

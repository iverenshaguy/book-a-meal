import { connect } from 'react-redux';
import MenuForm from '../../../components/shared/Form/MenuForm';
import { fetchMeals } from '../../../actions/meals';
import {
  fetchMenu,
  setCurrentDay,
  addMenu,
  editMenu,
  clearMenuError
} from '../../../actions/menu';

const mapStateToProps = state => ({
  isFetching: state.isFetching || state.menu.isFetching,
  meals: state.meals.items,
  menu: {
    id: state.menu.id,
    meals: state.menu.meals,
    date: state.menu.currentDay
  },
  submitting: state.menu.working,
  submitError: state.menu.error,
  menuMetadata: state.menu.metadata,
  mealsMetadata: state.meals.metadata
});

export default connect(mapStateToProps, {
  fetchMenu, fetchMeals, setCurrentDay, addMenu, editMenu, clearMenuError
})(MenuForm);

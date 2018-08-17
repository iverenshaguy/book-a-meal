import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuForm from '../../../components/shared/Form/MenuForm';
import { fetchMeals } from '../../../actions/meals';
import { fetchMenu, setCurrentDay, addMenu, editMenu, clearMenuError } from '../../../actions/menu';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
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

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMenu, fetchMeals, setCurrentDay, addMenu, editMenu, clearMenuError
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuForm);

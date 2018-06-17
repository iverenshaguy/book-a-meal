import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuForm from './MenuForm';
import { fetchMeals } from '../../../../store/operations/meals';
import { fetchMenu, setCurrentDay, addMenu, clearMenuError } from '../../../../store/operations/menu';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  meals: state.meals.items,
  menu: {
    meals: state.menu.meals,
    date: state.menu.currentDay
  },
  submitting: state.menu.working,
  submitError: state.menu.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMenu, fetchMeals, setCurrentDay, addMenu, clearMenuError
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuForm);

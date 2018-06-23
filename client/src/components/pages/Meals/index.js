import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Meals from './Meals';
import { fetchMeals } from '../../../store/operations/meals';
import { logout } from '../../../store/operations/auth';
import { toggleModal } from '../../../store/actions/ui';
import './Meals.scss';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  meals: state.meals.items,
  submitting: state.meals.working,
  submitError: state.meals.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout, fetchMeals, toggleModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

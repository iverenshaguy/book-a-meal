import { connect } from 'react-redux';
import Meals from '../../../components/pages/Meals';
import { fetchMeals } from '../../../actions/meals';
import { toggleModal } from '../../../actions/ui';

const mapStateToProps = state => ({
  meals: state.meals.items,
  submitting: state.meals.working,
  submitError: state.meals.error,
  metadata: state.meals.metadata
});

export default connect(mapStateToProps, { fetchMeals, toggleModal })(Meals);

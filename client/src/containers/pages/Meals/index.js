import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Meals from '../../../components/pages/Meals';
import { fetchMeals } from '../../../actions/meals';
import { logout } from '../../../actions/auth';
import { toggleModal } from '../../../actions/ui';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  meals: state.meals.items,
  uploading: state.uploadImage.uploading,
  submitting: state.meals.working,
  submitError: state.meals.error,
  metadata: state.meals.metadata
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout, fetchMeals, toggleModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

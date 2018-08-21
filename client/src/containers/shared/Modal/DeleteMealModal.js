import { connect } from 'react-redux';
import DeleteMealModal from '../../../components/shared/Modal/DeleteMealModal';
import { deleteMeal } from '../../../actions/meals';

const mapStateToProps = state => ({
  deleting: state.meals.working
});

export default connect(mapStateToProps, { deleteMeal })(DeleteMealModal);

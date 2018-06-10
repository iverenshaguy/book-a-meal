import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeleteMealModal from './DeleteMealModal';
import { deleteMeal } from '../../../../store/operations/meals';

const mapStateToProps = state => ({
  deleting: state.meals.working
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteMeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMealModal);

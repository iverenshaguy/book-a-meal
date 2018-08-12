import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeleteMealModal from '../../../../components/shared/Modal/DeleteMealModal';
import { deleteMeal } from '../../../../actions/meals';

const mapStateToProps = state => ({
  deleting: state.meals.working
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteMeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMealModal);

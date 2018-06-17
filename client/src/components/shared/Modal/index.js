import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import { toggleModal } from '../../../store/actions/ui';

const mapStateToProps = state => ({
  open: state.ui.modals.open,
  type: state.ui.modals.type
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

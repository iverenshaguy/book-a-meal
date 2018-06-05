import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import { toggleModal } from '../../../store/actions/ui';

const mapStateToProps = state => ({
  isOpen: state.ui.modals.isOpen,
  type: state.ui.modals.type
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

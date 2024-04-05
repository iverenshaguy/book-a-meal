import { connect } from 'react-redux';
import Modal from '../../../components/shared/Modal';
import { toggleModal } from '../../../actions/ui';

const mapStateToProps = state => ({
  open: state.ui.modals.open,
  type: state.ui.modals.type
});

export default connect(mapStateToProps, { toggleModal })(Modal);

import { connect } from 'react-redux';
import View from '../../components/shared/View';
import { logout } from '../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  uploading: state.uploadImage.uploading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(View);

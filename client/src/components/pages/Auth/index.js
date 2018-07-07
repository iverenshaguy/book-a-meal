import { connect } from 'react-redux';
import AuthComponent from '../Auth/AuthComponent';

const mapStateToProps = state => ({
  submitting: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  id: state.auth.user.id,
  submitError: state.auth.error
});

export default connect(mapStateToProps)(AuthComponent);

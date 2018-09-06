import { connect } from 'react-redux';
import AuthComponent from '../../components/pages/Auth';

const mapStateToProps = state => ({
  submitting: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  submitError: state.auth.error
});

export default connect(mapStateToProps)(AuthComponent);

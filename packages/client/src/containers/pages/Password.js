import { connect } from 'react-redux';
import PasswordComponent from '../../components/pages/Password';

const mapStateToProps = state => ({
  submitting: state.auth.loading || state.auth.working,
  isAuthenticated: state.auth.isAuthenticated,
  submitError: state.auth.error,
  passwordSetSuccess: state.auth.passwordSetSuccess,
  mailSendSuccess: state.auth.mailSendSuccess
});

export default connect(mapStateToProps)(PasswordComponent);

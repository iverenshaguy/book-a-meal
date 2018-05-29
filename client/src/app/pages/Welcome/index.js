import { connect } from 'react-redux';
import WelcomeComponent from './WelcomeComponent';


const mapStateToProps = state => ({
  authenticating: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(WelcomeComponent);

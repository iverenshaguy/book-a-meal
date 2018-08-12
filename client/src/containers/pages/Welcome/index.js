import { connect } from 'react-redux';
import Welcome from '../../../components/pages/Welcome';


const mapStateToProps = state => ({
  authenticating: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(Welcome);

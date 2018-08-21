import { connect } from 'react-redux';
import Authenticator from '../../components/hoc/Authenticator';

export default (MyComponent) => {
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authenticating: state.auth.loading,
    user: state.auth.user,
    MyComponent
  });

  return connect(mapStateToProps)(Authenticator);
};

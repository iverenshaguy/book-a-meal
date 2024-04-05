import { connect } from 'react-redux';
import Authenticator from '../../components/hoc/Authenticator';

/**
 * Authenticates User
 * @function Authenticator
 * @param {JSX} MyComponent - Dynamic
 * @return {JSX} ConnectedComponent
 */
export default (MyComponent) => {
  console.log({
    MyComponent: MyComponent.name
  })
  const mapStateToProps = state => {
    console.log({
      isAuthenticated: state.auth.isAuthenticated,
      authenticating: state.auth.loading,
      user: state.auth.user
    })

    return ({
      isAuthenticated: state.auth.isAuthenticated,
      authenticating: state.auth.loading,
      user: state.auth.user,
      MyComponent
    });
  }
  return connect(mapStateToProps)(Authenticator);
};

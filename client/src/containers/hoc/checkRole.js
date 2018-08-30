import { connect } from 'react-redux';
import checkRole from '../../components/hoc/checkRole';

/**
 * Checks user role to know if user can access route
 * @function checkRole
 * @param {string} role - role type (customer|caterer)
 * @param {JSX} MyComponent - Dynamic
 * @return {JSX} ConnectedComponent
 */
export default role => (MyComponent) => {
  const mapStateToProps = state => ({
    role,
    MyComponent,
    user: state.auth.user,
  });

  return connect(mapStateToProps)(checkRole);
};

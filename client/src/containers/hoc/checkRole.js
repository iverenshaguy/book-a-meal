import { connect } from 'react-redux';
import checkRole from '../../components/hoc/checkRole';

export default role => (MyComponent) => {
  const mapStateToProps = state => ({
    role,
    MyComponent,
    user: state.auth.user,
  });

  return connect(mapStateToProps)(checkRole);
};

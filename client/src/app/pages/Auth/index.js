import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AuthComponent from '../Auth/AuthComponent';

const mapStateToProps = state => ({
  submitting: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  id: state.auth.user.id,
  submitError: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  changeUrl: link => dispatch(push(link))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);

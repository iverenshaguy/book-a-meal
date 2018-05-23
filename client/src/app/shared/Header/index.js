import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';

const mapStateToProps = state => ({
  type: state.router.location.pathname,
});

export default connect(mapStateToProps)(HeaderComponent);

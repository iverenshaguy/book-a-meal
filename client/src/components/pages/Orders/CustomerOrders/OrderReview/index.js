import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderReview from './OrderReview';
import { logout } from '../../../../../store/operations/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderReview);

import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderReview from '../../../../components/pages/Orders/CustomerOrders/OrderReview';
import { logout } from '../../../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderReview);

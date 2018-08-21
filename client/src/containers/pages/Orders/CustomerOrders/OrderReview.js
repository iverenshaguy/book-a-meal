import { connect } from 'react-redux';
import OrderReview from '../../../../components/pages/Orders/CustomerOrders/OrderReview';
import { logout } from '../../../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching
});


export default connect(mapStateToProps, { logout })(OrderReview);

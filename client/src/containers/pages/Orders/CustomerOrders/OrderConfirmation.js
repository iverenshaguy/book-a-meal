import { connect } from 'react-redux';
import OrderConfirmation from '../../../../components/pages/Orders/CustomerOrders/OrderConfirmation';
import { logout } from '../../../../actions/auth';
import { addOrder, editOrder } from '../../../../actions/orders';

const mapStateToProps = state => ({
  isFetching: state.isFetching
});

export default connect(mapStateToProps, { logout, addOrder, editOrder })(OrderConfirmation);

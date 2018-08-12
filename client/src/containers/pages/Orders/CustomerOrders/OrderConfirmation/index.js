import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderConfirmation from '../../../../../components/pages/Orders/CustomerOrders/OrderConfirmation';
import { logout } from '../../../../../actions/auth';
import { addOrder, editOrder } from '../../../../../actions/orders';

const mapStateToProps = state => ({
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout, addOrder, editOrder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);

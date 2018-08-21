import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CustomerOrderDetails from '../../../components/pages/OrderDetails/CustomerOrderDetails';
import { editOrder, cancelOrder } from '../../../actions/orders';
import { fetchOrder } from '../../../actions/singleOrder';
import { logout } from '../../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  order: state.singleOrder.item,
});

export default connect(mapStateToProps, {
  fetchOrder, logout, push, editOrder, cancelOrder
})(CustomerOrderDetails);

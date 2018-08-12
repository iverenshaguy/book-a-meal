import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import CustomerOrderDetails from '../../../../components/pages/OrderDetails/CustomerOrderDetails';
import { editOrder, cancelOrder } from '../../../../actions/orders';
import { fetchOrder } from '../../../../actions/singleOrder';
import { logout } from '../../../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  order: state.singleOrder.item,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrder, logout, push, editOrder, cancelOrder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderDetails);

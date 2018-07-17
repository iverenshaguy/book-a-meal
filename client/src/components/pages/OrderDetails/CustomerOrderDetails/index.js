import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import CustomerOrderDetails from './CustomerOrderDetails';
import { fetchOrders, editOrder, cancelOrder } from '../../../../store/operations/orders';
import { logout } from '../../../../store/operations/auth';
import { getOrderItem } from '../../../../store/selectors/orders';

const mapStateToProps = (state, props) => ({
  isFetching: state.isFetching,
  order: getOrderItem(props.match.params.id, state.orders.items),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrders, logout, push, editOrder, cancelOrder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderDetails);

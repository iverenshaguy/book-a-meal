import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Orders from './Orders';
import { fetchOrders, deliverOrder } from '../../../store/operations/orders';
import { logout } from '../../../store/operations/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  orders: state.orders.items,
  metadata: state.orders.metadata
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrders, deliverOrder, logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

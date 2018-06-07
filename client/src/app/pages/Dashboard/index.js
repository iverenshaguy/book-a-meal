import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import { fetchOrders, deliverOrder } from '../../../store/operations/orders';
import { logout } from '../../../store/operations/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  orders: state.orders.items,
  pendingOrders: state.orders.pendingOrders,
  totalCashEarned: state.orders.totalCashEarned
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrders, deliverOrder, logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import { connect } from 'react-redux';
import Dashboard from '../../components/pages/Dashboard';
import { fetchOrders, deliverOrder } from '../../actions/orders';

const mapStateToProps = state => ({
  orders: state.orders.items,
  pendingOrders: state.orders.pendingOrders,
  totalCashEarned: state.orders.totalCashEarned
});

export default connect(mapStateToProps, { fetchOrders, deliverOrder })(Dashboard);

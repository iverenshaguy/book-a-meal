import { connect } from 'react-redux';
import Orders from '../../../components/pages/Orders';
import { fetchOrders, deliverOrder } from '../../../actions/orders';
import { logout } from '../../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  orders: state.orders.items,
  metadata: state.orders.metadata
});

export default connect(mapStateToProps, { fetchOrders, deliverOrder, logout })(Orders);

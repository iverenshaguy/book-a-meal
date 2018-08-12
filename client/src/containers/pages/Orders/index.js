import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Orders from '../../../components/pages/Orders';
import { fetchOrders, deliverOrder } from '../../../actions/orders';
import { logout } from '../../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  orders: state.orders.items,
  metadata: state.orders.metadata
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrders, deliverOrder, logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

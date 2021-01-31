import { connect } from 'react-redux';
import Orders from '../../../components/pages/Orders';
import { fetchOrders, deliverOrder } from '../../../actions/orders';

const mapStateToProps = state => ({
  orders: state.orders.items,
  metadata: state.orders.metadata
});

export default connect(mapStateToProps, { fetchOrders, deliverOrder })(Orders);

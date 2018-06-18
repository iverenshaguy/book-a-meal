import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import CatererOrderDetails from './CatererOrderDetails';
import { fetchOrders, deliverOrder } from '../../../../store/operations/orders';
import { logout } from '../../../../store/operations/auth';
import { getOrderItem } from '../../../../store/selectors/orders';

const mapStateToProps = (state, props) => ({
  isFetching: state.isFetching,
  delivering: state.orders.delivering,
  order: getOrderItem(props.match.params.id, state.orders.items),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrders, deliverOrder, logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatererOrderDetails);

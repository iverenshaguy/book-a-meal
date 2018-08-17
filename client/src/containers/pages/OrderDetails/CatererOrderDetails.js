import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import CatererOrderDetails from '../../../components/pages/OrderDetails/CatererOrderDetails';
import { deliverOrder } from '../../../actions/orders';
import { fetchOrder } from '../../../actions/singleOrder';
import { logout } from '../../../actions/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  delivering: state.orders.delivering,
  order: state.singleOrder.item,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrder, deliverOrder, logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatererOrderDetails);

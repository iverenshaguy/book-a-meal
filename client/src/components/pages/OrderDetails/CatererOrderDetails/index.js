import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import CatererOrderDetails from './CatererOrderDetails';
import { deliverOrder } from '../../../../store/operations/orders';
import { fetchOrder } from '../../../../store/operations/singleOrder';
import { logout } from '../../../../store/operations/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  delivering: state.orders.delivering,
  order: state.singleOrder.item,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrder, deliverOrder, logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatererOrderDetails);

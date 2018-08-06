import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import CustomerOrderDetails from './CustomerOrderDetails';
import { editOrder, cancelOrder } from '../../../../store/operations/orders';
import { fetchOrder } from '../../../../store/operations/singleOrder';
import { logout } from '../../../../store/operations/auth';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  order: state.singleOrder.item,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrder, logout, push, editOrder, cancelOrder
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderDetails);

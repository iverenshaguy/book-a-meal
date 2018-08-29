import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CustomerOrderDetails from '../../../components/pages/OrderDetails/CustomerOrderDetails';
import { editOrder, cancelOrder } from '../../../actions/orders';
import { fetchOrder } from '../../../actions/singleOrder';

const mapStateToProps = state => ({
  order: state.singleOrder.item,
});

export default connect(mapStateToProps, {
  fetchOrder, push, editOrder, cancelOrder
})(CustomerOrderDetails);

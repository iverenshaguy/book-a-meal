import { connect } from 'react-redux';
import CatererOrderDetails from '../../../components/pages/OrderDetails/CatererOrderDetails';
import { deliverOrder } from '../../../actions/orders';
import { fetchOrder } from '../../../actions/singleOrder';

const mapStateToProps = state => ({
  delivering: state.orders.delivering,
  order: state.singleOrder.item,
});

export default connect(mapStateToProps, { fetchOrder, deliverOrder })(CatererOrderDetails);

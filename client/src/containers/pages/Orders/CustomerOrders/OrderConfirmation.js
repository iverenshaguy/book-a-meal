import { connect } from 'react-redux';
import OrderConfirmation from '../../../../components/pages/Orders/CustomerOrders/OrderConfirmation';
import { addOrder, editOrder } from '../../../../actions/orders';

export default connect(null, { addOrder, editOrder })(OrderConfirmation);

import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderConfirmation from './OrderConfirmation';
import { logout } from '../../../../../store/operations/auth';
import { addOrder } from '../../../../../store/operations/orders';

const mapStateToProps = state => ({
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout, addOrder,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);

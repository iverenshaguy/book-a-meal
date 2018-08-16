import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomerMenu from '../../../../components/pages/Menu/CustomerMenu';
import { logout } from '../../../../actions/auth';
import { fetchMenu } from '../../../../actions/menu';

const mapDispatchToProps = dispatch => bindActionCreators({
  logout, fetchMenu
}, dispatch);

export default connect(null, mapDispatchToProps)(CustomerMenu);

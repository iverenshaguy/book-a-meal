import { connect } from 'react-redux';
import CustomerMenu from '../../../../components/pages/Menu/CustomerMenu';
import { logout } from '../../../../actions/auth';
import { fetchMenu } from '../../../../actions/menu';

export default connect(null, { logout, fetchMenu })(CustomerMenu);

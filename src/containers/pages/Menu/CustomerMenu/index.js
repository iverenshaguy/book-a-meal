import { connect } from 'react-redux';
import CustomerMenu from '../../../../components/pages/Menu/CustomerMenu';
import { fetchMenu } from '../../../../actions/menu';

export default connect(null, { fetchMenu })(CustomerMenu);

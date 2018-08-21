import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SideNav from '../../../components/shared/SideNav';
import { toggleSideNav } from '../../../actions/ui';

const mapStateToProps = state => ({
  open: state.ui.sideNav.open
});

export default connect(mapStateToProps, { toggleSideNav, push })(SideNav);

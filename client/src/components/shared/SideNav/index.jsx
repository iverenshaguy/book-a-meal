import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import SideNav from './SideNav';
import { toggleSideNav } from '../../../store/actions/ui';

const mapStateToProps = state => ({
  open: state.ui.sideNav.open
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSideNav, push
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);

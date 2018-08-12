import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import CatererHeader from '../../../../components/shared/Header/CatererHeader';
import { toggleSideNav } from '../../../../actions/ui';

const mapStateToProps = state => ({
  currentDay: state.menu.currentDay
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSideNav
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatererHeader);

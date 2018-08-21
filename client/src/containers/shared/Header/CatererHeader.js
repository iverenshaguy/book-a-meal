import { connect } from 'react-redux';
import CatererHeader from '../../../components/shared/Header/CatererHeader';
import { toggleSideNav } from '../../../actions/ui';

const mapStateToProps = state => ({
  currentDay: state.menu.currentDay
});

export default connect(mapStateToProps, { toggleSideNav })(CatererHeader);

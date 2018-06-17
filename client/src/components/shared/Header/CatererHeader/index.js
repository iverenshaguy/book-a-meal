import { connect, } from 'react-redux';
import CatererHeader from './CatererHeader';

const mapStateToProps = state => ({
  currentDay: state.menu.currentDay
});

export default connect(mapStateToProps)(CatererHeader);

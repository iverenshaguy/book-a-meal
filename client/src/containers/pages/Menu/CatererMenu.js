import { connect } from 'react-redux';
import CatererMenu from '../../../components/pages/Menu/CatererMenu';
import { fetchMenu, setCurrentDay } from '../../../actions/menu';
import { toggleModal } from '../../../actions/ui';

const mapStateToProps = state => ({
  meals: state.menu.meals,
  currentDay: state.menu.currentDay,
  metadata: state.menu.metadata
});

export default connect(mapStateToProps, { fetchMenu, toggleModal, setCurrentDay })(CatererMenu);

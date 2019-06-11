import { connect } from 'react-redux';
import MenuItems from '../../../../components/pages/Menu/CustomerMenu/MenuItems';

const mapStateToProps = state => ({
  isFetching: state.menu.isFetching,
  meals: state.menu.meals,
  metadata: state.menu.metadata
});

export default connect(mapStateToProps)(MenuItems);

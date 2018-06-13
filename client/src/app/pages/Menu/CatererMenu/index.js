import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import CatererMenu from './CatererMenu';
import { fetchMenu } from '../../../../store/operations/menu';
import { logout } from '../../../../store/operations/auth';
import { toggleModal } from '../../../../store/actions/ui';

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  meals: state.menu.meals,
  submitting: state.menu.working,
  submitError: state.menu.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout, fetchMenu, toggleModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatererMenu);

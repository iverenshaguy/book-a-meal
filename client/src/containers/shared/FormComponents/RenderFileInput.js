import { connect } from 'react-redux';
import RenderFileInput from '../../../components/shared/FormComponents/RenderFileInput';
import { uploadImage, clearUploadError } from '../../../actions/uploadImage';

const mapStateToProps = state => ({
  uploadError: state.uploadImage.error,
  uploading: state.uploadImage.uploading,
});

export default connect(mapStateToProps, { uploadImage, clearUploadError })(RenderFileInput);

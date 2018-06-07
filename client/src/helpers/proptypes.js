import PropTypes from 'prop-types';
import { arrayToObject } from '../utils';
import formHelpers from './formHelpers';

const { formFields } = formHelpers;

const customerPropTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
  }).isRequired
};

const catererPropTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    businessName: PropTypes.string,
    businessAddress: PropTypes.string,
    businessPhoneNo: PropTypes.string,
    email: PropTypes.string
  }).isRequired
};

const authPropTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.shape({
      from: PropTypes.shape({
        hash: PropTypes.string,
        key: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string
      })
    })
  }).isRequired
};

const urlMatchPropTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.any
  }).isRequired,
};

const formPropTypes = type => ({
  type: PropTypes.string.isRequired,
  state: PropTypes.shape({
    values: PropTypes.shape(arrayToObject(formFields[type], PropTypes.string)),
    touched: PropTypes.shape(arrayToObject(formFields[type], PropTypes.bool)),
    error: PropTypes.shape(arrayToObject(formFields[type], PropTypes.string)),
    pristine: PropTypes.bool,
    formValid: PropTypes.bool,
    asyncValidating: PropTypes.bool
  }).isRequired,
  handlers: PropTypes.shape({
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func,
    handleSubmit: PropTypes.func
  }).isRequired
});

const renderFormFieldPropTypes = {
  id: PropTypes.string.isRequired,
  rows: PropTypes.number,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any,
    asyncValidating: PropTypes.any
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
};

export default {
  authPropTypes,
  formPropTypes,
  catererPropTypes,
  customerPropTypes,
  urlMatchPropTypes,
  renderFormFieldPropTypes
};

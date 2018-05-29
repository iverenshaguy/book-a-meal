import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SigninForm from './SigninForm';
import CustomerSignupForm from './CustomerSignupForm';
import CatererSignupForm from './CatererSignupForm';
import MiniPreLoader from '../Preloader/MiniPreloader';
import { formHelpers, getTouchedFields, formErrorCount } from '../../../helpers';
import { arrayToObject } from '../../../utils';
import { syncValidate, validateRequiredFields } from '../../../helpers/validations';

/**
 * @exports
 * @class FormComponent
 * @extends Component
 * @returns {component} Form
 */
class FormComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitError: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      btnText: PropTypes.string,
      extra: PropTypes.element
    }).isRequired
  };

  static defaultProps = {
    submitError: null
  }

  /**
   * @constructor
   * @memberof Form
   * @param {object} props - props
   * @returns {nothing} Return nothing
   */
  constructor(props) {
    super(props);

    const { type } = props;
    const { formFields } = formHelpers;
    const fields = formFields[type];
    const values = arrayToObject(fields, '');

    if (type === 'catererSignup') values.role = 'caterer';
    if (type === 'customerSignup') values.role = 'customer';

    this.state = {
      type,
      values,
      touched: arrayToObject(fields, false),
      error: arrayToObject(fields, null),
      pristine: true,
      formValid: false,
      asyncValidating: false
    };
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  componentWillMount = () => {
    this.clearFormErrors();
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  clearFormErrors = () => {
    const { type } = this.state;
    const { clearFormError } = formHelpers;

    this.props.dispatch(clearFormError[type]);
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState(prevState => ({
      values: { ...prevState.values, [name]: value },
      touched: { ...prevState.touched, [name]: true },
      pristine: false,
    }), this.validateForm);
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleFocus = (event) => {
    const { target } = event;
    const { name } = target;

    this.setState(prevState => ({
      error: { ...prevState.error, [name]: null }
    }), () => this.clearFormErrors());
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleBlur = (event) => {
    const { target } = event;
    const { name } = target;

    this.setState(prevState => ({
      touched: { ...prevState.touched, [name]: true },
    }), () => { this.validateField(name); });
  }

  /**
   * @memberof Form
   * @param {string} name
   * @param {string} value
   * @returns {nothing} Returns nothing
   */
  validateField = (name) => {
    const { type } = this.state;
    const error = syncValidate(type)(name, this.state.values);
    const errorValue = error || null;

    this.setState(prevState => ({
      error: { ...prevState.error, [name]: errorValue }
    }), this.validateForm);
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  validateForm = () => {
    const formErrorArrayLength = formErrorCount(this.state.error);
    const touchedFields = getTouchedFields(this.state.touched);
    const { requiredFormFields } = formHelpers;
    const { type } = this.props;
    const requiredFields = requiredFormFields[type];

    if (formErrorArrayLength) {
      this.setState({
        formValid: false
      });
    } else if (!formErrorArrayLength &&
      validateRequiredFields(touchedFields, requiredFields, this.state.values)) {
      this.setState({
        formValid: true
      });
    }
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  submitter = () => {
    const { type } = this.state;
    const { formSubmitMapper } = formHelpers;
    const { values } = this.state;

    return formSubmitMapper[type](values);
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleSubmit = (event) => {
    event.preventDefault();

    return this.props.dispatch(this.submitter());
  }

  /**
   * @memberof Form
   * @returns {JSX} Form
   */
  renderForm = () => {
    const { type } = this.props;
    const formState = { ...this.state };

    const handlers = {
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
      handleSubmit: this.handleSubmit
    };

    switch (type) {
      case 'customerSignup':
        return <CustomerSignupForm type={type} state={formState} handlers={handlers} />;
      case 'catererSignup':
        return <CatererSignupForm type={type} state={formState} handlers={handlers} />;
      default:
        return <SigninForm type={type} state={formState} handlers={handlers} />;
    }
  }

  /**
   * @memberof Form
   * @returns {component} Form
   */
  render() {
    const { pristine, formValid } = this.state;
    const { submitting, submitError, meta: { btnText, extra } } = this.props;
    const requiredTextArray = ['catererSignup', 'customerSignup'];

    return (
      <div>
        {submitting &&
          <div className="modal-preloader text-center"><MiniPreLoader /></div>}
        {!submitting &&
          <Fragment>
            {requiredTextArray.includes(this.props.type) &&
            <p className="text-muted mx-auto text-center">
                Fields marked
              <span className="danger"> *</span> are required
            </p>}
            <form onSubmit={this.handleSubmit}>
              {submitError && (
              <p className="danger text-center mb-0">{submitError}</p>
              )}
              {this.renderForm()}
              <button
                className="btn btn-pri btn-block"
                disabled={!formValid || !!pristine || !!submitting}
              >
                {btnText}
              </button>
            </form>
            {extra && extra}
          </Fragment>}
      </div>);
  }
}

export default FormComponent;

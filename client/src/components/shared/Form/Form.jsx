import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SigninForm from './SigninForm';
import CustomerSignupForm from './CustomerSignupForm';
import CatererSignupForm from './CatererSignupForm';
import MealForm from './MealForm';
import MiniPreloader from '../Preloader/MiniPreloader';
import { formHelpers, formErrorCount } from '../../../helpers';
import { arrayToObject } from '../../../utils';
import { syncValidate, validateRequiredFields } from '../../../helpers/validations';
import { mealObjPropTypes } from '../../../helpers/proptypes';
import { editMeal } from '../../../store/operations/meals';

/**
 * @exports
 * @class Form
 * @extends Component
 * @returns {component} Form
 */
class Form extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitError: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      btnText: PropTypes.string,
      extra: PropTypes.element
    }).isRequired,
    meal: mealObjPropTypes,
  };

  static defaultProps = {
    submitError: null,
    meal: null
  }

  /**
   * @static
   * @memberof Auth
   * @param {object} props
   * @param {object} state
   * @returns {nothing} nothing
   */
  static getDerivedStateFromProps(props, state) {
    if (props.type !== state.type) {
      let values;
      const { type, meal } = props;
      const { formFields } = formHelpers;
      const fields = formFields[type];
      values = arrayToObject(fields, '');


      if (fields.includes('vegetarian')) values.vegetarian = false;
      if (type === 'editMeal') values = meal;
      if (type === 'catererSignup') values.role = 'caterer';
      if (type === 'customerSignup') values.role = 'customer';

      return {
        type,
        values,
        touched: arrayToObject(fields, false),
        error: arrayToObject(fields, null),
        pristine: true,
        formValid: false,
        asyncValidating: false
      };
    }

    return state;
  }

  state = {
    type: ''
  }

  /**
   * @memberof Form
   * @returns {void}
   */
  componentDidMount = () => {
    this.clearFormErrors();
    this.validateForm();
  }

  /**
   * @memberof Form
   * @returns {void}
   */
  clearFormErrors = () => {
    const { type } = this.props;
    const { clearFormError } = formHelpers;

    this.props.dispatch(clearFormError[type]);
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {void}
   */
  handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(prevState => ({
      values: { ...prevState.values, [name]: value },
      touched: { ...prevState.touched, [name]: true },
      pristine: false,
    }), this.validateForm);
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {void}
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
   * @returns {void}
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
   * @returns {void}
   */
  validateField = (name) => {
    const { type } = this.props;
    const error = syncValidate(type)(name, this.state.values);
    const errorValue = error || null;

    this.setState(prevState => ({
      error: { ...prevState.error, [name]: errorValue }
    }), this.validateForm);
  }

  /**
   * @memberof Form
   * @returns {void}
   */
  validateForm = () => {
    const formErrorArrayLength = formErrorCount(this.state.error);
    const { requiredFormFields } = formHelpers;
    const { type } = this.props;
    const requiredFields = requiredFormFields[type];

    if (formErrorArrayLength) {
      this.setState({
        formValid: false
      });
    } else if (!formErrorArrayLength &&
      validateRequiredFields(requiredFields, this.state.values)) {
      this.setState({
        formValid: true
      });
    }
  }

  /**
   * @memberof Form
   * @returns {void}
   */
  submitter = () => {
    const { values } = this.state;
    const { type } = this.props;
    const { formSubmitMapper } = formHelpers;
    const { meal } = this.props;

    switch (type) {
      case 'editMeal':
        delete values.imageURL;
        return formSubmitMapper[type](meal.id, values, true);
      default:
        return formSubmitMapper[type](values);
    }
  }

  /**
   * @memberof Form
   * @param {string} id
   * @param {object} mealObj
   * @returns {void}
   */
  updateMealImage = (id, mealObj) => this.props.dispatch(editMeal(id, mealObj, false))

  /**
   * @memberof Form
   * @param {object} event
   * @returns {void}
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
    const { type, submitting, meal } = this.props;
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
      case 'addMeal':
        return <MealForm type={type} state={formState} handlers={handlers} />;
      case 'editMeal':
        return (<MealForm
          editMeal={this.updateMealImage}
          updating={submitting}
          meal={meal}
          type={type}
          state={formState}
          handlers={handlers}
        />);
      default:
        return <SigninForm type={type} state={formState} handlers={handlers} />;
    }
  }

  /**
   * @memberof Form
   * @returns {component} Form
   */
  render() {
    const { formValid } = this.state;
    const { submitting, submitError, meta: { btnText, extra } } = this.props;
    const requiredTextArray = ['catererSignup', 'customerSignup', 'addMeal', 'editMeal'];

    return (
      <div>
        {submitting && <div className="modal-preloader text-center"><MiniPreloader /></div>}
        {!submitting &&
          <Fragment>
            {requiredTextArray.includes(this.props.type) &&
              <p className="text-muted mx-auto text-center">
                Fields marked
                <span className="danger"> *</span> are required
              </p>}
            <form onSubmit={this.handleSubmit}>
              {submitError && <p className="danger text-center mb-0">{submitError}</p>}
              {this.renderForm()}
              <button className="btn btn-pri btn-block" disabled={!formValid || !!submitting}>
                {btnText}
              </button>
            </form>
            {extra && extra}
          </Fragment>}
      </div>);
  }
}

export default Form;

import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userPropTypes } from '../../../../../helpers/proptypes';
import getOrderFromLocalStorage from '../../../../../helpers/getOrderFromLocalStorage';
import { syncValidate, validateRequiredFields } from '../../../../../helpers/validations';
import formErrorCounter from '../../../../../helpers/formErrorCount';
import updateLocalStorageOrder from '../../../../../helpers/updateLocalStorageOrder';
import View from '../../../../shared/View';
import RenderInput from '../../../../shared/FormComponents/RenderInput';

/**
 * @exports
 * @class OrderReview
 * @extends Component
 * @classdesc Creates OrderReview Component
 * @returns {JSX} OrderReview Component
 */
class OrderReview extends Component {
  static propTypes = {
    ...userPropTypes,
    logout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  /**
   * @constructor
   * @memberof OrderReview
   * @param {object} props
   * @returns {JSX} OrderReview Component
   */
  constructor(props) {
    super();

    const storedOrder = JSON.parse(localStorage.getItem('bookamealorder'));

    this.state = {
      showOrderSummary: false,
      order: getOrderFromLocalStorage(props.user),
      errors: {
        number: null,
        address: null
      },
      values: {
        number: (storedOrder && storedOrder.order.number) || '',
        address: (storedOrder && storedOrder.order.address) || '',
      }
    };
  }

  /**
   * @memberof OrderReview
   * @param {object} event
   * @returns {func} this.updateStateFormValues
  */
  handleInputChange = event => this.updateStateFormValues(event)

  /**
   * @memberof OrderReview
   * @param {object} event
   *  @returns {func} this.clearFormError
  */
  handleFocus = (event) => {
    const { name } = event.target;
    this.setState(prevState => ({
      touched: { ...prevState.touched, [name]: true }
    }), () => this.clearFormError(name));
  }

  /**
   * @memberof OrderReview
   * @param {string} event
   * @returns {func} this.validateField
  */
  handleBlur = event => this.validateField(event.target.name)

  /**
   * @memberof OrderReview
   * @returns {func} this.setState
  */
  toggleOrderSummary = () =>
    this.setState(prevState => ({ showOrderSummary: !prevState.showOrderSummary }));

  /**
   * @memberof OrderReview
   * @param {object} event
   * @returns {func} this.setState
  */
  updateStateFormValues = (event) => {
    const { target } = event;
    const { name } = target;
    const { order, values } = this.state;

    return this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: target.value
      }
    }), () => updateLocalStorageOrder(this.props.user.id, order, {
      ...values, [name]: target.value
    }));
  }

  /**
   * @memberof OrderReview
   * @param {string} name
   * @returns {func} this.setState
  */
  clearFormError = name => this.setState(prevState => ({
    formError: '',
    errors: {
      ...prevState.errors,
      [name]: null
    }
  }))

  /**
   * @memberof OrderReview
   * @param {string} name
   * @returns {func} this.setState
  */
  validateField = (name) => {
    const errors = syncValidate('reviewOrder')(name, this.state.values);
    const errorValue = errors || null;

    return this.setState(prevState => ({
      errors: { ...prevState.errors, [name]: errorValue }
    }));
  }

  /**
   * @memberof OrderReview
   * @returns {func} this.setState
  */
  validateForm = () => {
    const allFilled = validateRequiredFields(['number', 'address'], this.state.values);
    const formErrorCount = formErrorCounter(this.state.errors);

    Object.keys(this.state.values).forEach(field => this.validateField(field));

    return !formErrorCount && allFilled;
  }

  /**
   * @memberof OrderReview
   * @param {object} event
   * @returns {func} this.toggleOrderSummary
  */
  handleOrderDetailsSubmit = () => {
    const formValid = this.validateForm();
    if (formValid) return this.toggleOrderSummary();
    return null;
  }

  /**
   * @memberof OrderReview
   * @returns {JSX} Delivery Details Component
  */
  renderInputFields = () => (
    <Fragment>
      <RenderInput
        type="number"
        name="number"
        id="number"
        label="Phone Number"
        required
        value={this.state.values.number}
        placeholder=""
        handleChange={this.handleInputChange}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        meta={{ touched: true, error: this.state.errors.number }}
      />
      <RenderInput
        type="address"
        name="address"
        id="address"
        label="Delivery Address"
        required
        value={this.state.values.address}
        placeholder=""
        handleChange={this.handleInputChange}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        meta={{ touched: true, error: this.state.errors.address }}
      />
    </Fragment>
  );

  /**
   * @memberof OrderReview
   * @returns {JSX} Delivery Details Component
  */
  renderDeliveryDetails = () => (
    <div>
      <h2>Delivery Details</h2>
      <hr />
      <div className="delivery-details">
        <p className="text-center" style={{ marginBottom: '30px' }}>Please fill in your details below. Both fields are required.</p>
        {this.renderInputFields()}
      </div>
      <div className="control-btns">
        <Link to="/" href="/">
          <button className="btn btn-sec" type="button">Back</button>
        </Link>
        <button className="btn btn-sec" type="submit" onClick={this.handleOrderDetailsSubmit}>Next</button>
      </div>
    </div>
  );

  /**
   * @memberof OrderReview
   * @returns {JSX} OrderReview Component
  */
  render() {
    const { user, logout, isFetching } = this.props;

    if (this.state.order.length === 0) return <Redirect to="/" />;
    if (this.state.showOrderSummary) return <Redirect to="/order-confirmation" />;

    return (
      <View user={user} logout={logout} type="orderReview" isFetching={isFetching}>
        <div className="order-confirmation">
          {this.renderDeliveryDetails()}
        </div>
      </View>
    );
  }
}

export default OrderReview;

import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { userPropTypes } from '../../../../helpers/proptypes';
import getOrderFromLocalStorage from '../../../../helpers/getOrderFromLocalStorage';
import { syncValidate, validateRequiredFields } from '../../../../helpers/validations';
import formErrorCounter from '../../../../helpers/formErrorCount';
import updateLocalStorageOrder from '../../../../helpers/updateLocalStorageOrder';
import View from '../../../../containers/shared/View';
import RenderInput from '../../../shared/FormComponents/RenderInput';

/**
 * @exports
 * @class OrderReview
 * @extends Component
 * @classdesc Creates OrderReview Component
 * @returns {JSX} OrderReview Component
 */
class OrderReview extends Component {
  static propTypes = {
    ...userPropTypes
  }

  /**
   * @constructor
   * @memberof OrderReview
   * @param {object} props
   * @returns {JSX} OrderReview Component
   */
  constructor(props) {
    super();

    const storedOrder = getOrderFromLocalStorage(props.user);

    this.state = {
      showOrderSummary: false,
      order: storedOrder,
      errors: {
        deliveryPhoneNo: null,
        deliveryAddress: null
      },
      values: {
        deliveryPhoneNo: props.user.phoneNo || '',
        deliveryAddress: props.user.address || '',
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
    this.clearFormError(name);
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
  toggleOrderSummary = () => this.setState(prevState => (
    { showOrderSummary: !prevState.showOrderSummary }
  ));

  /**
   * @memberof OrderReview
   * @param {object} event
   * @returns {func} this.setState
  */
  updateStateFormValues = (event) => {
    const { target } = event;
    const { name } = target;
    const { order, values } = this.state;
    const { user } = this.props;

    return this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: target.value
      }
    }), () => updateLocalStorageOrder(user.id, {
      ...order, ...values, [name]: target.value
    }));
  }

  /**
   * @memberof OrderReview
   * @param {string} name
   * @returns {func} this.setState
  */
  clearFormError = name => this.setState(prevState => ({
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
    const { values } = this.state;
    const errors = syncValidate('reviewOrder')(name, values);
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
    const { values, errors } = this.state;
    const allFilled = validateRequiredFields(['deliveryPhoneNo', 'deliveryAddress'], values);
    const formErrorCount = formErrorCounter(errors);

    Object.keys(values).forEach(field => this.validateField(field));

    return !formErrorCount && allFilled;
  }

  /**
   * @memberof OrderReview
   * @param {object} event
   * @returns {func} this.toggleOrderSummary
  */
  handleOrderDetailsSubmit = () => {
    const { order, values } = this.state;
    const { user } = this.props;

    updateLocalStorageOrder(user.id, {
      ...order, ...values
    });

    const formValid = this.validateForm();
    if (formValid) return this.toggleOrderSummary();
    return null;
  }

  /**
   * @memberof OrderReview
   * @returns {JSX} Delivery Details Component
  */
  renderInputFields = () => {
    const { values, errors } = this.state;

    return (
      <Fragment>
        <RenderInput
          type="tel"
          name="deliveryPhoneNo"
          id="deliveryPhoneNo"
          label="Phone Number (in the format 080xxxxxxxx)"
          required
          value={values.deliveryPhoneNo}
          placeholder=""
          handleChange={this.handleInputChange}
          handleBlur={this.handleBlur}
          handleFocus={this.handleFocus}
          meta={{ touched: true, error: errors.deliveryPhoneNo }}
        />
        <RenderInput
          type="textarea"
          name="deliveryAddress"
          id="deliveryAddress"
          label="Delivery Address"
          required
          value={values.deliveryAddress}
          placeholder=""
          handleChange={this.handleInputChange}
          handleBlur={this.handleBlur}
          handleFocus={this.handleFocus}
          meta={{ touched: true, error: errors.deliveryAddress }}
        />
      </Fragment>
    );
  }

  /**
   * @memberof OrderReview
   * @returns {JSX} Delivery Details Component
  */
  renderDeliveryDetails = () => (
    <div>
      <h2>Delivery Details</h2>
      <hr />
      <div className="delivery-details">
        <p className="text-center" style={{ marginBottom: '30px' }}>Please fill in or confirm your details below.</p>
        {this.renderInputFields()}
      </div>
      <div className="control-btns">
        <Link to="/">
          <button className="btn btn-sec" type="button">Keep Shopping</button>
        </Link>
        <button className="btn btn-sec" type="submit" onClick={this.handleOrderDetailsSubmit}>Continue</button>
      </div>
    </div>
  );

  /**
   * @memberof OrderReview
   * @returns {JSX} OrderReview Component
  */
  render() {
    const { order, showOrderSummary } = this.state;
    if (order.meals.length === 0) return <Redirect to="/" />;
    if (showOrderSummary) return <Redirect to="/order-confirmation" />;

    return (
      <View type="orderReview">
        <div className="order-confirmation">
          {this.renderDeliveryDetails()}
        </div>
      </View>
    );
  }
}

export default OrderReview;

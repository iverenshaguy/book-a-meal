import PropTypes from 'prop-types';
import { arrayToObject } from '.';
import { formFields } from './formHelpers';

export const userPropType = PropTypes.shape({
  id: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  businessName: PropTypes.string,
  address: PropTypes.string,
  phoneNo: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
});

export const userPropTypes = {
  user: userPropType.isRequired
};

export const orderMealPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  vegetarian: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  quantity: PropTypes.number,
  delivered: PropTypes.bool,
});

export const customerOrderMealPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  vegetarian: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  caterer: PropTypes.shape({
    businessName: PropTypes.string,
    address: PropTypes.string,
    phoneNo: PropTypes.string,
    email: PropTypes.string
  }),
  quantity: PropTypes.number,
  delivered: PropTypes.bool,
});

export const orderItemPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  quantity: PropTypes.number,
});

export const catererOrderObjPropTypes = PropTypes.shape({
  id: PropTypes.string,
  deliveryAddress: PropTypes.string,
  deliveryPhoneNo: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  customer: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string
  }),
  meals: PropTypes.arrayOf(orderMealPropTypes)
});

export const customerOrderObjPropTypes = PropTypes.shape({
  id: PropTypes.string,
  deliveryAddress: PropTypes.string,
  deliveryPhoneNo: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  meals: PropTypes.arrayOf(customerOrderMealPropTypes)
});

export const catererOrdersObjPropTypes = {
  orders: PropTypes.arrayOf(catererOrderObjPropTypes).isRequired,
  pendingOrders: PropTypes.number.isRequired,
  totalCashEarned: PropTypes.number.isRequired
};

export const customerOrdersObjPropTypes = {
  orders: PropTypes.arrayOf(customerOrderObjPropTypes).isRequired,
  pendingOrders: PropTypes.number.isRequired
};

export const authPropTypes = {
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

export const urlMatchPropTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    isExact: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    params: PropTypes.any
  }).isRequired,
};

export const mealObjPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  vegetarian: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});

export const formPropTypes = type => ({
  type: PropTypes.string.isRequired,
  state: PropTypes.shape({
    values: PropTypes.shape(arrayToObject(
      formFields[type],
      PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
    )),
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

export const renderFormFieldPropTypes = {
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
    // eslint-disable-next-line react/forbid-prop-types
    error: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    asyncValidating: PropTypes.any
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
};

export const metadataProps = PropTypes.shape({
  page: PropTypes.number,
  totalItems: PropTypes.number,
  prev: PropTypes.string,
  next: PropTypes.string,
});

export const metadataPropTypes = {
  metadata: metadataProps.isRequired
};

export default {
  authPropTypes,
  formPropTypes,
  userPropType,
  userPropTypes,
  metadataProps,
  metadataPropTypes,
  mealObjPropTypes,
  urlMatchPropTypes,
  orderMealPropTypes,
  orderItemPropTypes,
  renderFormFieldPropTypes,
  catererOrderObjPropTypes,
  customerOrderObjPropTypes,
  catererOrdersObjPropTypes,
  customerOrdersObjPropTypes
};

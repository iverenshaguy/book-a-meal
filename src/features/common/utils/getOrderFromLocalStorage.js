import moment from 'moment';

/**
 * Get User Order From Local Storage
 * @function getOrderFromLocalStorage
 * @param {object} user
 * @returns {array} order
*/
const getOrderFromLocalStorage = (user) => {
  const emptyOrder = {
    id: null,
    meals: [],
    deliveryAddress: '',
    deliveryPhoneNo: ''
  };

  if (localStorage.getItem('bookamealorder')) {
    const storedObj = JSON.parse(localStorage.getItem('bookamealorder'));

    if (storedObj.order && storedObj.userId === user.id && moment().format('YYYY-MM-DD') === storedObj.date) {
      return storedObj.order;
    }

    return emptyOrder;
  }

  return emptyOrder;
};

export default getOrderFromLocalStorage;

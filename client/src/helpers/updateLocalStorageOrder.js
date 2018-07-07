import moment from 'moment';

/**
 * Update User Order in Local Storage
 * @function updateLocalStorageOrder
 * @param {string} userId
 * @param {array} items
 * @param {object} deliveryDetails
 * @returns {nothing} nothing
*/
const updateLocalStorageOrder = (userId, items, { number, address }) => {
  localStorage.setItem('bookamealorder', JSON.stringify({
    userId,
    order: { items, number, address },
    date: moment().format('YYYY-MM-DD')
  }));
};

export default updateLocalStorageOrder;

import moment from 'moment';

/**
 * Update User Order in Local Storage
 * @function updateLocalStorageOrder
 * @param {string} userId
 * @param {object} order
 * @returns {void}
*/
const updateLocalStorageOrder = (userId, order) => {
  localStorage.setItem('bookamealorder', JSON.stringify({
    userId,
    order,
    date: moment().format('YYYY-MM-DD')
  }));
};

export default updateLocalStorageOrder;

/**
 * Returns index of the item to edit
 * @function getItemIndex
 * @param {object} items
 * @param {object} payload
 * @returns {number} Number of errors
 */
const getItemIndex = (items, payload) => payload && items.findIndex(item => item.id === payload.id);

export default getItemIndex;

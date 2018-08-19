/**
 * Returns index of the item to edit
 * @function getItemIndex
 * @param {object} items
 * @param {object} itemToFind
 * @returns {number} Number of errors
 */
const getItemIndex = (items, itemToFind) =>
  itemToFind && items.findIndex(item => item.id === itemToFind.id);

export default getItemIndex;

import getItemIndex from './getItemIndex';

/**
 * Returns new array of items after updating an item
 * @function getUpdatedItems
 * @param {object} items
 * @param {object} payload
 * @returns {number} Number of errors
 */
const getUpdatedItems = (items, payload) => {
  const itemIndex = getItemIndex(items, payload);

  return [
    ...items.slice(0, itemIndex),
    {
      ...items[itemIndex],
      ...payload
    },
    ...items.slice(itemIndex + 1)
  ];
};

export default getUpdatedItems;

import getItemIndex from './getItemIndex';

/**
 * Returns new array of items after updating an item
 * @function getUpdatedItems
 * @param {object} items
 * @param {object} updatedItem
 * @returns {number} Number of errors
 */
const getUpdatedItems = (items, updatedItem) => {
  const itemIndex = getItemIndex(items, updatedItem);

  return [
    ...items.slice(0, itemIndex),
    {
      ...items[itemIndex],
      ...updatedItem
    },
    ...items.slice(itemIndex + 1)
  ];
};

export default getUpdatedItems;

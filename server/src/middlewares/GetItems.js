import Pagination from './Pagination';


/**
 * @exports
 * @class GetItems
 * @classdesc Constructs a List of Items
 */
class GetItems {
  /**
   * @method items
   * @memberof GetItems
   * @param {object} req
   * @param {object} res
   * @param {array} items
   * @param {string} type
   * @returns {json} Returns JSON object
   */
  static items(req, res, items, type) {
    const { limit, page } = req.query;
    const pagination = new Pagination(type, items, limit, page);

    if (items.length === 0) {
      return res.status(200).json({ [type]: [] });
    }

    return pagination.paginateItems(res);
  }
}

export default GetItems;

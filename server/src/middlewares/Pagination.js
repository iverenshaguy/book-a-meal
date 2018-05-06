/**
 * @exports
 * @class
 * @classdesc - Pagination Class
 */
class Pagination {
  /**
   * @constructor
   * @param {string} type
   * @param {array} items
   * @param {number} limit
   * @param {number} page
   */
  constructor(type, items, limit = 5, page = 1) {
    this.type = type;
    this.items = items;
    this.totalItems = items.length;
    this.limit = parseInt(limit, 10);
    this.currentPage = parseInt(page, 10);
    this.totalPages = Math.ceil(this.totalItems / this.limit);
    this.nextPage = (this.currentPage >= this.totalPages) ? this.totalPages : this.currentPage + 1;
    this.prevPage = (this.currentPage <= 1) ? 1 : this.currentPage - 1;
    this.getItemsForPage = this.getItemsForPage.bind(this);
    this.paginateItems = this.paginateItems.bind(this);
  }

  /**
   * Gets the items for current page
   * @method getItemsForPage
   * @memberof Pagination
   * @return {object} - an object that contains items and metadata for the page
   */
  getItemsForPage() {
    // check that page is within range
    // normalize if not within range
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    if (this.currentPage < 1) {
      this.currentPage = 1;
      this.prevPage = 1;
    }

    // eg offset for page 2, limit 5 is 5 meaning index 5 and item 6
    const offset = (this.currentPage - 1) * this.limit;
    // e.g in the exmaple above, items 6 - 10, since the last index is usually excluded
    const paginatedItems = this.items.slice(offset, offset + this.limit);

    return {
      itemsByPage: paginatedItems,
      metadata: {
        totalCount: this.totalItems,
        itemsPerPage: paginatedItems.length,
        page: this.currentPage,
        prevPage: this.prevPage,
        nextPage: this.nextPage
      }
    };
  }

  /**
   * Pagination Middleware for Lists
   * @method paginateItems
   * @memberof Pagination
   * @param {object} res
   * @return {object} - an object that contains items and metadata for the page
   */
  paginateItems(res) {
    const { itemsByPage, metadata } = this.getItemsForPage();

    return res.status(200).send({ [this.type]: itemsByPage, metadata });
  }
}

export default Pagination;

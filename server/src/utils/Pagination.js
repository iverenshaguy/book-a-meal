/**
 * @class
 * @classdesc - Pagination Class
 */
class Pagination {
  /**
   * @constructor
   * @memberof Pagination
   * @param {number|string} page
   * @param {number|string} limit
   */
  constructor(page = 1, limit = 10) {
    this.page = parseInt(page, 10);
    this.limit = parseInt(limit, 10);
  }

  /**
   * @memberof Pagination
   * @param {number} page
   * @return {object} - an object that returns query metadata for the page
   */
  getQueryMetadata() {
    return { limit: this.limit, offset: this.limit * (this.page - 1) };
  }

  /**
   * @memberof Pagination
   * @param {array} totalItems
   * @param {string} baseUrl
   * @param {string} extraQuery
   * @return {object} - an object that returns page metadata
   */
  getPageMetadata(totalItems, baseUrl, extraQuery) {
    const { page, limit } = this;

    const pages = Math.ceil(totalItems / limit);

    const prev = page <= 1 ? undefined : `${baseUrl}?${extraQuery ? `${extraQuery}&` : ''}page=${page - 1}&limit=${limit}`;
    const next = page >= pages ? undefined : `${baseUrl}?${extraQuery ? `${extraQuery}&` : ''}page=${page + 1}&limit=${limit}`;

    return {
      prev,
      next,
      pages,
      totalItems,
    };
  }
}

export default Pagination;

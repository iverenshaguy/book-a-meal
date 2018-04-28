import sinon from 'sinon';
import { assert, expect } from 'chai';
import mealsDB from '../../s../../data/meals.json';
import Pagination from '../../src/middlewares/Pagination';

// mock server response
const res = {
  headersSent: false,
  status: status => ({
    send: message => ({ status, message })
  })
};
const status = sinon.spy(res, 'status');
const pagination = new Pagination('meals', mealsDB, 5, 2);

describe('Pagination Handler', () => {
  it('creates a new instance', () => {
    expect(pagination).to.be.instanceOf(Pagination);
    expect(pagination.type).to.equal('meals');
  });

  it('creates an array of pages', () => {
    const pagesArray = pagination.listPages();

    expect(pagesArray).to.be.an('array');
    expect(pagesArray).to.deep.equal([1, 2]);
  });

  it('gets items per page when limit and page are set', () => {
    const pagesObj = pagination.getItemsForPage();

    expect(pagesObj).to.be.an('object');
    expect(pagesObj).to.include.keys('itemsByPage');
    expect(pagesObj).to.include.keys('metadata');
    expect(pagesObj.itemsByPage.length).to.equal(5);
    expect(pagesObj.metadata).to.deep.equal({
      pages: [1, 2],
      totalCount: 10,
      itemsPerPage: 5,
      page: 2,
      lastPage: 2,
      firstPage: 1
    });
  });

  it('gets items per page with default limit and page when limit and page are not set', () => {
    const paginationDefault = new Pagination('meals', mealsDB);
    const pagesObj = paginationDefault.getItemsForPage();

    expect(pagesObj).to.be.an('object');
    expect(pagesObj).to.include.keys('itemsByPage');
    expect(pagesObj).to.include.keys('metadata');
    expect(pagesObj.itemsByPage.length).to.equal(5);
    expect(pagesObj.metadata).to.deep.equal({
      pages: [1, 2],
      totalCount: 10,
      itemsPerPage: 5,
      page: 1,
      lastPage: 2,
      firstPage: 1
    });
  });

  it('sets currentPage to lastpage when current page is larger than total pages', () => {
    const paginationLarge = new Pagination('meals', mealsDB, 5, 3);
    const pagesObj = paginationLarge.getItemsForPage();

    expect(pagesObj.metadata.lastPage).to.equal(2);
  });

  it('sets currentPage to firstpage when current page is less than total pages', () => {
    const paginationLarge = new Pagination('meals', mealsDB, 5, 0.5);
    const pagesObj = paginationLarge.getItemsForPage();

    expect(pagesObj.metadata.firstPage).to.equal(1);
  });

  it('paginates and sends items', () => {
    pagination.paginateItems(res);

    assert(status.calledWith(200));
  });
});

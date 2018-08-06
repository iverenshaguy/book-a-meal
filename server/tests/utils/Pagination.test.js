import { expect } from 'chai';
import Pagination from '../../src/utils/Pagination';

const paginate = new Pagination(2, 5);

describe('Pagination', () => {
  it('returns query metadata', () => {
    const metadata = paginate.getQueryMetadata();

    expect(metadata.limit).to.equal(5);
    expect(metadata.offset).to.equal(5);
  });

  it('returns page metadata without extra query if there is no extra query', () => {
    const metadata = paginate.getPageMetadata(22, '/url');

    expect(metadata.prev).to.equal('/url?page=1&limit=5');
    expect(metadata.next).to.equal('/url?page=3&limit=5');
    expect(metadata.pages).to.equal(5);
    expect(metadata.totalItems).to.equal(22);
  });

  it('returns page metadata without extra query if there is an extra query', () => {
    const metadata = paginate.getPageMetadata(22, '/url', 'date=2018-08-01');

    expect(metadata.prev).to.equal('/url?date=2018-08-01&page=1&limit=5');
    expect(metadata.next).to.equal('/url?date=2018-08-01&page=3&limit=5');
    expect(metadata.pages).to.equal(5);
    expect(metadata.totalItems).to.equal(22);
  });
});

import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MiniPreloader } from './Preloader';
import { metadataPropTypes } from '../../helpers/proptypes';

/**
 * @exports
 * @function InfiniteLoader
 * @param {object} props
 * @returns {JSX} InfiniteLoader
 */
const InfiniteLoader = ({
  items, loadMore, metadata, height
}) => (
  <InfiniteScroll
    dataLength={items.length}
    next={loadMore}
    hasMore={!!metadata.next}
    height={height}
    loader={<div className="text-center"><MiniPreloader /></div>}
  >
    <div className="scroller">
      {items}
    </div>
  </InfiniteScroll>
);

InfiniteLoader.propTypes = {
  ...metadataPropTypes,
  height: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};

InfiniteLoader.defaultProps = {
  height: null
};

export default InfiniteLoader;

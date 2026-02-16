import React from 'react';
import PropTypes from 'prop-types';
import InfiniteLoader from 'src/features/common/components/InfiniteLoader';
import { metadataPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @exports
 * @function CardGroup
 * @params {object} props
 * @returns {React.ComponentClass} CardGroup
 */
const CardGroup = ({ items, metadata, loadMore }) => (
  <div className="card-group meals-wrapper" id="card-group">
    <InfiniteLoader items={items} metadata={metadata} loadMore={loadMore} />
  </div>
);

CardGroup.propTypes = {
  ...metadataPropTypes,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default CardGroup;

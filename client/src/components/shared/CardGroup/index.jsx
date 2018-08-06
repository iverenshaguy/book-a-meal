import React from 'react';
import PropTypes from 'prop-types';
import InfiniteLoader from '../InfiniteLoader';
import { metadataPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function CardGroup
 * @params {object} props
 * @returns {JSX} CardGroup
 */
const CardGroup = ({ items, metadata, loadMore }) => (
  <div className="card-group meals-wrapper" id="card-group">
    <InfiniteLoader items={items} metadata={metadata} loadMore={loadMore} />
  </div>
);

CardGroup.propTypes = {
  ...metadataPropTypes,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  loadMore: PropTypes.func.isRequired
};

export default CardGroup;

import React from 'react';
import PropTypes from 'prop-types';
import InfiniteLoader from '../InfiniteLoader';

/**
 * @exports
 * @function CardGroup
 * @params {object} props
 * @returns {JSX} CardGroup
 */
const CardGroup = ({ items, limit }) => (
  <div className="card-group meals-wrapper" id="card-group">
    <InfiniteLoader items={items} limit={limit} />
  </div>
);

CardGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  limit: PropTypes.number.isRequired
};

export default CardGroup;

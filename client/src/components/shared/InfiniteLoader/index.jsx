import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MiniPreloader } from '../Preloader';

/**
 * @exports
 * @function InfiniteLoader
 * @returns {JSX} InfiniteLoader
 */
class InfiniteLoader extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    limit: PropTypes.number.isRequired
  };

  /**
   * @static
   * @memberof InfiniteLoader
   * @param {object} props
   * @param {object} state
   * @return {object} new state
   */
  static getDerivedStateFromProps(props, state) {
    return { items: props.items.slice(0, state.currentPage * state.limit) };
  }

  /**
   * @memberof InfiniteLoader
   * @constructor
   * @param {object} props
   * @returns {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items.slice(0, this.props.limit),
      hasMore: this.props.items.length >= this.props.limit,
      currentPage: 1,
      limit: this.props.limit
    };
  }

  /**
   * @memberof InfiniteLoader
   * @returns {void}
   */
  loadMore = () => {
    if (this.state.items.length >= this.props.items.length) {
      this.setState({ hasMore: false });
      return;
    }

    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }), this.loadItems);
  }

  /**
   * @memberof InfiniteLoader
   * @returns {void}
   */
  loadItems = () => {
    const lastIndex = (this.state.currentPage * this.state.limit) - 1;

    this.setState({
      items: this.props.items.slice(0, lastIndex + 1)
    });
  }

  /**
   * @memberof InifinteScroll
   * @returns {JSX} InfiniteLoader
   */
  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.loadMore}
        hasMore={this.state.hasMore}
        loader={<div className="text-center"><MiniPreloader /></div>}
      >
        <div className="scroller">
          {this.state.items}
        </div>
      </InfiniteScroll>
    );
  }
}

export default InfiniteLoader;

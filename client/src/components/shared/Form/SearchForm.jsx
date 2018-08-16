import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @exports
 * @function SearchForm
 * @param {object} props
 * @returns {JSX} SearchForm
 */
class SearchForm extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    fetchItems: PropTypes.func.isRequired
  }

  state = {
    searchTerm: '',
    typingTimeout: 0
  }

  /**
   * @memberof MenuForm
   * @param {object} event
   * @returns {void}
   */
  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    }, this.handleSearch);
  }

  /**
   * @memberof MenuForm
   * @returns {void}
   */
  handleSearch = () => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      typingTimeout: setTimeout(() => {
        this.props.fetchItems(null, this.state.searchTerm);
      }, 300)
    });
  }

  /**
   * @memberof SearchForm
   * @returns {JSX} SearchForm
   */
  renderCatererForm = () => (
    <div className="form-input">
      <label htmlFor="search" className="hide">Search For Meals</label>
      <input
        type="text"
        name="search"
        className="open menu-search-input"
        value={this.state.searchTerm}
        placeholder="Search For Meals"
        onChange={this.handleChange}
      />
    </div>)

  /**
   * @memberof SearchForm
   * @returns {JSX} SearchForm
   */
  renderCustomerForm = () => (
    <Fragment>
      <div className="search-wrapper">
        <div className="search-form">
          <label htmlFor="search" className="hide">Search For Meals</label>
          <input
            type="text"
            name="search"
            id="search"
            label="Search"
            value={this.state.searchTerm}
            placeholder="Search For Meals"
            onChange={this.handleChange}
          />
          <div className="search-btn"><img src="/img/search.svg" alt="" /></div>
        </div>
      </div>
    </Fragment>)

  /**
   * @memberof MenuForm
   * @returns {JSX} MenuForm Component
   */
  render() {
    return (
      <Fragment>
        {this.props.type === 'customer' ? this.renderCustomerForm() : this.renderCatererForm()}
      </Fragment>
    );
  }
}

export default SearchForm;

import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './DatePicker.scss';

/**
 * @exports
 * @extends Component
 * @function DatePicker
 * @returns {JSX} DatePicker
 */
class DatePicker extends Component {
  static propTypes = {
    screenSize: PropTypes.string,
    handleSelectDate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    screenSize: null,
  };

  /**
   * @memberof DatePicker
   * @param {object} event
   * @returns {JSX} Menu Component
   */
  handleChange = (event) => {
    const date = moment(event.target.value).format('YYYY-MM-DD');

    this.props.handleSelectDate(date);
  }

  /**
   * @memberof DatePicker
   * @returns {JSX} Menu Component
   */
  render() {
    const { screenSize } = this.props;
    const datePickerClass = classNames({
      'datepicker-div': true,
      'd-flex-md': screenSize === 'md'
    });

    return (
      <div className={datePickerClass}>
        <button className="btn btn-sec">Change Date</button>
        <input type="date" id="datepicker" onChange={this.handleChange} />
      </div>
    );
  }
}

export default DatePicker;

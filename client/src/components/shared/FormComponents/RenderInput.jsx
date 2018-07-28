import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderFormFieldPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @class RenderInput
 * @param {object} props
 * @returns {JSX} RenderInput
 */
class RenderInput extends Component {
  static propTypes = {
    ...renderFormFieldPropTypes,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
  };

  static defaultProps = {
    value: ''
  };

  state = {
    openField: false
  }

  toggleOpenField = () => {
    this.setState(prevState => ({
      openField: !prevState.openField
    }));
  }

  /**
   * @memberof RenderInput
   * @returns {component} RenderInput
   */
  render() {
    const validInput = classNames({
      'is-invalid': this.props.meta.touched && this.props.meta.error,
      'is-valid': this.props.meta.touched && !this.props.meta.error,
      open: this.state.openField
    });

    const validFeedBack = classNames({
      'invalid-feedback': this.props.meta.touched && this.props.meta.error,
      'd-none': this.props.meta.touched && !this.props.meta.error
    });

    const formInputClass = this.props.type === 'checkbox' ? 'form-input-checkbox' : 'form-input';

    return (
      <Fragment>
        <div className={formInputClass}>
          {this.props.label && this.props.type !== 'checkbox' &&
            // eslint-disable-next-line
            <label htmlFor={this.props.id} onClick={this.toggleOpenField}>
              {this.props.label}
              {this.props.required && <span className="danger">*</span>}
            </label>}
          <input
            id={this.props.id}
            type={this.props.type}
            name={this.props.name}
            rows={this.props.rows}
            placeholder={this.props.placeholder}
            className={validInput}
            value={this.props.value}
            maxLength={this.props.maxLength}
            checked={this.props.type === 'checkbox' ? this.props.value : undefined}
            onChange={e => this.props.handleChange(e)}
            onBlur={e => this.props.handleBlur(e)}
            onFocus={e => this.props.handleFocus(e)}
          />
          {this.props.type === 'checkbox' &&
            <label htmlFor={this.props.id}>
              {this.props.label}
            </label>}
          {this.props.meta.touched && this.props.meta.error &&
          <div className={validFeedBack}>{this.props.meta.error}</div>}
        </div>
      </Fragment>
    );
  }
}

export default RenderInput;

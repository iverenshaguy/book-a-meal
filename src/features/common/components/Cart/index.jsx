import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import LinkBtn from 'src/features/common/components/Link';
import { orderItemPropTypes } from 'src/features/common/utils/proptypes';
import checkShopOpen from 'src/features/common/utils/checkShopOpen';
import calculateCashEarnedFromOrder from 'src/features/common/utils/calculateCashEarnedFromOrder';
import CloseIcon from 'src/features/common/components/CloseIcon';
import 'src/features/common/components/Cart/Cart.scss';

/**
 * @exports
 * @extends Component
 * @class Cart
 * @returns {React.ComponentClass} Cart
 */
class Cart extends Component {
  static propTypes = {
    order: PropTypes.arrayOf(orderItemPropTypes).isRequired,
    handleQuantityInputChange: PropTypes.func.isRequired,
    removeOrderItem: PropTypes.func.isRequired,
  };

  state = {
    show: false,
  };

  /**
   * @memberof Cart
   * @returns {React.ComponentClass} Cart Component
   */
  toggleCart = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  /**
   * @memberof Cart
   * @returns {React.ComponentClass} Checkout Btn
   */
  renderCheckoutBtn = () => {
    const { order } = this.props;
    const disabled = order.length === 0 ? 'disabled' : null;

    return (
      <Link to="/order-review">
        <button type="button" className="btn btn-pri btn-block checkout-btn" disabled={disabled}>
          Checkout
        </button>
      </Link>
    );
  };

  /**
   * @memberof Cart
   * @returns {React.ComponentClass} Order Item
   */
  renderOrderSummary = () => {
    const { order, handleQuantityInputChange, removeOrderItem } = this.props;

    return (
      <div className="order-summary">
        {order.map((item) => (
          <div key={item.id}>
            <p>
              <input
                type="number"
                className="order-input"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityInputChange(e, item.id)}
              />
            </p>
            <p data-tip={item.title} data-for="cart-tooltip">
              {item.title}
            </p>
            <p>{item.price}</p>
            <LinkBtn
              className="remove-order"
              data-tooltip-content="Remove Item?"
              data-tooltip-id="cart-tooltip"
              clickHandler={() => removeOrderItem(item.id)}
            >
              &times;
            </LinkBtn>
            <ReactTooltip place="top" type="dark" effect="solid" className="tooltip" id="cart-tooltip" />
          </div>
        ))}
        <div className="order-amount">
          <div>
            <p>Total:</p>
            <h2>
              &#8358;
              {calculateCashEarnedFromOrder(order)}
            </h2>
          </div>
        </div>
      </div>
    );
  };

  /**
   * @memberof Cart
   * @returns {React.ComponentClass} Cart Toggle
   */
  renderCartToggle = () => {
    const { order } = this.props;
    const isShopOpen = checkShopOpen();

    return (
      <div className="side-cart-toggle d-none-xl">
        <span aria-hidden="true" id="cart-toggler" onClick={this.toggleCart}>
          <div className="text-center">
            <img src="/img/cart.png" alt="cart" /> &nbsp;
            <sup>{order.length}</sup>
          </div>
          <p className="text-center">
            Total: &#8358;
            {calculateCashEarnedFromOrder(order)}
          </p>
        </span>
        {isShopOpen && <span className="cart-btn">{this.renderCheckoutBtn()}</span>}
      </div>
    );
  };

  /**
   * @memberof Cart
   * @returns {React.ComponentClass} Cart Component
   */
  render() {
    const { order } = this.props;
    const isShopOpen = checkShopOpen();

    return (
      <Fragment>
        {this.renderCartToggle()}
        <div className={`side-cart ${this.state.show ? 'show' : null}`} id="side-cart">
          <div className="cart">
            <div className="cart-header">
              <h2>Your Basket</h2>
              <CloseIcon divClass="d-none-xl" btnID="side-cart-close-icon" clickHandler={this.toggleCart} />
            </div>
            <hr />
            {order.length === 0 && (
              <div className="empty-cart">
                <p>Your Basket is Empty</p>
              </div>
            )}
            {order.length !== 0 && this.renderOrderSummary()}
            <br />
            {isShopOpen && this.renderCheckoutBtn()}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Cart;

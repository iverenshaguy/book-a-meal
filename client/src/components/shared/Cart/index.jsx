import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkBtn from '../Link';
import { orderItemPropTypes } from '../../../helpers/proptypes';
import checkShopOpen from '../../../helpers/checkShopOpen';
import calculateCashEarnedFromOrder from '../../../helpers/calculateCashEarnedFromOrder';

/**
 * @exports
 * @extends Component
 * @class Cart
 * @returns {JSX} Cart
 */
class Cart extends Component {
  static propTypes = {
    order: PropTypes.arrayOf(orderItemPropTypes).isRequired,
    handleQuantityInputChange: PropTypes.func.isRequired,
    removeOrderItem: PropTypes.func.isRequired
  }

  state = {
    show: false
  }

  /**
   * @memberof Cart
   * @returns {JSX} Cart Component
   */
  toggleCart = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  /**
   * @memberof Cart
   * @returns {JSX} Checkout Btn
   */
  renderCheckoutBtn = () => (
    <Link to="/order-confirmation" href="/order-confirmation">
      <button className="btn btn-pri btn-block checkout-btn">Checkout</button>
    </Link>);

  /**
   * @memberof Cart
   * @returns {JSX} Order Item
   */
  renderOrderSummary = () => {
    const {
      order, handleQuantityInputChange, removeOrderItem
    } = this.props;

    return (
      <div className="order-summary">
        {order.map(item => (
          <div key={item.id}>
            <p>
              <input type="number" className="order-input" value={item.quantity} min="1" onChange={e => handleQuantityInputChange(e, item.id)} />
            </p>
            <p>{item.title}</p>
            <p>{item.price}</p>
            <LinkBtn className="remove-order" clickHandler={() => removeOrderItem(item.id)}>&times;</LinkBtn>
          </div>
        ))}
        <div className="order-amount">
          <div>
            <p>Total:</p>
            <h2>&#8358;{calculateCashEarnedFromOrder(order)}</h2>
          </div>
        </div>
      </div>
    );
  }

  /**
   * @memberof Cart
   * @returns {JSX} Cart Toggle
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
          <p className="text-center">Total: &#8358;{calculateCashEarnedFromOrder(order)}</p>
        </span>
        {isShopOpen &&
          <span className="cart-btn">
            {this.renderCheckoutBtn()}
          </span>}
      </div>
    );
  }

  /**
   * @memberof Cart
   * @returns {JSX} Cart Component
   */
  render() {
    const { order } = this.props;
    const isShopOpen = checkShopOpen();

    return (
      <Fragment>
        {this.renderCartToggle()}
        <div className={`side-cart ${this.state.show && 'show'}`} id="side-cart">
          <div className="cart">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <div className="close d-none-xl">
                <LinkBtn aria-hidden="true" id="side-cart-close-icon" clickHandler={this.toggleCart}>&times;</LinkBtn>
              </div>
            </div>
            <hr />
            {order.length === 0 &&
              <div className="empty-cart">
                <p>Your Cart is Empty</p>
              </div>}
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

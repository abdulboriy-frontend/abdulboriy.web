import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({ cartItems, increaseCartItem, decreaseCartItem, removeCartItem }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>My Shopping Cart</h1>

          <div className="empty-cart">
            <h2>Cart is empty</h2>
            <Link to="/">Back to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>My Shopping Cart</h1>

        <div className="cart-title">
          <p>Product</p>
          <p>Variant</p>
          <p>Quantity</p>
          <p>Price</p>
          <p></p>
        </div>

        {cartItems.map((item) => (
          <div className="cart-item" key={`${item.id}-${item.variant}`}>
            <div className="product">
              <div className="image-box">
                <img src={item.image} alt={item.name} />
              </div>

              <div>
                <h3>{item.name}</h3>
                <p>Product ID: {item.id}</p>
              </div>
            </div>

            <div className="size">{item.variant}</div>

            <div className="quantity">
              <button onClick={() => decreaseCartItem(item.id, item.variant)}>
                −
              </button>

              <span>{String(item.quantity).padStart(2, "0")}</span>

              <button onClick={() => increaseCartItem(item.id, item.variant)}>
                +
              </button>
            </div>

            <b className="price">
              ${(item.price * item.quantity).toFixed(2)}
            </b>

            <button
              className="remove"
              onClick={() => removeCartItem(item.id, item.variant)}
            >
              ×
            </button>
          </div>
        ))}

        <div className="summary">
          <div className="summary-card">
            <div>
              <span>Discount</span>
              <b>$0.00</b>
            </div>

            <div>
              <span>Delivery</span>
              <b>${delivery.toFixed(2)}</b>
            </div>
          </div>

          <div className="summary-card">
            <div>
              <span>Subtotal</span>
              <b>${subtotal.toFixed(2)}</b>
            </div>

            <div>
              <span>Total</span>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
        </div>

        <div className="promo">
          <label>
            If you have a promotion code, please enter it here
          </label>

          <div>
            <input
              type="text"
              placeholder="Please enter promo code"
            />

            <button>Apply Discount</button>
          </div>
        </div>

        <div className="bottom-buttons">
          <Link to="/" className="back">
            Back to Shop
          </Link>

          <button className="checkout">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
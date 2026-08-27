import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import "./Cart.css";

function Cart({
  cartItems,
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePlaceOrder = async (item) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.warning("Iltimos, avval tizimga kiring!");
      return;
    }

    try {
      const orderData = {
        items: [
          {
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            imageUrl: item.image,
          },
        ],
        total: item.price * item.quantity,
      };

      await axios.post("https://uzum-api.onrender.com/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Buyurtma muvaffaqiyatli berildi!");
      removeCartItem(item.id, item.variant);
      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Buyurtma berishda xatolik!"
      );
    }
  };

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
          <h1>{t("shoppingCart")}</h1>
          <div className="empty-cart">
            <h2>{t("cartEmpty")}</h2>
            <Link to="/">{t("backToShop")}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>{t("shoppingCart")}</h1>

        <div className="cart-title">
          <p>{t("product")}</p>
          <p>{t("variant")}</p>
          <p>{t("quantity")}</p>
          <p>{t("price")}</p>
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
                <p>
                  {t("productId")}: {item.id}
                </p>
              </div>
            </div>

            <div className="size">{item.variant || "-"}</div>

            <div className="quantity">
              <button onClick={() => decreaseCartItem(item.id, item.variant)}>
                −
              </button>
              <span>{String(item.quantity).padStart(2, "0")}</span>
              <button onClick={() => increaseCartItem(item.id, item.variant)}>
                +
              </button>
            </div>

            <b className="price">${(item.price * item.quantity).toFixed(2)}</b>

            <button
              className="remove"
              onClick={() => removeCartItem(item.id, item.variant)}
            >
              ×
            </button>

            <button
              className="order-single-btn"
              onClick={() => handlePlaceOrder(item)}
            >
              Buyurtma berish
            </button>
          </div>
        ))}

        <div className="summary">
          <div className="summary-card">
            <div>
              <span>{t("discount")}</span>
              <b>$0.00</b>
            </div>
            <div>
              <span>{t("delivery")}</span>
              <b>${delivery.toFixed(2)}</b>
            </div>
          </div>

          <div className="summary-card">
            <div>
              <span>{t("subtotal")}</span>
              <b>${subtotal.toFixed(2)}</b>
            </div>
            <div>
              <span>{t("total")}</span>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
        </div>

        <div className="promo">
          <label>{t("promoText")}</label>
          <div>
            <input type="text" placeholder={t("promoPlaceholder")} />
            <button>{t("applyDiscount")}</button>
          </div>
        </div>

        <div className="bottom-buttons">
          <Link to="/" className="back">
            {t("backToShop")}
          </Link>
          <button className="checkout">{t("checkout")}</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
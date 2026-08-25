import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BadgeCheck,
  FileText,
  MapPin,
  MessageCircle,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Star,
  Store,
  Truck,
} from "lucide-react";
import "./ProductDetails.css";

function ProductDetail({ onAddToCart }) {
  const { slug } = useParams();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [variant, setVariant] = useState("proMax");
  const [activeTab, setActiveTab] = useState("delivery");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          "https://uzum-api.onrender.com/api/products"
        );

        if (!res.data?.success) return;

        const found = res.data.data.find(
          item => String(item.slug || item.id) === String(slug)
        );

        setProduct(found);
      } catch (error) {
        console.log("Product error:", error);
      }
    };

    getProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="product-loading">
        <h2>{t("loading")}</h2>
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [
          product.imageUrl ||
            "https://via.placeholder.com/600x600?text=Product",
        ];

  const normalPrice = Number(product.price) || 0;
  const discountPrice =
    Number(product.discountedPrice) || normalPrice;

  const unitPrice =
    quantity >= 51
      ? 890
      : quantity >= 11
      ? discountPrice
      : normalPrice;

  const totalPrice = unitPrice * quantity;

  const variants = [
    { id: "standard", label: t("standard") },
    { id: "ecoFlow", label: t("ecoFlow") },
    { id: "proMax", label: t("proMax") },
    { id: "heavyDuty", label: t("heavyDuty") },
    { id: "compact", label: t("compact") },
  ];

  const changeQuantity = value => {
    setQuantity(prev => Math.max(1, prev + value));
  };

  const selectPrice = type => {
    if (type === "normal") setQuantity(1);
    if (type === "discount") setQuantity(11);
    if (type === "bulk") setQuantity(51);
  };

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name || product.title,
      image: product.imageUrl || images[0],
      price: unitPrice,
      variant,
    };

    if (typeof onAddToCart === "function") {
      onAddToCart(cartProduct, quantity, variant);
    }

    toast.success(t("addToCart"), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="product-detail">
      <ToastContainer />

      <div className="product-container">
        <div className="image-section">
          <div className="main-image-box">
            <img
              src={images[selectedImage]}
              alt={product.name || "Product"}
              className="main-image"
            />
          </div>

          <div className="thumbnail-list">
            {images.slice(0, 6).map((image, index) => (
              <button
                key={index}
                type="button"
                className={`thumb-item ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`Product ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="info-section">
          <div className="badge-row">
            <span className="badge-new">{t("newProduct")}</span>
            <span className="product-id">
              ID: {product.slug || product.id}
            </span>
          </div>

          <h1 className="product-title">
            {product.name || product.title}
          </h1>

          <div className="rating-row">
            <div className="rating">
              <Star size={17} fill="currentColor" />
              <span>4.8</span>
            </div>
            <span>124 {t("ratingReviews")}</span>
            <span>500+ {t("sold")}</span>
          </div>

          {/* WHOLESALE */}
          <div className="wholesale-box">
            <div className="wholesale-header">
              <h3>{t("wholesalePrices")}</h3>
              <div className="moq-badge">
                <Package size={16} />
                <span>
                  {t("moq")}: {product.minOrderQuantity || 2}{" "}
                  {t("pieces")}
                </span>
              </div>
            </div>

            <div className="price-cards-grid">
              <button
                type="button"
                className={`price-card ${
                  quantity <= 10 ? "active" : ""
                }`}
                onClick={() => selectPrice("normal")}
              >
                <span className="price-range">
                  1 - 10 {t("pieces")}
                </span>
                <strong className="price-value">
                  ${normalPrice.toFixed(2)}
                </strong>
              </button>

              <button
                type="button"
                className={`price-card ${
                  quantity >= 11 && quantity <= 50
                    ? "active"
                    : ""
                }`}
                onClick={() => selectPrice("discount")}
              >
                <span className="popular-badge">
                  {t("popular")}
                </span>
                <span className="price-range">
                  11 - 50 {t("pieces")}
                </span>
                <strong className="price-value">
                  ${discountPrice.toFixed(2)}
                </strong>
              </button>

              <button
                type="button"
                className={`price-card ${
                  quantity >= 51 ? "active" : ""
                }`}
                onClick={() => selectPrice("bulk")}
              >
                <span className="price-range">
                  51+ {t("pieces")}
                </span>
                <strong className="price-value">$890.00</strong>
              </button>
            </div>
          </div>

          {/* VARIANTS */}
          <div className="variant-section">
            <h4 className="variant-title">
              {t("configuration")}
            </h4>

            <div className="variant-buttons">
              {variants.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`variant-btn ${
                    variant === item.id ? "active" : ""
                  }`}
                  onClick={() => setVariant(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* SELLER */}
          <div className="seller-card">
            <div className="seller-info">
              <div className="seller-logo">
                {product.seller?.logoUrl ? (
                  <img
                    src={product.seller.logoUrl}
                    alt="Seller"
                  />
                ) : (
                  <Store size={24} />
                )}
              </div>

              <div className="seller-content">
                <h4>
                  {product.seller?.name || "UzTech Electronics"}
                </h4>

                <div className="seller-tags">
                  <span className="seller-tag">
                    <BadgeCheck size={15} />
                    {t("sellerVerified")}
                  </span>

                  <span className="seller-tag">
                    <MapPin size={15} />
                    {t("tashkent")}
                  </span>
                </div>
              </div>
            </div>

            <button type="button" className="store-btn">
              {t("viewStore")}
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            type="button"
            className={`tab-btn ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            {t("description")}
          </button>

          <button
            type="button"
            className={`tab-btn ${
              activeTab === "delivery" ? "active" : ""
            }`}
            onClick={() => setActiveTab("delivery")}
          >
            {t("delivery")}
          </button>

          <button
            type="button"
            className={`tab-btn ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            {t("reviews")} (124)
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "description" && (
            <div className="tab-simple-text">
              <FileText size={27} />
              <div>
                <h3>{t("description")}</h3>
                <p>
                  {product.description || t("deliveryText")}
                </p>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="tab-simple-text">
              <Truck size={27} />
              <div>
                <h3>{t("deliveryTitle")}</h3>
                <p>{t("deliveryText")}</p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-simple-text">
              <Star size={27} />
              <div>
                <h3>{t("reviews")} (124)</h3>
                <p>4.8 / 5 — 124 {t("ratingReviews")}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bottom-bar-panel">
        <div className="summary-price">
          <span className="total-title">
            {t("totalPrice")}
          </span>
          <strong className="total-price">
            ${totalPrice.toFixed(2)}
          </strong>
          <span className="unit-price">
            {t("onePiece")}: ${unitPrice.toFixed(2)}
          </span>
        </div>

        <div className="counter-controls">
          <button
            type="button"
            onClick={() => changeQuantity(-1)}
          >
            <Minus size={18} />
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={() => changeQuantity(1)}
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="action-buttons">
          <button type="button" className="btn-chat">
            <MessageCircle size={18} />
            <span>{t("chat")}</span>
          </button>

          <button type="button" className="btn-rfq">
            <FileText size={18} />
            <span>{t("rfq")}</span>
          </button>

          <button
            type="button"
            className="btn-cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            <span>{t("addToCart")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
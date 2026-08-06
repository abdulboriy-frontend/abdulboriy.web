import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("Pro-Max X1");
  const [activeTab, setActiveTab] = useState("description");


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get("https://uzum-api.onrender.com/api/products");

        const result = response.data;

        if (!result.success) return;

        const foundProduct = result.data.find(
          (item) => String(item.slug || item.id) === String(slug)
        );

        setProduct(foundProduct);
      } catch (error) {
        console.error("Axios xatosi:", error);
      }
    };

    getProduct();
  }, [slug]);

  if (!product) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  const images = product.images?.length > 0 ? product.images
    : [product.imageUrl || "https://via.placeholder.com/600"];

  const variants = [
    "Standard",
    "Eco-Flow",
    "Pro-Max X1",
    "Heavy Duty",
    "Compact",
  ];

  const normalPrice = Number(product.price) || 1200;
  const discountPrice = Number(product.discountedPrice) || normalPrice;

  let unitPrice = normalPrice;

  if (quantity >= 11 && quantity <= 50) {
    unitPrice = discountPrice;
  }

  if (quantity >= 51) {
    unitPrice = 890;
  }

  const totalPrice = unitPrice * quantity;

  function increaseQuantity() {
    setQuantity((oldQuantity) => oldQuantity + 1);
  }

  function decreaseQuantity() {
    setQuantity((oldQuantity) => Math.max(1, oldQuantity - 1));
  }

  function handleAddToCart() {
    const cartProduct = {
      id: product.id,
      name: product.name || product.title || "Nomsiz mahsulot",
      image: product.imageUrl || images[0] || "",
      price: unitPrice,
    };

    onAddToCart(cartProduct, quantity, selectedVariant);

    navigate("");
  }

  return (
    <div className="product-detail-page">
      <div className="detail-container">

        <div className="detail-main-grid">

          <div className="gallery-section">
            <div className="main-image-box">
              <img
                src={images[selectedImage]}
                alt={product.name || "Mahsulot"}
              />
            </div>

            <div className="thumbnail-list">
              {images.slice(0, 5).map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={selectedImage === index ? "thumb-item active" : "thumb-item"}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt="Mahsulot" />
                </button>
              ))}
            </div>
          </div>

          <div className="info-section">

            <div className="badge-row">
              <span className="badge-new">Yangi mahsulot</span>
              <span className="product-id">ID: {product.slug || product.id}</span>
            </div>

            <h1 className="product-title">
              {product.name || product.title}
            </h1>

            <div className="rating-row">
              <div className="rating">
                <Star size={17} fill="currentColor" />
                <span>4.8</span>
              </div>

              <span>124 ta sharh</span>
              <span>500+ sotilgan</span>
            </div>

            <div className="wholesale-box">

              <div className="wholesale-header">
                <h3>Ulgurji narxlar</h3>

                <div className="moq-badge">
                  <Package size={16} />
                  <span>MOQ: {product.minOrderQuantity || 2} dona</span>
                </div>
              </div>

              <div className="price-cards-grid">

                <button
                  type="button"
                  className={quantity <= 10 ? "price-card active" : "price-card"}
                  onClick={() => setQuantity(1)}
                >
                  <span className="price-range">1 - 10 dona</span>
                  <strong className="price-value">
                    ${normalPrice.toFixed(2)}
                  </strong>
                </button>

                <button
                  type="button"
                  className={
                    quantity >= 11 && quantity <= 50
                      ? "price-card active"
                      : "price-card"
                  }
                  onClick={() => setQuantity(11)}
                >
                  <span className="popular-badge">OMMABOP</span>
                  <span className="price-range">11 - 50 dona</span>
                  <strong className="price-value">
                    ${discountPrice.toFixed(2)}
                  </strong>
                </button>

                <button
                  type="button"
                  className={quantity >= 51 ? "price-card active" : "price-card"}
                  onClick={() => setQuantity(51)}
                >
                  <span className="price-range">51+ dona</span>
                  <strong className="price-value">$890.00</strong>
                </button>

              </div>
            </div>

            <div className="variant-section">

              <h4 className="variant-title">
                KONFIGURATSIYANI TANLANG
              </h4>

              <div className="variant-buttons">
                {variants.map((variant) => (
                  <button key={variant} type="button" className={selectedVariant === variant
                    ? "variant-btn active"
                    : "variant-btn"
                  }
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </button>
                ))}
              </div>

            </div>

            <div className="seller-card">

              <div className="seller-info">

                <div className="seller-logo">
                  {product.seller?.logoUrl ? (
                    <img
                      src={product.seller.logoUrl}
                      alt="Seller"
                    />
                  ) : (
                    <Store size={23} />
                  )}
                </div>

                <div>
                  <h4>
                    {product.seller?.name || "UzTech Electronics"}
                  </h4>

                  <div className="seller-tags">
                    <span>
                      <BadgeCheck size={15} />
                      TASDIQLANGAN
                    </span>

                    <span>
                      <MapPin size={15} />
                      Toshkent, UZ
                    </span>
                  </div>
                </div>

              </div>

              <button type="button" className="store-btn">
                Do'konni ko'rish
              </button>

            </div>

          </div>
        </div>

        <div className="tabs-container">

          <div className="tabs-header">

            <button
              className={activeTab === "description" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("description")}
            >
              Tavsif
            </button>

            <button
              className={activeTab === "delivery" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("delivery")}
            >
              Yetkazib berish
            </button>

            <button
              className={activeTab === "reviews" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("reviews")}
            >
              Sharhlar (124)
            </button>

          </div>

          <div className="tab-content">

            {activeTab === "description" && (
              <div className="description-layout">

                <div>
                  <h3>Mahsulot haqida</h3>
                  <p>
                    {product.description ||
                      "Yuqori sifatli va ishonchli mahsulot."}
                  </p>
                </div>

                <div>
                  <h3>Logistika</h3>

                  <div className="logistics-item">
                    <Truck size={24} />

                    <div>
                      <strong>Tezkor yetkazib berish</strong>
                      <p>Toshkent bo'ylab 24 soat ichida.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === "delivery" && (
              <div className="tab-simple-text">
                <Truck size={27} />

                <div>
                  <h3>Yetkazib berish</h3>
                  <p>
                    Toshkent bo'ylab 24 soatda,
                    viloyatlarga 2-5 ish kunida.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="tab-simple-text">
                <Star size={28} fill="currentColor" />

                <div>
                  <h3>4.8 / 5</h3>
                  <p>
                    Xaridorlar mahsulotni yaxshi baholagan.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="bottom-bar-panel">

          <div className="summary-price">
            <span className="total-title">Umumiy narx</span>

            <strong className="total-price">
              ${totalPrice.toFixed(2)}
            </strong>

            <small className="unit-price">
              1 dona: ${unitPrice.toFixed(2)}
            </small>
          </div>

          <div className="counter-controls">

            <button type="button" onClick={decreaseQuantity}>
              <Minus size={18} />
            </button>

            <span>{quantity}</span>

            <button type="button" onClick={increaseQuantity}>
              <Plus size={18} />
            </button>

          </div>

          <div className="action-buttons">

            <button className="btn-chat">
              <MessageCircle size={18} />
              Chat orqali yozish
            </button>

            <button className="btn-rfq">
              <FileText size={18} />
              RFQ
            </button>

            <button
              className="btn-cart"
    onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              Savatga qo'shish
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetail;
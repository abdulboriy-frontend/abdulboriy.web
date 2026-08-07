import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await axios.get(
          "https://uzum-api.onrender.com/api/products"
        );

        if (!data.success) return;

        const foundProduct = data.data.find(
          (item) => String(item.slug || item.id) === String(slug)
        );

        setProduct(foundProduct);
      } catch (error) {
        console.log(error);
      }
    }

    getProduct();
  }, [slug]);

  if (!product) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  const images =
    product.images?.length > 0
      ? product.images
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
    setQuantity((old) => old + 1);
  }

  function decreaseQuantity() {
    setQuantity((old) => Math.max(1, old - 1));
  }

  function handleAddToCart() {
    const cartProduct = {
      id: product.id,
      name: product.name || product.title,
      image: product.imageUrl || images[0],
      price: unitPrice,
    };

    if (typeof onAddToCart === "function") {
      onAddToCart(cartProduct, quantity, "Pro-Max X1");
    }

    alert("Mahsulot savatga qo'shildi!");
  }

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <div className="detail-main-grid">
          {/* Rasm galereyasi */}
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
                  className={
                    selectedImage === index
                      ? "thumb-item active"
                      : "thumb-item"
                  }
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt="Mahsulot" />
                </button>
              ))}
            </div>
          </div>

          {/* Mahsulot ma'lumotlari */}
          <div className="info-section">
            <div className="badge-row">
              <div className="badge-new">Yangi mahsulot</div>
              <div className="product-id">
                ID: {product.slug || product.id}
              </div>
            </div>

            <h1 className="product-title">
              {product.name || product.title}
            </h1>

            <div className="rating-row">
              <div className="rating">
                <Star size={17} fill="currentColor" />
                <div>4.8</div>
              </div>

              <div>124 ta sharh</div>
              <div>500+ sotilgan</div>
            </div>

            <div className="wholesale-box">
              <div className="wholesale-header">
                <h3>Ulgurji narxlar</h3>

                <div className="moq-badge">
                  <Package size={16} />
                  <div>
                    MOQ: {product.minOrderQuantity || 2} dona
                  </div>
                </div>
              </div>

              <div className="price-cards-grid">
                <div
                  className={`price-card ${quantity <= 10 ? "active" : ""}`}
                >
                  <div className="price-range">1 - 10 dona</div>
                  <div className="price-value">
                    ${normalPrice.toFixed(2)}
                  </div>
                </div>

                <div
                  className={`price-card ${
                    quantity >= 11 && quantity <= 50 ? "active" : ""
                  }`}
                >
                  <div className="popular-badge">OMMABOP</div>

                  <div className="price-range">11 - 50 dona</div>

                  <div className="price-value">
                    ${discountPrice.toFixed(2)}
                  </div>
                </div>

                <div
                  className={`price-card ${quantity >= 51 ? "active" : ""}`}
                >
                  <div className="price-range">51+ dona</div>

                  <div className="price-value">$890.00</div>
                </div>
              </div>
            </div>

            <div className="variant-section">
              <h4 className="variant-title">KONFIGURATSIYANI TANLANG</h4>

              <div className="variant-buttons">
                {variants.map((variant) => (
                  <div
                    key={variant}
                    className={
                      variant === "Pro-Max X1"
                        ? "variant-btn active"
                        : "variant-btn"
                    }
                  >
                    {variant}
                  </div>
                ))}
              </div>
            </div>

            {/* Sotuvchi kartochkasi */}
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
                    <div className="seller-tag">
                      <BadgeCheck size={15} />
                      <div>TASDIQLANGAN</div>
                    </div>

                    <div className="seller-tag">
                      <MapPin size={15} />
                      <div>Toshkent, UZ</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="store-btn">Do'konni ko'rish</div>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs-header">
            <div className="tab-btn">Tavsif</div>
            <div className="tab-btn active">Yetkazib berish</div>
            <div className="tab-btn">Sharhlar (124)</div>
          </div>

          <div className="tab-content">
            <div className="tab-simple-text">
              <Truck size={27} />
              <div>
                <h3>Yetkazib berish</h3>
                <p>
                  Toshkent bo'ylab 24 soatda, viloyatlarga 2-5 ish kunida.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-bar-panel">
          <div className="summary-price">
            <div className="total-title">Umumiy narx</div>
            <div className="total-price">${totalPrice.toFixed(2)}</div>
            <div className="unit-price">
              1 dona: ${unitPrice.toFixed(2)}
            </div>
          </div>

          <div className="counter-controls">
            <button type="button" onClick={decreaseQuantity}>
              <Minus size={18} />
            </button>

            <div>{quantity}</div>

            <button type="button" onClick={increaseQuantity}>
              <Plus size={18} />
            </button>
          </div>

          <div className="action-buttons">
            <div className="btn-chat">
              <MessageCircle size={18} />
              <div>Chat orqali yozish</div>
            </div>

            <div className="btn-rfq">
              <FileText size={18} />
              <div>RFQ</div>
            </div>

            <button
              type="button"
              className="btn-cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              <div>Savatga qo'shish</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
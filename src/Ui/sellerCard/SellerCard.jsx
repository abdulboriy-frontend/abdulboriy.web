import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  Home,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Clock3,
  Award,
  Package,
  UserPlus,
  MessageCircle,
  ShoppingCart
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SellerCard.css";

const SellerCard = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  const [seller] = useState({
    name: "Fast Food Express",
    logoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    isVerified: true,
    locationKey: "tashkent", 
    reliabilityKey: "reliability",
    responseTimeKey: "responseTime",
    experienceLabel: "3 yil tajriba"
  });

  const [products] = useState([
    {
      id: 1,
      nameKey: "margaritaPizza",
      price: 65000,
      imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      minOrder: 1
    },
    {
      id: 2,
      nameKey: "classicBurger",
      price: 35000,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      minOrder: 1
    },
    {
      id: 3,
      nameKey: "pepperoniPizza",
      price: 75000,
      imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      minOrder: 1
    },
    {
      id: 4,
      nameKey: "frenchFries",
      price: 18000,
      imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
      minOrder: 2
    },
    {
      id: 5,
      nameKey: "chickenHotDog",
      price: 22000,
      imageUrl: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a",
      minOrder: 1
    }
  ]);

  if (!seller) return <h2 className="loading">{t("sellerNotFound")}</h2>;

  return (
    <div className="seller-container">
      <div className="breadcrumb">
        <Home size={16} />
        <ChevronRight size={15} />
        <span>{t("suppliers")}</span>
        <ChevronRight size={15} />
        <span>{seller.name}</span>
      </div>

      <div className="seller-header">
        <div className="seller-left">
          <img
            src={seller.logoUrl}
            alt={seller.name}
            className="seller-logo"
          />

          <div className="seller-info">
            <div className="seller-title">
              <h1>{seller.name}</h1>
              {seller.isVerified && (
                <span className="verified-badge">
                  <ShieldCheck size={16} />
                  {t("verified")}
                </span>
              )}
            </div>

            <p className="seller-location">
              <MapPin size={16} />
              {t(seller.locationKey)}
            </p>

            <div className="seller-badges">
              <span>
                <ShieldCheck size={15} />
                98% {t("reliability")}
              </span>
              <span>
                <Clock3 size={15} />
                15m - {t("responseTime")}
              </span>
              <span>
                <Award size={15} />
                {seller.experienceLabel}
              </span>
              <span>
                <Package size={15} />
                {products.length} {t("productCount")}
              </span>
            </div>
          </div>
        </div>

        <div className="seller-actions">
          <button className="follow-btn">
            <UserPlus size={18} />
            {t("follow")}
          </button>
          <button className="message-btn">
            <MessageCircle size={18} />
            {t("sendMessage")}
          </button>
        </div>
      </div>

      {/* Tablar */}
      <div className="seller-tabs">
        <button className="active">{t("products")}</button>
        <button>{t("aboutCompany")}</button>
      </div>

      {/* Mahsulotlar Swiper Slayderi */}
      {products.length > 0 ? (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={3}
          spaceBetween={25}
          loop={products.length > 3}
          speed={500}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            1100: { slidesPerView: 3 },
            700: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="product-image">
                  <img src={product.imageUrl} alt={t(product.nameKey)} />
                </div>

                <div className="product-body">
                  <h3>{t(product.nameKey)}</h3>

                  <p className="product-price">
                    {Number(product.price).toLocaleString()} so'm
                  </p>

                  {product.minOrder && (
                    <div className="minimum-order">
                      {t("minimumOrder")}: {product.minOrder} {t("piece")}
                    </div>
                  )}

                  <span className="stock">{t("inStock")}</span>
                </div>

                <button className="cart-btn" title={t("addToCart")}>
                  <ShoppingCart size={18} />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="no-products">{t("productsNotFound")}</div>
      )}
    </div>
  );
};

export default SellerCard;
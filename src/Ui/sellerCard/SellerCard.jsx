import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
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

  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellerData() {
      try {
        const res = await axios.get(`https://uzum-api.onrender.com/api/sellers/${slug}`);
        setSeller(res.data.data);
        setProducts(res.data.data.products || []);
      } catch (error) {
        setSeller({
          name: "Samarkand Home Goods",
          logoUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e",
          isVerified: true,
          location: "Samarqand",
          reliabilityScore: 94,
          responseTimeLabel: "12s",
          experienceLabel: "5 yillik tajriba"
        });

        setProducts([
          {
            id: 1,
            name: "O'simlik yog'i 1L",
            price: 16000,
            imageUrl: "https://images.unsplash.com/photo-1620706857370-e1b993a58c35",
            minOrder: 1
          },
          {
            id: 2,
            name: "Guruch Alanga 1kg",
            price: 22000,
            imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
            minOrder: 1
          },
          {
            id: 3,
            name: "Shakar 1kg",
            price: 13000,
            imageUrl: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635",
            minOrder: 1
          },
          {
            id: 4,
            name: "Mavsumiy Sabzavotlar To'plami",
            price: 45000,
            imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
            minOrder: 1
          },
          {
            id: 5,
            name: "Sut mahsuloti 1L",
            price: 11000,
            imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
            minOrder: 2
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchSellerData();
  }, [slug]);

  if (loading) return <div className="load-box"></div>;
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
              {seller.location}
            </p>

            <div className="seller-badges">
              <span>
                <ShieldCheck size={15} />
                {seller.reliabilityScore || 94}% {t("reliability")}
              </span>
              <span>
                <Clock3 size={15} />
                {seller.responseTimeLabel || "12s"} - {t("responseTime")}
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

      <div className="seller-tabs">
        <button className="active">{t("products")}</button>
        <button>{t("aboutCompany")}</button>
      </div>

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
                  <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="product-body">
                  <h3>{product.name}</h3>

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
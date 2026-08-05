import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  ShoppingCart,
} from "lucide-react";

import "./SellerCard.css";

const SellerCard = () => {
  const { slug } = useParams();

  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSeller() {
      try {
        const response = await axios.get(
          `https://uzum-api.onrender.com/api/sellers/${slug}`
        );

        const data = response.data;

        if (data.success) {
          setSeller(data.data);
        }
      } catch (error) {
        console.error("Axios xatosi:", error);
      } finally {
        setLoading(false);
      }
    }

    getSeller();
  }, [slug]);

  if (loading) {
    return <h2 className="loading">Yuklanmoqda...</h2>;
  }

  if (!seller) {
    return (
      <h2 className="loading">
        Sotuvchi topilmadi!
      </h2>
    );
  }

  return (
    <div className="seller-container">

      <div className="breadcrumb">
        <Home size={16} />

        <ChevronRight size={15} />

        <span>Yetkazib beruvchilar</span>

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
                  Tasdiqlangan
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
                {seller.reliabilityLabel}
              </span>

              <span>
                <Clock3 size={15} />
                {seller.responseTimeLabel}
              </span>

              <span>
                <Award size={15} />
                {seller.experienceLabel}
              </span>

              <span>
                <Package size={15} />
                {seller.products?.length || 0} ta mahsulot
              </span>

            </div>

          </div>

        </div>

        <div className="seller-actions">

          <button className="follow-btn">
            <UserPlus size={18} />
            Kuzatish
          </button>

          <button className="message-btn">
            <MessageCircle size={18} />
            Xabar yuborish
          </button>

        </div>

      </div>

      <div className="seller-tabs">
        <button className="active">
          Mahsulotlar
        </button>

        <button>
          Kompaniya haqida
        </button>
      </div>

      <div className="products-grid">

        {seller.products?.length > 0 ? (

          seller.products.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              <div className="product-image">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>

              <div className="product-body">

                <h3>
                  {product.name}
                </h3>

                <p className="product-price">

                  {product.price?.toLocaleString()} so'm

                </p>

                <span className="stock">
                  Omborda mavjud
                </span>

              </div>

              <button className="cart-btn">
                <ShoppingCart size={18} />
              </button>

            </div>

          ))

        ) : (

          <div className="no-products">
            Mahsulotlar topilmadi.
          </div>

        )}

      </div>

    </div>
  );
};

export default SellerCard;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../card/card";
import "./ProductCard.css";

function ProductCard() {
  const [malumotlar, setMalumotlar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const yuklash = async () => {
      try {
        const javob = await axios.get(
          "https://uzum-api.onrender.com/api/products"
        );

        const json = javob.data;

        console.log(json.data);

        if (json.success) {
          setMalumotlar(json.data);
        }
      } catch (xatolik) {
        console.error("Axios xatosi:", xatolik);
      } finally {
        setLoading(false);
      }
    };

    yuklash();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="konteyner">
      <div className="tepa-qism">
        <h1>Top mahsulotlar</h1>

        <a href="#">
          Hammasini ko'rish
        </a>
      </div>

      <div className="panjara">
        {malumotlar.map((buyum) => (
          <Link
            key={buyum.id}
            to={`/product/${buyum.slug || buyum.id}`}
          >
            <Card
              rasm={buyum.imageUrl}
              nomi={buyum.name}
              narxi={`${buyum.discountedPrice?.toLocaleString()} ${
                buyum.currency || "UZS"
              }`}
              buyurtma={`Minimal buyurtma: ${
                buyum.minOrderQuantity
              }`}
              holat={
                buyum.isVerifiedSeller
                  ? "Tasdiqlangan Sotuvchi"
                  : "Oddiy Sotuvchi"
              }
              chegirma={
                buyum.discountPercent > 0
                  ? `-${buyum.discountPercent}%`
                  : null
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
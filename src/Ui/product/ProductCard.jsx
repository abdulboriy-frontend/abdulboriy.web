import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Card from "../card/card";
import "./ProductCard.css";

function ProductCard() {
  const { t } = useTranslation();

  const [malumotlar, setMalumotlar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const yuklash = async () => {
      try {
        const javob = await axios.get(
          "https://uzum-api.onrender.com/api/products"
        );

        if (javob.data.success) {
          setMalumotlar(javob.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    yuklash();
  }, []);

  if (loading) {
    return <div className="loading">{t("loading")}</div>;
  }

  return (
    <div className="konteyner">

      <div className="tepa-qism">
        <h1>{t("topProducts")}</h1>
        <a href="#">{t("seeAll")}</a>
      </div>

      <Swiper
        className="productSwiper"
        modules={[Autoplay]}
        loop={true}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >

        {malumotlar.map((buyum) => (
          <SwiperSlide key={buyum.id}>

            <Link to={`/product/${buyum.slug || buyum.id}`}>

              <Card
                rasm={buyum.imageUrl}
                nomi={buyum.name}
                narxi={
                  buyum.discountedPrice +
                  " " +
                  buyum.currency
                }
                buyurtma={t("minimumOrder", {
                  count: buyum.minOrderQuantity,
                })}
                holat={
                  buyum.isVerifiedSeller
                    ? t("verifiedSeller")
                    : t("normalSeller")
                }
                chegirma={
                  buyum.discountPercent
                    ? "-" + buyum.discountPercent + "%"
                    : ""
                }
              />

            </Link>

          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
}

export default ProductCard;
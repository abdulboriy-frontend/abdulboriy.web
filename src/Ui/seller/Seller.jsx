import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  MapPin,
  ShieldCheck,
  Clock3,
  ArrowRight,
} from "lucide-react";

import "./Seller.css";

const Seller = () => {
  const navigate = useNavigate();

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSellers() {
      try {
        const response = await axios.get(
          "https://uzum-api.onrender.com/api/sellers"
        );

        const data = response.data;

        setSellers(data.data || []);
      } catch (error) {
        console.error( error);
      } finally {
        setLoading(false);
      }
    }

    getSellers();
  }, []);

  if (loading) {
    return <div className="load-box"></div>;
  }

  return (
    <div className="sl-wrapper">
      <h1 className="sl-heading">
        Tasdiqlangan sotuvchilar
      </h1>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="sl-swiper"
      >
        {sellers.map((seller) => (
          <SwiperSlide key={seller.id}>
            <div className="sl-card">
              <div className="sl-thumb">
                <img
                  src={seller.logoUrl}
                  alt={seller.name}
                  className="sl-pic"
                />
              </div>

              <h2 className="sl-title">
                {seller.name}
              </h2>

              <div className="sl-pin">
                <MapPin size={15} />
                <span>
                  {seller.location}
                </span>
              </div>

              <p className="sl-exp">
                {seller.experienceLabel}
              </p>

              <div className="sl-metrics">
                <div className="st-box">
                  <ShieldCheck
                    size={16}
                    color="#ff6600"
                  />
                  <span className="st-val">
                    {seller.reliabilityScore}%
                  </span>
                  <span className="st-lbl">
                    Ishonchlilik
                  </span>
                </div>

                <div className="st-box">
                  <Clock3
                    size={16}
                    color="#ff6600"
                  />
                  <span className="st-val">
                    {seller.responseTimeLabel}
                  </span>
                  <span className="st-lbl">
                    Javob vaqti
                  </span>
                </div>
              </div>

              <button className="btn-link" onClick={() =>   navigate(`/seller/${seller.slug}`) }  >
                Sotuvchi sahifasi
                <ArrowRight size={18} />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Seller;
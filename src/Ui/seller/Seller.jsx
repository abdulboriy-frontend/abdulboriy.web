import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        console.error("Axios xatosi:", error);
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

      <div className="sl-layout">
        {sellers.map((seller) => (
          <div className="sl-card" key={seller.id}>

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

                <strong>
                  {seller.reliabilityScore}%
                </strong>

                <small>
                  Ishonchlilik
                </small>
              </div>

              <div className="st-box">
                <Clock3
                  size={16}
                  color="#ff6600"
                />

                <strong>
                  {seller.responseTimeLabel}
                </strong>

                <small>
                  Javob vaqti
                </small>
              </div>

            </div>

            <button
              className="btn-link"
              onClick={() =>
                navigate(`/seller/${seller.slug}`)
              }
            >
              Sotuvchi sahifasi
              <ArrowRight size={18} />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Seller;
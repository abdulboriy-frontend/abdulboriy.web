import React from "react";
import "./hero.css";
import {
  ChevronRight,
  Menu,
  Tv,
  Shirt,
  Wrench,
  Apple,
  Car,
  Home as HomeIcon,
  Baby,
  Sparkles
} from "lucide-react";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <div className="hero">
      <div className="hero-container">

        <div className="sidebar">

          <div className="sidebar-header">
            <Menu size={18} />
            <span>{t("categories")}</span>
          </div>

          <div className="category-list">

            <div className="category-item">
              <div className="category-info">
                <Tv className="category-icon" />
                <span>{t("electronics")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

            <div className="category-item">
              <div className="category-info">
                <Shirt className="category-icon" />
                <span>{t("clothes")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

            <div className="category-item">
              <div className="category-info">
                <Wrench className="category-icon" />
                <span>{t("construction")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

            <div className="category-item">
              <div className="category-info">
                <Apple className="category-icon" />
                <span>{t("food")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

            <div className="category-item">
              <div className="category-info">
                <Car className="category-icon" />
                <span>{t("carParts")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

            <div className="category-item">
              <div className="category-info">
                <HomeIcon className="category-icon" />
                <span>{t("home")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

            <div className="category-item">
              <div className="category-info">
                <Baby className="category-icon" />
                <span>{t("kids")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

            <div className="category-item">
              <div className="category-info">
                <Sparkles className="category-icon" />
                <span>{t("beauty")}</span>
              </div>
              <ChevronRight className="category-arrow" />
            </div>

          </div>
        </div>

        <div className="hero-banner">

          <div className="hero-content">

            <span className="hero-tag">
              {t("logistics")}
            </span>

            <h1>
              {t("heroTitle")}
            </h1>

            <p>
              {t("heroDescription")}
            </p>

            <button className="hero-btn">
              {t("details")}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Hero;
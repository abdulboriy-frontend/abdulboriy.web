import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import {
  User,
  CircleUser,
  ShoppingCart,
  Search,
  Camera,
  Menu,
  X,
  Languages,
  Package // Buyurtmalarim ikonksi uchun
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Background from "../../assets/Background.png";

function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { t, i18n } = useTranslation();

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  }

  const currentLang =
    i18n.language === "ru"
      ? "Русский"
      : i18n.language === "en"
        ? "English"
        : "O'zbekcha";

  return (
    <>
      <nav className="site-header">
        <Link to="/" className="brand-logo">
          <img src={Background} alt="Logo" className="brand-logo__image" />
          <h2 className="brand-logo__title">Minibaba</h2>
        </Link>

        <div className="search-bar">
          <div className="search-bar__field">
            <Search className="search-bar__icon" size={20} />

            <input
              type="text"
              className="search-bar__input"
              placeholder={t("search")}
            />

            <Camera className="search-bar__camera-icon" size={24} />
          </div>

          <button className="search-bar__button">
            {t("searchBtn")}
          </button>
        </div>

        <div className="nav-actions">
          <div className="lang-selector">
            <div
              className="lang-selector__trigger"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Languages size={18} />
              <span>{currentLang}</span>
            </div>

            {isLangOpen && (
              <div className="lang-selector__dropdown">
                <div
                  className="lang-selector__option"
                  onClick={() => changeLanguage("uz")}
                >
                  O'zbekcha
                </div>

                <div
                  className="lang-selector__option"
                  onClick={() => changeLanguage("ru")}
                >
                  Русский
                </div>

                <div
                  className="lang-selector__option"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </div>
              </div>
            )}
          </div>

          {/* Savat */}
          <Link to="/cart" className="action-button">
            <div className="action-button__badge-container">
              <ShoppingCart className="action-button__icon" size={22} />

              {cartCount > 0 && (
                <span className="action-button__badge">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="action-button__label">{t("cart") || "Savat"}</span>
          </Link>

          {/* Buyurtmalarim (Yangi qo'shildi) */}
          <Link to="/orders" className="action-button">
            <Package className="action-button__icon" size={22} />
            <span className="action-button__label">{t("orders") || "Buyurtmalarim"}</span>
          </Link>

          {/* Profil / Kirish */}
          <Link to="/profile" className="action-button">
            <CircleUser className="action-button__icon" size={22} />
            <span className="action-button__label">{t("profileTitle") || "Profile"}</span>
          </Link>

          <Link to="/login" className="action-button">
            <User className="action-button__icon" size={22} />
            <span className="action-button__label">{t("login") || "Kirish"}</span>
          </Link>
        </div>

        <button
          className="mobile-toggle-btn"
          onClick={() => setOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* MOBIL MENYU */}
      {open && (
        <div
          className="mobile-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer__header">
              <Link
                to="/"
                className="brand-logo"
                onClick={() => setOpen(false)}
              >
                <img
                  src={Background}
                  alt="Logo"
                  className="brand-logo__image"
                />

                <h2 className="brand-logo__title">Minibaba</h2>
              </Link>

              <button
                className="mobile-drawer__close-btn"
                onClick={() => setOpen(false)}
              >
                <X size={26} />
              </button>
            </div>

            <hr className="mobile-drawer__divider" />

            <div className="mobile-drawer__search">
              <div className="mobile-search-box">
                <Search className="mobile-search-box__icon" size={18} />

                <input
                  type="text"
                  className="mobile-search-box__input"
                  placeholder={t("searchMobile")}
                />

                <button className="mobile-search-box__button">
                  {t("searchBtn")}
                </button>
              </div>
            </div>

            <div className="mobile-drawer__footer">
              <div className="lang-selector">
                <div
                  className="lang-selector__trigger"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                >
                  <Languages size={18} />
                  <span>{currentLang}</span>
                </div>

                {isLangOpen && (
                  <div className="lang-selector__dropdown">
                    <div
                      className="lang-selector__option"
                      onClick={() => changeLanguage("uz")}
                    >
                      O'zbekcha
                    </div>

                    <div
                      className="lang-selector__option"
                      onClick={() => changeLanguage("ru")}
                    >
                      Русский
                    </div>

                    <div
                      className="lang-selector__option"
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </div>
                  </div>
                )}
              </div>

              <div className="mobile-drawer__actions">
                <Link
                  to="/cart"
                  className="action-button"
                  onClick={() => setOpen(false)}
                >
                  <div className="action-button__badge-container">
                    <ShoppingCart className="action-button__icon" size={22} />

                    {cartCount > 0 && (
                      <span className="action-button__badge">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="action-button__label">{t("cart") || "Savat"}</span>
                </Link>

                <Link
                  to="/orders"
                  className="action-button"
                  onClick={() => setOpen(false)}
                >
                  <Package className="action-button__icon" size={22} />
                  <span className="action-button__label">{t("orders") || "Buyurtmalarim"}</span>
                </Link>

                <Link
                  to="/profile"
                  className="action-button"
                  onClick={() => setOpen(false)}
                >
                  <CircleUser className="action-button__icon" size={22} />
                  <span className="action-button__label">{t("profileTitle") || "Profile"}</span>
                </Link>

                <Link
                  to="/login"
                  className="action-button"
                  onClick={() => setOpen(false)}
                >
                  <User className="action-button__icon" size={22} />
                  <span className="action-button__label">{t("login") || "Kirish"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
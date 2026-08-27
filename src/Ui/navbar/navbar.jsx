import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, CircleUser, ShoppingCart, Search, Camera, Menu, X, Languages, Package, LogOut } from "lucide-react";
import Background from "../../assets/Background.png";
import "./navbar.css";

const LANGUAGES = [
  { code: "uz", label: "O'zbekcha" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

function Navbar({ cartCount = 0 }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
    setIsMobileOpen(false);
    navigate("/login");
  };

  const getCurrentLanguageLabel = () => {
    const found = LANGUAGES.find((lang) => lang.code === i18n.language);
    return found ? found.label : "O'zbekcha";
  };

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand-logo">
          <img src={Background} alt="Minibaba Logo" className="brand-logo__image" />
          <h2 className="brand-logo__title">Minibaba</h2>
        </Link>

        <div className="search-bar">
          <div className="search-bar__field">
            <Search className="search-bar__icon" size={20} />
            <input type="text" className="search-bar__input" placeholder={t("search")} />
            <Camera className="search-bar__camera-icon" size={24} />
          </div>
          <button type="button" className="search-bar__button">{t("searchBtn")}</button>
        </div>

        <div className="nav-actions">
          <div className="lang-selector">
            <button type="button" className="lang-selector__trigger" onClick={() => setIsLangOpen((prev) => !prev)}>
              <Languages size={18} />
              <span>{getCurrentLanguageLabel()}</span>
            </button>

            {isLangOpen && (
              <div className="lang-selector__dropdown">
                {LANGUAGES.map((lang) => (
                  <button key={lang.code} type="button" className="lang-selector__option" onClick={() => changeLanguage(lang.code)}>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" className="action-button">
            <div className="action-button__badge-container">
              <ShoppingCart className="action-button__icon" size={22} />
              {cartCount > 0 && <span className="action-button__badge">{cartCount}</span>}
            </div>
            <span className="action-button__label">{t("cart") || "Savat"}</span>
          </Link>

          <Link to="/orders" className="action-button">
            <Package className="action-button__icon" size={22} />
            <span className="action-button__label">{t("orders") || "Buyurtmalarim"}</span>
          </Link>

          {currentUser ? (
            <>
              <Link to="/profile" className="action-button">
                <CircleUser className="action-button__icon" size={22} />
                <span className="action-button__label">{currentUser.name ? currentUser.name.split(" ")[0] : "Profil"}</span>
              </Link>
              <button type="button" className="action-button logout-btn" onClick={handleLogout}>
                <LogOut className="action-button__icon" size={22} color="#ff4d4f" />
                <span className="action-button__label" style={{ color: "#ff4d4f" }}>Chiqish</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="action-button">
              <User className="action-button__icon" size={22} />
              <span className="action-button__label">{t("login") || "Kirish"}</span>
            </Link>
          )}
        </div>

        <button type="button" className="mobile-toggle-btn" onClick={() => setIsMobileOpen(true)}>
          <Menu size={28} />
        </button>
      </header>

      {isMobileOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer__header">
              <Link to="/" className="brand-logo" onClick={() => setIsMobileOpen(false)}>
                <img src={Background} alt="Minibaba Logo" className="brand-logo__image" />
                <h2 className="brand-logo__title">Minibaba</h2>
              </Link>
              <button type="button" className="mobile-drawer__close-btn" onClick={() => setIsMobileOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <hr className="mobile-drawer__divider" />

            <div className="mobile-drawer__actions">
              <Link to="/cart" className="action-button" onClick={() => setIsMobileOpen(false)}>
                <ShoppingCart size={22} />
                <span>{t("cart") || "Savat"}</span>
              </Link>

              <Link to="/orders" className="action-button" onClick={() => setIsMobileOpen(false)}>
                <Package size={22} />
                <span>{t("orders") || "Buyurtmalarim"}</span>
              </Link>

              {currentUser ? (
                <>
                  <Link to="/profile" className="action-button" onClick={() => setIsMobileOpen(false)}>
                    <CircleUser size={22} />
                    <span>{currentUser.name || "Profil"}</span>
                  </Link>
                  <button type="button" className="action-button" onClick={handleLogout}>
                    <LogOut size={22} color="#ff4d4f" />
                    <span style={{ color: "#ff4d4f" }}>Chiqish</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="action-button" onClick={() => setIsMobileOpen(false)}>
                  <User size={22} />
                  <span>{t("login") || "Kirish"}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
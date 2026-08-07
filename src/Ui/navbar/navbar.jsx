import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import {
  User,
  ShoppingCart,
  Search,
  Camera,
  Menu,
  X,
  Languages,
} from "lucide-react";
import Background from "../../assets/Background.png";

function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("O'zbekcha");
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={Background} alt="Logo" className="logo-img" />
          <h2>Minibaba</h2>
        </Link>

        <div className="search-wrapper">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Mahsulot yoki sotuvchini qidiring..."
            />
            <Camera className="camera-icon" />
          </div>

          <button className="search-btn">Qidirish</button>
        </div>

        <div className="menu">
          <div className="lang-dropdown">
            <div className="lang-box" onClick={() => setIsLangOpen(!isLangOpen)}  >
              <Languages size={18} />
              <span>{lang}</span>
            </div>

            {isLangOpen && (
              <div className="lang-menu">
        <div className="lang-item" onClick={() => { setLang("O'zbekcha"); setIsLangOpen(false); }}  >  O'zbekcha </div>
            
       <div className="lang-item" onClick={() => { setLang("Русский"); setIsLangOpen(false); }} > Русский</div>

       <div className="lang-item" onClick={() => { setLang("English"); setIsLangOpen(false); }}>   English </div>

              </div>
            )}

          </div>

          <Link to="/login" className="icon-btn">
            <User className="nav-icon" />
            <span>Kirish</span>
          </Link>

          <Link to="/cart" className="icon-btn">
            <div className="cart-icon-wrapper">
              <ShoppingCart className="nav-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span>Savat</span>
          </Link>
        </div>

        <button className="hamburger" onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>      {open && (
        <div className="mobile-modal" onClick={() => setOpen(false)}>
          <div
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-header">

              <Link to="/" className="logo" onClick={() => setOpen(false)}>
                <img src={Background} alt="Logo" className="logo-img" />
                <h2>Minibaba</h2>
              </Link>

              <button className="close-btn" onClick={() => setOpen(false)} >
                <X size={26} />
              </button>
            </div>

            <hr className="mobile-line" />

            <div className="mobile-search">
              <div className="mobile-search-box">
                <Search className="search-icon" />
                <input type="text" placeholder="Mahsulotlarni qidiring..." />
                <button className="mobile-search-btn">
                  Qidirish
                </button>
              </div>
            </div>

            <div className="mobile-bottom">
              <div className="lang-dropdown">
                <div
                  className="lang-box"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                >
                  <Languages size={18} />
                  <span>{lang}</span>
                </div>

                {isLangOpen && (
                  <div className="lang-menu">
         <div  className="lang-item"   onClick={() => {  setLang("O'zbekcha");setIsLangOpen(false);  }}  >
                      O'zbekcha
                    </div>

    <div  className="lang-item" onClick={() => {   setLang("Русский");   setIsLangOpen(false); }}   >
                      Русский
                    </div>

   <div className="lang-item" onClick={() => {  setLang("English");  setIsLangOpen(false);}} >
                      English
                    </div>
                  </div>
                )}
              </div>

              <div className="mobile-icons">
                <Link to="/cart" className="icon-btn" onClick={() => setOpen(false)} >
                  <div className="cart-icon-wrapper">
                    <ShoppingCart className="nav-icon" />
                    {cartCount > 0 && (
                      <span className="cart-badge">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span>Savat</span>
                </Link>

                <Link to="/login" className="icon-btn" onClick={() => setOpen(false)}>
                  <User className="nav-icon" />
                  <span>Kirish</span>
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
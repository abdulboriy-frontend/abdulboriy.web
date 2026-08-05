import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { User, ShoppingCart, Search, Camera } from "lucide-react";
import Background from "../../assets/Background.png";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">

    <div className="logo">
  <Link to="/">
    <img
      src={Background}
      alt="Logo"
      className="logo-img"
    />  
  </Link>
<h2>Minibaba</h2>
</div>

      <div className="search-wrapper">

        <div className="search-container">

          <Search className="search-icon" />

          <input
            type="text"
            placeholder="Mahsulot yoki sotuvchini qidiring..."
          />

          <Camera className="camera-icon" />

        </div>

        <button className="search-btn">
          Qidirish
        </button>

      </div>

      <div className="menu">

        <a href="#" className="menu-link">
          Kategoriyalar
        </a>

        <a href="#" className="menu-link">
          Yordam
        </a>

        <Link
          to="/login"
          className="icon-btn"
        >
          <User className="nav-icon" />

          <span>
            Kirish
          </span>
        </Link>

        <Link
          to="/cart"
          className="icon-btn cart-link"
        >

          <div className="cart-icon-wrapper">

            <ShoppingCart className="nav-icon" />

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}

          </div>

          <span>
            Savat
          </span>

        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
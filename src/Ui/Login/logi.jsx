import React, { useState } from "react";
import "./logi.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    navigate("/");
  };

  return (
    <div className="login-container">

      <footer className="login-footer-top">
        <a href="#about">Biz haqimizda</a>
        <a href="#contacts">Aloqa</a>
        <a href="#terms">Foydalanish qoidalari</a>
        <p>© 2024 Minibaba Marketplace. Barcha huquqlar himoyalangan.</p>
      </footer>

      <form className="login-card" onSubmit={handleSubmit}>

        <div className="lock-icon-wrapper">
          <i className="fas fa-lock-open lock-icon"></i>
        </div>

        <h2 className="login-title">Xush kelibsiz!</h2>
        <p className="login-subtitle">
          Kirish va xaridni davom ettirish
        </p>

        <div className="sms-badge">
          <span className="dot"></span> SMS KOD ORQALI KIRISH
        </div>

        <div className="form-group">
          <label>Telefon raqami</label>

          <div className="input-wrapper">
            <span className="country-code">+998</span>

<input type="text" placeholder="90 123 45 67"value={phone}onChange={(e) => setPhone(e.target.value)}   required />
          </div>

          <span className="input-hint">
            Sizga SMS orqali tasdiqlash kodi yuboriladi.
          </span>
        </div>

        <button type="submit" className="btn-primary">
          Kirish
        </button>

        <div className="divider">
          <span>yoki</span>
        </div>

        <button type="button" className="btn-secondary">
          Ro'yxatdan o'tish
        </button>

        <div className="social-login">
          <button type="button" className="social-btn">
            <i className="fab fa-google text-google"></i>
          </button>

          <button type="button" className="social-btn">
            <i className="fab fa-facebook text-facebook"></i>
          </button>
        </div>

        <p className="terms-text">
          Davom etish orqali siz bizning{" "}
          <a href="#terms">Xizmat ko'rsatish shartlari</a> va{" "}
          <a href="#privacy">Maxfiylik siyosatimizga</a> rozilik bildirasiz.
        </p>

      </form>

    </div>
  );
}
import React, { useState } from "react";
import "./logi.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-container">

      <footer className="login-footer-top">
        <a href="#about">{t("about")}</a>
        <a href="#contacts">{t("contacts")}</a>
        <a href="#terms">{t("rules")}</a>

        <p>
          © 2026 Minibaba Marketplace. {t("rights")}.
        </p>
      </footer>

      <form className="login-card" onSubmit={handleSubmit}>

        <div className="lock-icon-wrapper">
          <i className="fas fa-lock-open lock-icon"></i>
        </div>

        <h2 className="login-title">
          {t("welcome")}
        </h2>

        <p className="login-subtitle">
          {t("loginContinue")}
        </p>

        <div className="sms-badge">
          <span className="dot"></span>
          {t("smsLogin")}
        </div>

        <div className="form-group">
          <label>{t("phoneNumber")}</label>

          <div className="input-wrapper">
            <span className="country-code">+998</span>

            <input
              type="text"
              placeholder="90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <span className="input-hint">
            {t("smsHint")}
          </span>
        </div>

        <button type="submit" className="btn-primary">
          {t("login")}
        </button>

        <div className="divider">
          <span>{t("or")}</span>
        </div>

        <button type="button" className="btn-secondary">
          {t("register")}
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
          {t("termsText")}{" "}

          <a href="#terms">
            {t("terms")}
          </a>{" "}

          {t("privacy")}
        </p>

      </form>

    </div>
  );
}
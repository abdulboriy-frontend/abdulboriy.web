import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./logi.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = { email, password };
    console.log(formData);

    axios.post("https://uzum-api.onrender.com/api/auth/login", formData)
      .then((result) => {
        console.log(result.data);

        if (result.data.success) {
          const user = result.data.data;
          console.log(user);

          localStorage.setItem("accessToken", user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));

          navigate("/");
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        alert(err.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={onSubmit}>
        <div className="lock-icon-wrapper">
          <i className="fa-solid fa-lock lock-icon"></i>
        </div>

        <h1 className="login-title">{t("loginTitle")}</h1>
        <p className="login-subtitle">{t("loginSubtitle")}</p>

        <div className="form-group">
          <label>{t("emailLabel")}</label>
          <input
            type="text"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>{t("passwordLabel")}</label>
          <input
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="forgot-password-wrapper">
          <button type="button" className="forgot-password-link">
            {t("forgotPassword")}
          </button>
        </div>

        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? <span className="loader"></span> : t("loginButton")}
        </button>

        <div className="divider">
          <span>{t("or")}</span>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/register")}
        >
          {t("registerButton")}
        </button>
      </form>
    </div>
  );
};

export default Login;
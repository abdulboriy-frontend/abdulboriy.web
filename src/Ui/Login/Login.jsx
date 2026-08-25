import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./logi.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = { email, password };

    axios
      .post("https://uzum-api.onrender.com/api/auth/login", formData)
      .then((result) => {
        if (result.data.success && result.data.data) {
          const user = result.data.data;

          localStorage.setItem("accessToken", user.accessToken || "");
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Login muvaffaqiyatli!", {
            position: "top-right",
            autoClose: 1000,
            theme: "colored",
          });

          // Login muvaffaqiyatli bo'lsa -> Register sahifasiga o'tadi
          setTimeout(() => {
            navigate("/Register");
          }, 1000);
        } else {
          toast.error(result.data.message || "Login yoki parol xato!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Serverda xatolik!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <form className="login-card" onSubmit={onSubmit}>
        <div className="lock-icon-wrapper">
          <i className="fa-solid fa-lock lock-icon"></i>
        </div>

        <h1 className="login-title">{t("loginTitle")}</h1>
        <p className="login-subtitle">{t("loginSubtitle")}</p>

        <div className="form-group">
          <label>{t("emailLabel")}</label>
          <input
            type="email"
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

        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? <span className="loader"></span> : t("loginButton")}
        </button>

        <div className="divider">
          <span>{t("or")}</span>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/Register")}
        >
          {t("registerButton")}
        </button>
      </form>
    </div>
  );
};

export default Login;
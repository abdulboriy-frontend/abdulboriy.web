import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post("https://uzum-api.onrender.com/api/auth/register", { name, email, password })
      .then((result) => {
        if (result.data.success) {
          const user = result.data.data;
          if (user?.accessToken) localStorage.setItem("accessToken", user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Ro'yxatdan o'tildi!", { position: "top-right", autoClose: 1000, theme: "colored" });
          setTimeout(() => navigate("/"), 1000);
        } else {
          toast.error(result.data.message || "Xatolik yuz berdi!", { position: "top-right", autoClose: 3000, theme: "colored" });
        }
      })
      .catch((err) => toast.error(err.response?.data?.message || "Serverda xatolik!", { position: "top-right", autoClose: 3000, theme: "colored" }))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="register-page">
      <ToastContainer />
      <form className="register-card" onSubmit={onSubmit}>
        <h1>{t("registerTitle")}</h1>
        <p>{t("registerSubtitle")}</p>

        <div className="form-group">
          <label>{t("nameLabel")}</label>
          <input type="text" placeholder={t("namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>{t("emailLabel")}</label>
          <input type="email" placeholder={t("registerEmailPlaceholder")} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>{t("passwordLabel")}</label>
          <input type="password" placeholder={t("registerPasswordPlaceholder")} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button className="register-btn" type="submit" disabled={isLoading}>
          {isLoading ? <span className="loader"></span> : t("registerSubmit")}
        </button>

        <div className="divider"><span>{t("or")}</span></div>

        <button type="button" className="login-btn" onClick={() => navigate("/login")}>
          {t("loginHere")}
        </button>
      </form>
    </div>
  );
};

export default Register;
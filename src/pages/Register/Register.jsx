import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name,
      email,
      password
    };

    console.log(formData);

    axios.post("https://uzum-api.onrender.com/api/auth/register", formData)
      .then((result) => {
        console.log(result.data);

        if (result.data.success) {
          const user = result.data.data;
          console.log(user);
          
          if (user?.accessToken) {
            localStorage.setItem("accessToken", user.accessToken);
          }

          localStorage.setItem("user", JSON.stringify(user));

          navigate("/login");
        } else {
          alert(
            result.data.message
          );
        }
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);

        alert(
          err.response?.data?.message
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={onSubmit}>

        <h1>{t("registerTitle")}</h1>

        <p>{t("registerSubtitle")}</p>

        <div className="form-group">
          <label>{t("nameLabel")}</label>

      <input type="text" placeholder={t("namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)}  required />
        </div>

        <div className="form-group">
          <label>{t("emailLabel")}</label>

          <input type="text" placeholder={t("registerEmailPlaceholder")}  value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>{t("passwordLabel")}</label>

          <input  type="password"  placeholder={t("registerPasswordPlaceholder")}  value={password}  onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="register-btn"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            t("registerSubmit")
          )}
        </button>

        <div className="divider">
          <span>{t("or")}</span>
        </div>

        <button
          className="login-btn"
          type="button"
          onClick={() => navigate("/login")}
        >
          {t("loginHere")}
        </button>

      </form>
    </div>
  );
};

export default Register;
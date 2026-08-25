import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("User ma'lumotlarini o'qishda xatolik:", e);
      }
    }
  }, []);

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-circle">
          <span>{firstLetter}</span>
        </div>

        <h1 className="profile-title">Profile</h1>
        <p className="profile-subtitle">Shaxsiy hisob ma'lumotlaringiz</p>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">ID</span>
            <span className="detail-value">{user?.id || user?._id || "—"}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user?.email || "—"}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value">{user?.name || "—"}</span>
          </div>
        </div>

        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
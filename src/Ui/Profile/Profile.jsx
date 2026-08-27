import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ShoppingCart, MapPin, LogOut, Camera, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Profile.css';

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('personalInfo');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', region: 'Toshkent shahri', currentPassword: '', newPassword: '', confirmPassword: '' });

  const [orderNotify, setOrderNotify] = useState(true);
  const [promoNotify, setPromoNotify] = useState(false);
  const [pushNotify, setPushNotify] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData((prev) => ({ ...prev, name: parsedUser.name || '', email: parsedUser.email || '', phone: parsedUser.phone || '' }));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="jj-box">
      <div className="hh-side">
        <div className="kk-list">
          <button className={`kk-item ${activeTab === 'personalInfo' ? 'active' : ''}`} onClick={() => setActiveTab('personalInfo')}>
            <User className="icon" /><span>{t('profile.personalInfo')}</span>
          </button>
          <button className={`kk-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            <ShieldCheck className="icon" /><span>{t('profile.security')}</span>
          </button>
          <button className={`kk-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingCart className="icon" /><span>{t('profile.orderHistory')}</span>
          </button>
          <button className={`kk-item ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>
            <MapPin className="icon" /><span>{t('profile.deliveryAddress')}</span>
          </button>
        </div>

        <div className="hh-line"></div>

        <button onClick={handleLogout} className="hh-out" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
          <LogOut className="icon" /><span>{t('profile.logout')}</span>
        </button>
      </div>

      <div className="jj-main">
        <div className="jj-card hh-user">
          <div className="kk-pic-wrap">
            <div className="kk-pic">
              {user?.avatar ? <img src={user.avatar} alt={formData.name} className="avatar-img" /> : <div className="avatar-circle"><span>{firstLetter}</span></div>}
            </div>
            <div className="kk-cam"><Camera className="camera-icon" /></div>
          </div>
          <div className="kk-info">
            <h1 className="jj-name">{formData.name || 'Foydalanuvchi'}</h1>
            <p className="jj-date">ID: {user?.id || user?._id || '—'}</p>
            <p className="jj-date">{t('profile.lastUpdate')}: 12-Avgust, 2023</p>
          </div>
        </div>

        <div className="jj-card">
          <div className="hh-head"><div className="kk-mark"></div><h2>{t('profile.basicInfo')}</h2></div>
          <div className="jj-grid-2">
            <div className="kk-group">
              <label>{t('profile.fullName')}</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Azizbek Komilov" />
            </div>
            <div className="kk-group">
              <label>{t('profile.phoneLabel')}</label>
              <div className="hh-badge-input">
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+998 90 123 45 67" />
                <span className="kk-badge"><CheckCircle className="badge-icon" />{t('profile.verified')}</span>
              </div>
            </div>
            <div className="kk-group">
              <label>{t('profile.emailLabel')}</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="azizbek.k@gmail.com" />
            </div>
            <div className="kk-group">
              <label htmlFor="region-select">{t('profile.regionCity')}</label>
              <div className="region-select-wrapper">
                <select id="region-select" name="region" value={formData.region} onChange={handleInputChange} className="region-select">
                  <option>Toshkent shahri</option>
                  <option>Toshkent viloyati</option>
                  <option>Andijon viloyati</option>
                  <option>Buxoro viloyati</option>
                  <option>Farg'ona viloyati</option>
                  <option>Jizzax viloyati</option>
                  <option>Xorazm viloyati</option>
                  <option>Namangan viloyati</option>
                  <option>Navoiy viloyati</option>
                  <option>Qashqadaryo viloyati</option>
                  <option>Qoraqalpog'iston Respublikasi</option>
                  <option>Samarqand viloyati</option>
                  <option>Sirdaryo viloyati</option>
                  <option>Surxondaryo viloyati</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="jj-card">
          <div className="hh-head"><div className="kk-mark"></div><h2>{t('profile.securitySettings')}</h2></div>
          <p className="jj-sub">{t('profile.securitySub')}</p>
          <div className="jj-grid-3">
            <div className="kk-group">
              <label>{t('profile.currentPassword')}</label>
              <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} placeholder="........" />
            </div>
            <div className="kk-group">
              <label>{t('profile.newPassword')}</label>
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} placeholder={t('profile.min8chars')} />
            </div>
            <div className="kk-group">
              <label>{t('profile.confirmPassword')}</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder={t('profile.reEnter')} />
            </div>
          </div>
        </div>

        <div className="jj-card">
          <div className="hh-head"><div className="kk-mark"></div><h2>{t('profile.notifications')}</h2></div>
          <div className="notify-list">
            <div className="notify-item">
              <div><h3>{t('profile.orderStatusNotify')}</h3><p>{t('profile.orderStatusNotifySub')}</p></div>
              <label className="switch">
                <input type="checkbox" checked={orderNotify} onChange={(e) => setOrderNotify(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="notify-item">
              <div><h3>{t('profile.promoNotify')}</h3><p>{t('profile.promoNotifySub')}</p></div>
              <label className="switch">
                <input type="checkbox" checked={promoNotify} onChange={(e) => setPromoNotify(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="notify-item">
              <div><h3>{t('profile.pushNotify')}</h3><p>{t('profile.pushNotifySub')}</p></div>
              <label className="switch">
                <input type="checkbox" checked={pushNotify} onChange={(e) => setPushNotify(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn-cancel" onClick={() => navigate('/')}>{t('profile.cancel')}</button>
          <button className="btn-save" onClick={() => alert('Saqlandi!')}>{t('profile.saveChanges')}</button>
        </div>
      </div>
    </div>
  );
}
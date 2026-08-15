import "./footer.css";
import { Package, Globe, Mail, Phone, ChevronRight, Apple, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">

      <div className="footer_top">

        <div className="footer_box">
          <div className="logo">
            <Package size={28} />
            <h2>Minibaba</h2>
          </div>

          <p className="desc">
            {t("footerDescription")}
          </p>

          <div className="social">
            <a href="#" className="icon"><Globe size={18} /></a>
            <a href="#" className="icon"><Mail size={18} /></a>
            <a href="#" className="icon"><Phone size={18} /></a>
          </div>
        </div>

        <div className="footer_box">
          <h3>{t("buyers")}</h3>

          <a href="#"><ChevronRight size={16} />{t("howToOrder")}</a>
          <a href="#"><ChevronRight size={16} />{t("paymentMethods")}</a>
          <a href="#"><ChevronRight size={16} />{t("deliveryFooter")}</a>
          <a href="#"><ChevronRight size={16} />{t("warranty")}</a>
        </div>

        <div className="footer_box">
          <h3>{t("sellers")}</h3>

          <a href="#"><ChevronRight size={16} />{t("becomeSeller")}</a>
          <a href="#"><ChevronRight size={16} />{t("sellerRules")}</a>
          <a href="#"><ChevronRight size={16} />{t("advertising")}</a>
          <a href="#"><ChevronRight size={16} />{t("logisticsHelp")}</a>
        </div>

        <div className="footer_box">
          <h3>{t("downloadApp")}</h3>

          <p className="desc">
            {t("appDescription")}
          </p>

          <button className="store">
            <Apple size={22} />
            <div>
              <small>Download on the</small>
              <span>App Store</span>
            </div>
          </button>

          <button className="store">
            <Play size={20} />
            <div>
              <small>GET IT ON</small>
              <span>Google Play</span>
            </div>
          </button>
        </div>

      </div>

      <div className="footer_bottom">
        {t("copyright")}
      </div>

    </footer>
  );
}

export default Footer;
import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {
  Home,ChevronRight,MapPin,ShieldCheck,Clock3,Award,
  Package,UserPlus,MessageCircle,ShoppingCart
} from "lucide-react";
import "./SellerCard.css";

const SellerCard=()=>{
  const {slug}=useParams();
  const {t}=useTranslation();
  const [seller,setSeller]=useState(null);
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    async function getSeller(){
      try{
        const sellerRes=await axios.get(`https://uzum-api.onrender.com/api/sellers/${slug}`);

        if(sellerRes.data.success)setSeller(sellerRes.data.data);

        const productRes=await axios.get("https://uzum-api.onrender.com/api/products");

        if(productRes.data.success){
          setProducts(
            productRes.data.data.filter(
              product=>product.seller?.slug===slug
            )
          );
        }
      }catch(error){
        console.error("Axios xatosi:",error);
      }finally{
        setLoading(false);
      }
    }

    getSeller();
  },[slug]);

  if(loading)return <h2 className="loading">{t("loading")}</h2>;

  if(!seller)return <h2 className="loading">{t("sellerNotFound")}</h2>;

  return(
    <div className="seller-container">

      <div className="breadcrumb">
        <Home size={16}/>
        <ChevronRight size={15}/>
        <span>{t("suppliers")}</span>
        <ChevronRight size={15}/>
        <span>{seller.name}</span>
      </div>

      <div className="seller-header">

        <div className="seller-left">
          <img
            src={seller.logoUrl}
            alt={seller.name}
            className="seller-logo"
          />

          <div className="seller-info">

            <div className="seller-title">
              <h1>{seller.name}</h1>

              {seller.isVerified&&(
                <span className="verified-badge">
                  <ShieldCheck size={16}/>
                  {t("verified")}
                </span>
              )}
            </div>

            <p className="seller-location">
              <MapPin size={16}/>
              {seller.location}
            </p>

            <div className="seller-badges">

              <span>
                <ShieldCheck size={15}/>
                {seller.reliabilityLabel}
              </span>

              <span>
                <Clock3 size={15}/>
                {seller.responseTimeLabel}
              </span>

              <span>
                <Award size={15}/>
                {seller.experienceLabel}
              </span>

              <span>
                <Package size={15}/>
                {products.length} {t("productCount")}
              </span>

            </div>
          </div>
        </div>

        <div className="seller-actions">

          <button className="follow-btn">
            <UserPlus size={18}/>
            {t("follow")}
          </button>

          <button className="message-btn">
            <MessageCircle size={18}/>
            {t("sendMessage")}
          </button>

        </div>
      </div>

      <div className="seller-tabs">
        <button className="active">{t("products")}</button>
        <button>{t("aboutCompany")}</button>
      </div>

      <div className="products-grid">

        {products.length>0?(
          products.map(product=>(
            <div className="product-card" key={product.id}>

              <div className="product-image">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>

              <div className="product-body">
                <h3>{product.name}</h3>

                <p className="product-price">
                  {Number(product.price).toLocaleString()} so'm
                </p>

                <span className="stock">
                  {t("inStock")}
                </span>
              </div>

              <button className="cart-btn">
                <ShoppingCart size={18}/>
              </button>

            </div>
          ))
        ):(
          <div className="no-products">
            {t("productsNotFound")}
          </div>
        )}

      </div>
    </div>
  );
};

export default SellerCard;
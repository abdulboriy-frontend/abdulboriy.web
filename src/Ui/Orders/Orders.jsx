import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.warning("Iltimos avval tizimga kiring!");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("https://uzum-api.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data || res.data.orders || res.data || [];
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Buyurtmalarni yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getOrders(); }, []);

  if (loading) return <div className="orders-page"><div className="orders-header"><h1>Mening Buyurtmalarim</h1><p>Yuklanmoqda...</p></div></div>;

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Mening Buyurtmalarim</h1>
        <p>Jami buyurtmalar: {orders.length}</p>
      </div>

      <div className="orders-container">
        {orders.length === 0 ? (
          <div className="no-orders">
            <h2>Hali buyurtma bermagansiz</h2>
            <p>Xarid qilishni boshlash uchun do'konimizga o'ting</p>
            <button className="shop-btn" onClick={() => navigate("/")}>Do'konga o'tish</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div className="order-card" key={order._id || order.id || index}>
                <div className="order-header">
                  <span>Buyurtma #{index + 1}</span>
                  <span>{order.status || "Jarayonda"}</span>
                </div>

                {(order.items || []).map((item, i) => (
                  <div className="order-body" key={item.productId || i}>
                    <img
                      className="order-image"
                      src={item.imageUrl || item.product?.imageUrl || "https://via.placeholder.com/70"}
                      alt={item.name || "Mahsulot"}
                    />
                    <div className="order-info">
                      <h3>{item.name || item.product?.name}</h3>
                      <span>Soni: {item.quantity || 1}</span>
                      <span>Narxi: {item.price || 0} {order.currency || ""}</span>
                    </div>
                  </div>
                ))}

                <div className="order-footer">
                  <b>Jami: {order.total || 0} {order.currency || ""}</b>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
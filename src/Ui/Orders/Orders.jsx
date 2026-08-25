import React, { useState, useEffect } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="orders-wrapper">
      <h1 className="orders-main-title">Mening Buyurtmalarim</h1>
      <p className="orders-count-text">Jami buyurtmalar: {orders.length}</p>

      <div className="orders-card-container">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order.id || index} className="order-item-card">
              <div className="order-card-header">
                <span className="order-number-title">Buyurtma #{index + 1}</span>
                <span className="order-status-badge">JARAYONDA</span>
              </div>

              <div className="order-card-content">
                <img
src={order.image || "https://via.placeholder.com/100"}
                  alt={order.name}
                  className="order-product-image"
                />
                <div className="order-product-details">
                  <h3 className="order-product-title">{order.name}</h3>
                  <p className="order-product-id">
                    <strong>ID:</strong> {order.id}
                  </p>
                  <p className="order-product-qty">
                    <strong>Soni:</strong> {order.quantity}
                  </p>
                  <p className="order-product-price">
                    <strong>Narxi:</strong>{" "}
                    <span className="price-highlight">${order.price}.00</span>
                  </p>
                </div>
              </div>

              <div className="order-card-footer">
 <button className="order-delete-btn"onClick={() => handleDelete(order.id)} >
                  O'chirish
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders-msg">Hozircha buyurtmalar yo'q</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
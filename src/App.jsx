import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./Ui/navbar/navbar";
import Hero from "./Ui/hero/hero";
import ProductCard from "./Ui/product/ProductCard";
import Seller from "./Ui/seller/Seller";
import Footer from "./Ui/footer/footer";
import Login from "./Ui/Login/Login";
import SellerCard from "./Ui/sellerCard/SellerCard";

import Regsiter from "./pages/Register/Register";
import ProductDetail from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";

function Home() {
  return (
    <>
      <Hero />
      <ProductCard />
      <Seller />
    </>
  );
}

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("minibaba-cart");

    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error(error);
      }
    }

    return [];
  });

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=3"
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "minibaba-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  function handleAddToCart(product, quantity, variant) {
    setCartItems((oldItems) => {
      const existingItem = oldItems.find(
        (item) =>
          item.id === product.id &&
          item.variant === variant
      );

      if (existingItem) {
        return oldItems.map((item) =>
          item.id === product.id &&
          item.variant === variant
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      const newItem = {
        id: product.id,
        name:
          product.name ||
          product.title ||
          "Nomsiz mahsulot",
        image:
          product.image ||
          product.imageUrl ||
          "",
        price: Number(product.price) || 0,
        quantity: quantity,
        variant: variant,
      };

      return [...oldItems, newItem];
    });
  }

  function increaseCartItem(id, variant) {
    setCartItems((oldItems) =>
      oldItems.map((item) =>
        item.id === id &&
        item.variant === variant
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseCartItem(id, variant) {
    setCartItems((oldItems) =>
      oldItems.map((item) =>
        item.id === id &&
        item.variant === variant
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      )
    );
  }

  function removeCartItem(id, variant) {
    setCartItems((oldItems) =>
      oldItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.variant === variant
          )
      )
    );
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Regsiter />}
        />

        <Route
          path="/product/:slug"
          element={
            <ProductDetail
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              increaseCartItem={increaseCartItem}
              decreaseCartItem={decreaseCartItem}
              removeCartItem={removeCartItem}
            />
          }
        />

        <Route
          path="/seller/:slug"
          element={<SellerCard />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
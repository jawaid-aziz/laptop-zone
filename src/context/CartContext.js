"use client"; // Important for Next.js App Router

import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const CartContext = createContext();

// Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Persist cart in localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Cart Actions
  const addToCart = (product) => {
    setCart((prev) => {
      // check if already exists
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart
export const useCart = () => useContext(CartContext);

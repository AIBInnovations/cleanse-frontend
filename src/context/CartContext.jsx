"use client";
import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) => {
          if (item.name === product.name) {
            const currentQuantity = Number(item.quantity) || 1;
            return { ...item, quantity: currentQuantity + 1 };
          }
          return item;
        });
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== productName)
    );
  };

  const updateQuantity = (productName, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === productName
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + (item.quantity || 1), 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;

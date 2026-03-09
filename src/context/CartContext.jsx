"use client";
import { createContext, useContext, useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { cartApi } from "@/lib/endpoints";

const CartContext = createContext(null);

const STORAGE_KEY = "cleanse_cart";

function loadGuestCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveGuestCart(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const CartProvider = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const syncedRef = useRef(false);

  // Load cart on mount / auth change
  useEffect(() => {
    if (authLoading) return;

    if (isAuthenticated) {
      // Merge guest cart into API cart, then load
      const guestItems = loadGuestCart();
      const mergeAndLoad = async () => {
        try {
          // Merge guest items first
          for (const item of guestItems) {
            try {
              await cartApi.addItem(item.productId || item._id, item.quantity || 1, item.selectedSize);
            } catch { /* skip duplicates */ }
          }
          if (guestItems.length > 0) {
            localStorage.removeItem(STORAGE_KEY);
          }
          // Now fetch the full cart
          const data = await cartApi.get();
          setCartItems(normalizeApiCart(data.cart || data));
        } catch {
          setCartItems([]);
        }
        syncedRef.current = true;
      };
      mergeAndLoad();
    } else {
      setCartItems(loadGuestCart());
      syncedRef.current = true;
    }
  }, [isAuthenticated, authLoading]);

  // Persist guest cart to localStorage
  useEffect(() => {
    if (!isAuthenticated && syncedRef.current) {
      saveGuestCart(cartItems);
    }
  }, [cartItems, isAuthenticated]);

  const normalizeApiCart = (cart) => {
    if (!cart?.items) return [];
    return cart.items.map((item) => ({
      cartItemId: item._id,
      productId: item.product?._id || item.product,
      name: item.product?.name || item.name || "Product",
      price: item.price || item.product?.price || 0,
      image: item.product?.images?.[0]?.url || item.image || "/images/1.png",
      selectedSize: item.selectedSize,
      quantity: item.quantity || 1,
      slug: item.product?.slug,
    }));
  };

  const addToCart = useCallback(async (product, selectedSize, quantity = 1) => {
    const productId = product._id || product.productId;
    const name = product.name;
    const price = Number(product.price);
    const image = product.primaryImage || product.image || product.images?.[0]?.url || "/images/1.png";
    const slug = product.slug;
    const sizeLabel = selectedSize?.label || selectedSize || product.sizes?.[0]?.label || product.sizes?.[0];

    if (isAuthenticated) {
      try {
        const data = await cartApi.addItem(productId, quantity, sizeLabel);
        setCartItems(normalizeApiCart(data.cart || data));
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    } else {
      setCartItems((prev) => {
        const matchKey = `${productId || name}_${sizeLabel}`;
        const existing = prev.find((item) => `${item.productId || item.name}_${item.selectedSize}` === matchKey);
        if (existing) {
          return prev.map((item) =>
            `${item.productId || item.name}_${item.selectedSize}` === matchKey
              ? { ...item, quantity: (item.quantity || 1) + quantity }
              : item
          );
        }
        return [...prev, { productId, name, price, image, selectedSize: sizeLabel, quantity, slug }];
      });
    }
    setIsCartOpen(true);
  }, [isAuthenticated]);

  const removeFromCart = useCallback(async (cartItemId) => {
    if (isAuthenticated) {
      try {
        const data = await cartApi.removeItem(cartItemId);
        setCartItems(normalizeApiCart(data.cart || data));
      } catch (err) {
        console.error("Remove from cart failed:", err);
      }
    } else {
      setCartItems((prev) => prev.filter((item) => {
        const id = item.cartItemId || `${item.productId || item.name}_${item.selectedSize}`;
        return id !== cartItemId;
      }));
    }
  }, [isAuthenticated]);

  const updateQuantity = useCallback(async (cartItemId, newQuantity) => {
    const qty = Math.max(1, newQuantity);
    if (isAuthenticated) {
      try {
        const data = await cartApi.updateItem(cartItemId, qty);
        setCartItems(normalizeApiCart(data.cart || data));
      } catch (err) {
        console.error("Update quantity failed:", err);
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) => {
          const id = item.cartItemId || `${item.productId || item.name}_${item.selectedSize}`;
          return id === cartItemId ? { ...item, quantity: qty } : item;
        })
      );
    }
  }, [isAuthenticated]);

  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await cartApi.clear();
      } catch { /* ignore */ }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setCartItems([]);
  }, [isAuthenticated]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + (item.quantity || 1), 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price) * (item.quantity || 1),
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
    isCartOpen,
    setIsCartOpen,
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

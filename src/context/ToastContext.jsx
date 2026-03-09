"use client";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const toast = {
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error"),
    info: (msg) => addToast(msg, "info"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {toasts.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          {toasts.map((t) => (
            <div
              key={t.id}
              style={{
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: "#fff",
                background: t.type === "error" ? "#c44" : t.type === "info" ? "#333" : "#4CAF50",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                animation: "toastIn 0.3s ease",
                maxWidth: "320px",
              }}
            >
              {t.message}
            </div>
          ))}
        </div>
      )}
      <style jsx global>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return { success: () => {}, error: () => {}, info: () => {} };
  }
  return context;
};

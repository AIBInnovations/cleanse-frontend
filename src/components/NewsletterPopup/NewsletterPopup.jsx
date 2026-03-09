"use client";
import "./NewsletterPopup.css";
import { useState } from "react";
import { newsletterApi } from "@/lib/endpoints";

const NewsletterPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    try {
      await newsletterApi.subscribe(email, "popup");
      setIsSubscribed(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      // Still show success to not block UX
      setIsSubscribed(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="newsletter-overlay">
      <div className="newsletter-modal">
        <button className="newsletter-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="newsletter-content">
          <div className="newsletter-image">
            <img src="/p1.png" alt="Ayurvedic Products" />
          </div>

          <div className="newsletter-form-section">
            {!isSubscribed ? (
              <>
                <span className="newsletter-tag">JOIN OUR COMMUNITY</span>
                <h2>Get 10% Off</h2>
                <p>Subscribe to our newsletter and receive exclusive offers, Ayurvedic tips, and new product updates.</p>

                <form onSubmit={handleSubmit} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-submit" disabled={submitting}>
                    {submitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>

                <p className="newsletter-note">No spam, unsubscribe anytime.</p>
              </>
            ) : (
              <div className="newsletter-success">
                <div className="success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2>Welcome!</h2>
                <p>Check your email for your 10% discount code.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;

"use client";
import "./ContactForm.css";
import { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { newsletterApi } from "@/lib/endpoints";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try {
      await newsletterApi.subscribe(email.trim(), "footer");
      setSubmitted(true);
      setEmail("");
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-form">
      <div className="contact-parallax-image-wrapper">
        <img src="/images/hero.png" alt="Cleanse Ayurveda Products" />
      </div>
      <div className="contact-form-container">
        <div className="cf-header">
          <h4>Join Our Wellness Journey</h4>
        </div>
        <div className="cf-copy">
          <p className="bodyCopy sm">
            Receive exclusive rituals, new arrivals,
            and ancient beauty secrets.
          </p>
        </div>
        {!submitted ? (
          <>
            <div className="cf-input">
              <input
                type="text"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div className="cf-submit" onClick={handleSubmit} style={{ cursor: "pointer" }}>
              {submitting ? "..." : <MdOutlineArrowOutward />}
            </div>
          </>
        ) : (
          <div className="cf-input">
            <p className="bodyCopy sm" style={{ color: "#4CAF50" }}>Thank you for subscribing!</p>
          </div>
        )}
        <div className="cf-footer">
          <div className="cf-divider"></div>
          <div className="cf-footer-copy">
            <p className="bodyCopy sm">
              No spam, Just pure
              Ayurvedic wisdom
              delivered to your inbox
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

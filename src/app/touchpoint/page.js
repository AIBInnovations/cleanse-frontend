"use client";
import "./touchpoint.css";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Touchpoint() {
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  });

  return (
    <div className="touchpoint-page">
      {/* Hero */}
      <section className="touchpoint-hero">
        <div className="touchpoint-hero-content">
          <div className="touchpoint-breadcrumb">
            <Link href="/">HOME</Link>/ <span>CONTACT</span>
          </div>
          <h1 className="touchpoint-hero-title">GET IN TOUCH</h1>
          <p className="touchpoint-hero-subtitle">
            We&apos;re here to guide your wellness journey.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="touchpoint-cards">
        <div
          className="touchpoint-card"
          ref={(el) => (cardsRef.current[0] = el)}
          style={{ opacity: 0 }}
        >
          <div className="touchpoint-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#663532" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3 className="touchpoint-card-title">General Inquiries</h3>
          <p className="touchpoint-card-desc">For partnerships, press, and brand collaborations.</p>
          <a href="mailto:hello@cleanseayurveda.com" className="touchpoint-card-link">hello@cleanseayurveda.com</a>
        </div>

        <div
          className="touchpoint-card"
          ref={(el) => (cardsRef.current[1] = el)}
          style={{ opacity: 0 }}
        >
          <div className="touchpoint-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#663532" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <h3 className="touchpoint-card-title">Customer Support</h3>
          <p className="touchpoint-card-desc">Questions about orders, shipping, or returns.</p>
          <a href="mailto:care@cleanseayurveda.com" className="touchpoint-card-link">care@cleanseayurveda.com</a>
        </div>

        <div
          className="touchpoint-card"
          ref={(el) => (cardsRef.current[2] = el)}
          style={{ opacity: 0 }}
        >
          <div className="touchpoint-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#663532" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h3 className="touchpoint-card-title">Visit Us</h3>
          <p className="touchpoint-card-desc">Our wellness studio in Rishikesh, India.</p>
          <span className="touchpoint-card-link">Rishikesh, Uttarakhand 249201</span>
        </div>

        <div
          className="touchpoint-card"
          ref={(el) => (cardsRef.current[3] = el)}
          style={{ opacity: 0 }}
        >
          <div className="touchpoint-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#663532" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <h3 className="touchpoint-card-title">Call Us</h3>
          <p className="touchpoint-card-desc">Mon - Sat, 10am to 6pm IST.</p>
          <a href="tel:+919876543210" className="touchpoint-card-link">+91 98765 43210</a>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="touchpoint-form-section">
        <div className="touchpoint-form-wrapper">
          <div className="touchpoint-form-image">
            <img src="/images/hero.png" alt="Cleanse Products" />
          </div>
          <div className="touchpoint-form-container">
            <h2 className="touchpoint-form-title">Send Us a Message</h2>
            <p className="touchpoint-form-desc">
              We&apos;d love to hear from you. Fill out the form and we&apos;ll get back within 24 hours.
            </p>
            <form className="touchpoint-form" onSubmit={(e) => e.preventDefault()}>
              <div className="touchpoint-form-row">
                <div className="touchpoint-input-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter your first name" />
                </div>
                <div className="touchpoint-input-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="touchpoint-input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="touchpoint-input-group">
                <label>Subject</label>
                <select defaultValue="">
                  <option value="" disabled>Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="return">Returns & Exchanges</option>
                  <option value="wholesale">Wholesale & Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="touchpoint-input-group">
                <label>Message</label>
                <textarea rows="4" placeholder="Tell us how we can help..."></textarea>
              </div>
              <button type="submit" className="touchpoint-submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="touchpoint-faq">
        <h2 className="touchpoint-faq-title">Frequently Asked Questions</h2>
        <div className="touchpoint-faq-grid">
          <div className="touchpoint-faq-item">
            <h4>What are your shipping times?</h4>
            <p>We ship within 2-3 business days. Delivery takes 5-7 days across India and 10-14 days internationally.</p>
          </div>
          <div className="touchpoint-faq-item">
            <h4>Do you offer returns?</h4>
            <p>Yes, we offer a 7-day return policy on unopened products. Contact our support team to initiate a return.</p>
          </div>
          <div className="touchpoint-faq-item">
            <h4>Are your products 100% natural?</h4>
            <p>All Cleanse products are made with pure, ethically sourced Ayurvedic ingredients with no synthetic additives.</p>
          </div>
          <div className="touchpoint-faq-item">
            <h4>Do you ship internationally?</h4>
            <p>Yes, we ship worldwide. International shipping charges are calculated at checkout based on your location.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import "./privacy.css";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="legal-page">
      {/* Hero */}
      <section className="legal-hero">
        <div className="legal-hero-bg">
          <img src="/images/b2.png" alt="" />
        </div>
        <div className="legal-hero-content">
          <div className="legal-breadcrumb">
            <Link href="/">HOME</Link>/ <span>PRIVACY POLICY</span>
          </div>
          <h1 className="legal-hero-title">PRIVACY<br />POLICY</h1>
          <p className="legal-hero-subtitle">
            Your privacy matters to us. This policy explains how we collect, use, and protect your personal data when you visit cleanseayurveda.com.
          </p>
          <div className="legal-hero-scroll">
            <span>Scroll</span>
            <div className="legal-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="legal-body">
        <div className="legal-body-inner">
          <p className="legal-updated">Last Updated: March 1, 2026</p>

          <div className="legal-section">
            <h3>1. Information We Collect</h3>
            <p>
              We collect personal information that you voluntarily provide to us when you create an account, place an order, or contact us through our website. This includes your name, email address, phone number, shipping address, and payment details. We also automatically collect certain technical information such as your IP address, browser type, device information, and browsing patterns through cookies and similar technologies.
            </p>
          </div>

          <div className="legal-section">
            <h3>2. How We Use Information</h3>
            <p>
              We use the information we collect to process and fulfill your orders, communicate with you about your purchases, and provide customer support. Your data also helps us personalize your shopping experience, send relevant product recommendations, and improve our website and services. We may also use your information to send promotional communications, which you can opt out of at any time.
            </p>
          </div>

          <div className="legal-section">
            <h3>3. Cookies and Tracking</h3>
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather usage analytics. Cookies help us remember your preferences, keep items in your shopping cart, and understand how visitors interact with our site. You can manage your cookie preferences through your browser settings, though disabling certain cookies may limit some website functionality.
            </p>
          </div>

          <div className="legal-section">
            <h3>4. Third Party Sharing</h3>
            <p>
              We do not sell, trade, or rent your personal information to third parties for marketing purposes. We may share your data with trusted service providers who assist us in operating our website, processing payments, and delivering orders. These third parties are contractually obligated to protect your information and use it only for the specific services they provide to us.
            </p>
          </div>

          <div className="legal-section">
            <h3>5. Data Security</h3>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology, and we regularly review our security practices. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security of your data.
            </p>
          </div>

          <div className="legal-section">
            <h3>6. Your Rights</h3>
            <p>
              You have the right to access, correct, update, or request deletion of your personal information at any time by contacting us or through your account settings. You may also opt out of receiving marketing communications by clicking the unsubscribe link in any promotional email. If you are located in the European Union, you have additional rights under the GDPR, including the right to data portability and the right to lodge a complaint with a supervisory authority.
            </p>
          </div>

          <div className="legal-section">
            <h3>7. Children&apos;s Privacy</h3>
            <p>
              Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal data, we will take immediate steps to delete such information from our records. If you believe a child has provided us with their information, please contact us immediately.
            </p>
          </div>

          <div className="legal-section">
            <h3>8. Changes to Policy</h3>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our practices, legal requirements, or business operations. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are protecting your information. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="legal-section">
            <h3>9. Contact Information</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us at hello@cleanseayurveda.com or write to us at our registered office in Rishikesh, Uttarakhand, India. Our privacy team will respond to all inquiries within 2-3 business days and work to resolve any concerns promptly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

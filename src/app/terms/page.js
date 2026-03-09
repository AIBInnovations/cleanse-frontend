"use client";
import "./terms.css";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="legal-page">
      {/* Hero */}
      <section className="legal-hero">
        <div className="legal-hero-bg">
          <img src="/images/b2.png" alt="" />
        </div>
        <div className="legal-hero-content">
          <div className="legal-breadcrumb">
            <Link href="/">HOME</Link>/ <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="legal-hero-title">TERMS OF<br />SERVICE</h1>
          <p className="legal-hero-subtitle">
            The following terms and conditions govern your use of cleanseayurveda.com and all products and services offered through this website.
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
            <h3>1. Introduction</h3>
            <p>
              Welcome to Cleanse Ayurveda. By accessing or using our website at cleanseayurveda.com, you agree to be bound by these Terms of Service. These terms apply to all visitors, users, and customers who access or use our website and services. If you do not agree with any part of these terms, please refrain from using our website.
            </p>
          </div>

          <div className="legal-section">
            <h3>2. Use of Website</h3>
            <p>
              You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use and enjoyment of the site. You must not misuse the website by knowingly introducing malicious code, attempting unauthorized access, or engaging in any activity that disrupts the normal functioning of the site. We reserve the right to restrict or terminate access for any user who violates these terms.
            </p>
          </div>

          <div className="legal-section">
            <h3>3. Products and Pricing</h3>
            <p>
              All product descriptions, images, and pricing on our website are presented as accurately as possible, but we do not guarantee that all information is error-free or complete. Prices are listed in Indian Rupees (INR) unless otherwise stated and are subject to change without prior notice. We reserve the right to modify, discontinue, or limit the availability of any product at any time without liability.
            </p>
          </div>

          <div className="legal-section">
            <h3>4. Orders and Payment</h3>
            <p>
              By placing an order through our website, you are making an offer to purchase a product subject to these terms. All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity. Payment must be completed at the time of order using an accepted payment method.
            </p>
          </div>

          <div className="legal-section">
            <h3>5. Shipping and Delivery</h3>
            <p>
              We strive to process and ship all orders within 2-3 business days of confirmed payment. Estimated delivery times vary by location and are provided as guidelines rather than guarantees. Cleanse Ayurveda is not responsible for delays caused by shipping carriers, customs processing, natural disasters, or other circumstances beyond our control.
            </p>
          </div>

          <div className="legal-section">
            <h3>6. Returns and Refunds</h3>
            <p>
              We offer a 7-day return policy on unopened and unused products from the date of delivery. To initiate a return, please contact our customer support team with your order details. Refunds will be processed to the original payment method within 7-10 business days after we receive and inspect the returned product. Shipping costs for returns are the responsibility of the customer unless the return is due to a defective or incorrect product.
            </p>
          </div>

          <div className="legal-section">
            <h3>7. Intellectual Property</h3>
            <p>
              All content on this website, including but not limited to text, images, graphics, logos, product designs, and brand elements, is the property of Cleanse Ayurveda and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission. Unauthorized use of any material on this site may result in legal action.
            </p>
          </div>

          <div className="legal-section">
            <h3>8. Limitation of Liability</h3>
            <p>
              Cleanse Ayurveda and its directors, employees, and affiliates shall not be held liable for any indirect, incidental, special, or consequential damages arising from the use of our website or products. Our total liability for any claim relating to our products or services shall not exceed the amount paid by you for the specific product or service in question. This limitation applies to the fullest extent permitted by applicable law.
            </p>
          </div>

          <div className="legal-section">
            <h3>9. Governing Law</h3>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in Uttarakhand, India. By using our website, you consent to the jurisdiction of these courts and waive any objections to the exercise of jurisdiction over you.
            </p>
          </div>

          <div className="legal-section">
            <h3>10. Contact Information</h3>
            <p>
              If you have any questions or concerns regarding these Terms of Service, please contact us at hello@cleanseayurveda.com or write to us at our registered office in Rishikesh, Uttarakhand, India. We aim to respond to all inquiries within 2-3 business days. Your continued use of the website constitutes your agreement to these terms and any future updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

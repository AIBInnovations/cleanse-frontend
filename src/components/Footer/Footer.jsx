import "./Footer.css";
import Link from "next/link";

import ContactForm from "../ContactForm/ContactForm";

const Footer = () => {
  return (
    <>
      <ContactForm />

      <footer>
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-pages">
              <h3 className="footer-pages-title">NAVIGATION</h3>
              <div className="footer-pages-links">
                <Link href="/wardrobe?category=Hair Care">HAIR CARE</Link>
                <Link href="/wardrobe?category=Body Care">BODY CARE</Link>
                <Link href="/wardrobe?category=Face Care">FACE CARE</Link>
                <Link href="/genesis">ABOUT US</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <img src="/logo.png" alt="Cleanse" className="footer-logo" />
            <div className="footer-socials">
              <a href="https://www.instagram.com/cleanseayurveda/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TWITTER</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FACEBOOK</a>
              <a href="https://www.youtube.com/@cleanseayurveda" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-legal">
            <p className="footer-copyright">&copy;2026 CLEANSE AYURVEDA . ALL RIGHTS RESERVED</p>
            <div className="footer-legal-links">
              <Link href="/terms">TERMS OF SERVICE</Link>
              <Link href="/privacy">PRIVACY POLICY</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

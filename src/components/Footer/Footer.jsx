import "./Footer.css";
import Link from "next/link";

import ContactForm from "../ContactForm/ContactForm";

const Footer = () => {
  return (
    <>
      <ContactForm />

      <footer>
        <div className="container">
          <div className="footer-row">
            <div className="footer-col">
              <div className="footer-col-header">
                <p className="bodyCopy">Navigate</p>
              </div>
              <div className="footer-col-links">
                <Link href="/">Home</Link>
                <Link href="/wardrobe">Shop</Link>
                <Link href="/genesis">Our Story</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/lookbook">Rituals</Link>
              </div>
            </div>
            <div className="footer-col">
              <div className="footer-col-header">
                <p className="bodyCopy">Connect</p>
              </div>
              <div className="footer-col-links">
                <a
                  href="https://www.instagram.com/cleanseayurveda/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@cleanseayurveda"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </div>
            </div>
            <div className="footer-col">
              <div className="footer-col-header">
                <p className="bodyCopy">Visit Us</p>
              </div>
              <div className="footer-col-links">
                <p>Cleanse Ayurveda Studio</p>
                <p>Rishikesh, Uttarakhand</p>
                <p>India 249201</p>
              </div>
            </div>
          </div>
          <div className="footer-row">
            <div className="footer-copyright">
              <h5>Cleanse Ayurveda</h5>
              <p className="bodyCopy">&copy;2025 All rights reserved.</p>
              <p className="bodyCopy" id="copyright-text">
                Ancient Wisdom, Modern Beauty
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

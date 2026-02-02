import "./ContactForm.css";

import { MdOutlineArrowOutward } from "react-icons/md";

const ContactForm = () => {
  return (
    <section className="contact-form">
      <div className="contact-parallax-image-wrapper">
        <h1>Cleanse</h1>
        <img src="/herobanner.png" alt="" />
      </div>
      <div className="contact-form-container">
        <div className="cf-header">
          <h4>Join our wellness journey.</h4>
        </div>
        <div className="cf-copy">
          <p className="bodyCopy sm">
            Receive exclusive rituals, new arrivals, and ancient beauty secrets.
          </p>
        </div>
        <div className="cf-input">
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="cf-submit">
          <MdOutlineArrowOutward />
        </div>
        <div className="cf-footer">
          <div className="cf-divider"></div>
          <div className="cf-footer-copy">
            <p className="bodyCopy sm">
              No spam. Just pure Ayurvedic wisdom delivered to your inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

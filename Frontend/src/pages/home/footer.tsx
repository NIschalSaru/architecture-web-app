import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../../assets/images/ndbn-logo-white.png";

const FooterComponent = () => {
  return (
    <footer className="footer-container">
      {/* Background Circles */}
      <div className="footer-circle-overlay"></div>
      <div className="footer-logo-section">
        <img src={logo} alt="Logo" className="footer-logo" />
        <div>
          <div className="footer-link cc-static">Resources</div>
        </div>
        <div>
          <div className="footer-link cc-static">Additonal</div>
        </div>
        <div>
          <div className="footer-link cc-static">Company</div>
        </div>
      </div>
      <div className="row row-justify-between u-z-index-1">
        <div className="col">
          <div className="row">
            <div className="col col-sm-4">
              <ul className="footer-list">
                <li className="footer-list-item">
                  <div className="footer-link cc-secondary">
                    We don't only build structure, we build trust and shape your
                    future, join us we definitely add value to your goal.
                  </div>
                  <div className="social-icons">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedinIn />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                  </div>
                </li>
                <li className="footer-list-item">
                  <a href="/stories" className="footer-link cc-secondary">
                    Customer Stories
                  </a>
                  <a href="/clause-index" className="footer-link cc-secondary">
                    Clause Library
                  </a>
                  <a href="/security" className="footer-link cc-secondary">
                    Security & Compliance
                  </a>
                  <a
                    href="https://intercom.help/spellbooklegal/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link cc-secondary"
                  >
                    Help Center
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/about" className="footer-link cc-secondary">
                    Our Story
                  </a>
                  <a href="/careers" className="footer-link cc-secondary">
                    Who we are
                  </a>
                  <a href="/contact" className="footer-link cc-secondary">
                    Design
                  </a>
                  <a href="/contact" className="footer-link cc-secondary">
                    Development
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/about" className="footer-link cc-secondary">
                    About Us
                  </a>
                  <a href="/careers" className="footer-link cc-secondary">
                    Our Projects
                  </a>
                  <a href="/contact" className="footer-link cc-secondary">
                    Contact Us
                  </a>
                  <a href="/contact" className="footer-link cc-secondary">
                    Our Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-justify-between u-z-index-1">
        <div className="col col-lg-6 col-sm-12">
          <hr className="footer-divider" />
        </div>
        <div className="col col-sm-4">
          <ul className="footer-list-down">
            <p>© 2024 Nepal Designers & Builders. All rights reserved.</p>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

import "./footer.css";
import logo from "../../assets/images/Nepal-Designers-Builders-Logo.png"; // Adjust the path as needed
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-section">
        <img src={logo} alt="Logo" className="footer-logo" />
        <div className="footer-bottom">
          <p>© 2024 Nepal Designers & Builders. All rights reserved.</p>
        </div>
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
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
        </div>
      </div>
      <div className="row row-justify-between u-z-index-1">
        <div className="col col-lg-6 col-sm-12">
          <div className="row">
            <div className="col col-sm-4">
              <ul role="list" className="footer-list w-list-unstyled">
                <li className="footer-list-item">
                  <div className="footer-link cc-static">Product</div>
                </li>
                <li className="footer-list-item">
                  <a
                    href="/features/review"
                    className="footer-link cc-secondary"
                  >
                    Review
                  </a>
                </li>
                <li className="footer-list-item">
                  <a
                    href="/features/draft"
                    className="footer-link cc-secondary"
                  >
                    Draft
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/features/ask" className="footer-link cc-secondary">
                    Ask
                  </a>
                </li>
                <li className="footer-list-item">
                  <a
                    href="/features/benchmarks"
                    className="footer-link cc-secondary"
                  >
                    Benchmarks
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/associate" className="footer-link cc-secondary">
                    Associate
                  </a>
                </li>
              </ul>
            </div>
            <div className="col col-sm-4">
              <ul role="list" className="footer-list w-list-unstyled">
                <li className="footer-list-item">
                  <div className="footer-link cc-static">Resources</div>
                </li>
                <li className="footer-list-item">
                  <a href="/blog" className="footer-link cc-secondary">
                    Blog
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/stories" className="footer-link cc-secondary">
                    Customer Stories
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/clause-index" className="footer-link cc-secondary">
                    Clause Library
                  </a>
                </li>
                <li className="footer-list-item">
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
                  <a href="/security" className="footer-link cc-secondary">
                    Security & Compliance
                  </a>
                </li>
              </ul>
            </div>
            <div className="col col-sm-4">
              <ul role="list" className="footer-list w-list-unstyled">
                <li className="footer-list-item">
                  <div className="footer-link cc-static">Company</div>
                </li>
                <li className="footer-list-item">
                  <a href="/about" className="footer-link cc-secondary">
                    About
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/careers" className="footer-link cc-secondary">
                    Careers
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/press" className="footer-link cc-secondary">
                    Press
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/contact" className="footer-link cc-secondary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

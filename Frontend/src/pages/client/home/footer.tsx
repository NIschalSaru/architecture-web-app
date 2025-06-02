// Footer.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../assets/images/ndbn-logo-white.png";
import AppStore from "../../../assets/svg/app-store.svg";
import PlayStore from "../../../assets/svg/google-play.svg";

const Footer = () => {
  return (
    <div className="pg-footer">
      <footer className="footer">
        <svg
          className="footer-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            className="footer-wave-path"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
          ></path>
        </svg>
        <div className="footer-content">
          <div className="footer-content-column">
            <div className="footer-logo">
              <a className="footer-logo-link" href="#">
                <span className="hidden-link-text">LOGO</span>
                <img
                  src={Logo}
                  alt="Your Company Logo"
                  className="footer-logo-image"
                />
              </a>
            </div>

            <div className="footer-menu">
              <h4 className="footer-breif">
                We don't only build structure, we build trust and shape your
                future, join us we definitely add value to your goal.
              </h4>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Location</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: "#b64141" }}
                    />
                    <a href="#">Kalanki, Kathmandu</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Legal</h2>
              <ul id="menu-legal" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                  <a href="#">Privacy Notice</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Quick Links</h2>
              <ul id="menu-quick-links" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="/about">About Us</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Our Projects</a>
                </li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a href="/services">Our Services</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="app-store-buttons">
              <a href="https://apps.apple.com/np/app/nepal-designers-builders-ndb/id6743044434" className="app-store-link" target="_blank" rel="noopener noreferrer">
                <img src={AppStore} alt="Download on App Store" className="app-store-image" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.theyetilabs.enirman.ndb&pli=1" className="app-store-link" target="_blank" rel="noopener noreferrer">
                <img src={PlayStore} alt="Get it on Google Play" className="app-store-image" />
              </a>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> Let's Chat</h2>
              <p className="footer-call-to-action-description">
                Have a support question?
              </p>
              <a
                className="footer-call-to-action-button button"
                href="/about#contact-section"
                target="_self"
              >
                Get in Touch
              </a>
            </div>
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title">Contact Us</h2>
              <p className="footer-call-to-action-link-wrapper">
                <a
                  className="footer-call-to-action-link"
                  href="tel:+977-9851340040"
                  target="_self"
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#b64141" }}
                  />{" "}
                  +977-9851340040
                </a>
                <a
                  className="footer-call-to-action-link"
                  href="mailto:contact@ndnb.com.np"
                  target="_self"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: "#b64141" }}
                  />{" "}
                  contact@ndnb.com.np
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="footer-copyright-wrapper">
            <p className="footer-copyright-text">
              <a className="footer-copyright-link" href="#" target="_self">
                ©2024. | Nepal Designers & Builders. | All rights reserved.
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

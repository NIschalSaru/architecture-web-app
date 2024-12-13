// Footer.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/ndbn-logo-white.png";
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
          <div className="footer-social-links">
            <svg
              className="footer-social-amoeba-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 236 54"
            >
              <path
                className="footer-social-amoeba-path"
                d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"
              ></path>
            </svg>
            <a className="footer-social-link linkedin" href="#" target="_blank">
              <span className="hidden-link-text">Linkedin</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <path
                  className="footer-social-icon-path"
                  d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link twitter" href="#" target="_blank">
              <span className="hidden-link-text">Facebook</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 26"
                height="30"
                fill="currentColor"
              >
                <path
                  className="footer-social-icon-path"
                  d="M22.675 0h-21.35C.595 0 0 .593 0 1.325v21.351C0 23.407.595 24 1.325 24H12v-9.294H9.294v-3.618H12V8.41c0-2.712 1.658-4.187 4.081-4.187 1.159 0 2.155.086 2.447.125v2.841h-1.676c-1.315 0-1.57.623-1.57 1.54v2.019h3.137l-.408 3.618h-2.729V24h5.355c.73 0 1.325-.593 1.325-1.324V1.325C24 .593 23.405 0 22.675 0z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link youtube" href="#" target="_blank">
              <span className="hidden-link-text">Youtube</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <path
                  className="footer-social-icon-path"
                  d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link github" href="#" target="_blank">
              <span className="hidden-link-text">Github</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="40"
                height="40"
                fill="currentColor"
              >
                <path
                  className="footer-social-icon-path"
                  d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.35 3.608 1.325.975.975 1.264 2.243 1.325 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.243 1.264-3.608 1.325-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.264-2.243-1.325-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.35-2.633 1.325-3.608C5.516 2.513 6.784 2.224 8.15 2.163 9.415 2.105 9.795 2.163 12 2.163zm0-2.163C8.756 0 8.332.012 7.052.07 5.775.127 4.677.41 3.73 1.357 2.782 2.304 2.5 3.402 2.443 4.678 2.385 5.958 2.373 6.382 2.373 9.627s.012 3.669.07 4.947c.057 1.277.34 2.375 1.287 3.322.947.947 2.045 1.23 3.322 1.287 1.278.057 1.702.07 4.947.07s3.669-.012 4.947-.07c1.277-.057 2.375-.34 3.322-1.287.947-.947 1.23-2.045 1.287-3.322.057-1.278.07-1.702.07-4.947s-.012-3.669-.07-4.947c-.057-1.277-.34-2.375-1.287-3.322C19.978.41 18.88.127 17.603.07 16.324.012 15.9 0 12 0zM12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z"
                ></path>
              </svg>
            </a>
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

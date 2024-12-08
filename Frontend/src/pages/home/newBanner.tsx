import "../home/banner.css";
import logo from "../../assets/images/Nepal-Designers-Builders-Logo.png";

const Banner = () => {
  return (
    <div className="banner-component">
      <div className="component1">
        <nav className="navbar">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <ul className="navbar-list">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="we-design-develop">
          <span className="design">We Design.</span>
          <span className="develop"> We Develop.</span>

          <p>
            We don't only build structure, we build trust and shape your future,
            join us we definitely add value to your goal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React, { useState } from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const projects = [
  {
    title: "Comfy house in the woods",
    description:
      "Here is my first attempt of architectural visualization for design studio House was made in Blender, Environment - Megascans, renders - UE5.",
    imageUrl:
      "https://cdna.artstation.com/p/assets/images/images/012/517/584/large/shubhanghi-maheshwari-exterior-final01.jpg?1535182073",
    date: "March 15, 2019",
    tag: "Architecture",
  },
  {
    title: "Urban High-Rise",
    description:
      "A high-rise apartment complex with breathtaking views and state-of-the-art amenities.",
    imageUrl:
      "https://cdnb.artstation.com/p/assets/images/images/051/802/287/large/ilya-galinsky-day-01a-logo.jpg?1658215706",
    date: "June 19, 2019",
    tag: "Exterior design",
  },
  {
    title: "Residential Community",
    description:
      "A sustainable residential community designed with eco-friendly materials and smart home technology.",
    imageUrl:
      "https://cdna.artstation.com/p/assets/images/images/065/296/804/large/moin-khan-villa-architecture-house-by-moin.jpg?1690005212",
    date: "January 10, 2019",
    tag: "Landscape design",
  },
  {
    title: "Modern Office Building",
    description:
      "A sleek and modern office space featuring open-plan layouts and innovative use of glass and steel.",
    imageUrl:
      "https://cdnb.artstation.com/p/assets/images/images/055/700/937/large/forpinik-07.jpg?1667552422",
    date: "May 22, 2020",
    tag: "Urban design",
  },
];

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("fade-in");

  // Function to go to the next project
  const nextProject = () => {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      setAnimationClass("fade-in");
    }, 300); // Matches fade-out duration
  };

  // Function to go to the previous project
  const prevProject = () => {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
      );
      setAnimationClass("fade-in");
    }, 300); // Matches fade-out duration
  };

  return (
    <div className="projects-section">
      <div className="project-section-title">
        <h2>Recent Projects</h2>
      </div>
      <div className={`project-card ${animationClass}`}>
        <div className="image-and-navbutton">
          <div className="project-figure">
            <img
              src={projects[currentIndex].imageUrl}
              alt={projects[currentIndex].title}
              className="project-image"
            />
          </div>
          <div className="navigation-buttons">
            <button className="next-btn" onClick={nextProject}>
              <ArrowRightOutlined />
            </button>
            <button className="prev-btn" onClick={prevProject}>
              <ArrowLeftOutlined />
            </button>
          </div>
        </div>
        <div className="project-content">
          <ul className="project-panel">
            <li className="project-panel-item">
              <time
                className="project-time"
                dateTime={projects[currentIndex].date}
              >
                {projects[currentIndex].date}
              </time>
            </li>
            <li className="project-panel-item">
              <div className="project-tag">{projects[currentIndex].tag}</div>
            </li>
          </ul>
          <div className="project-details">
            <h3 className="project-title">{projects[currentIndex].title}</h3>
            <p className="project-text">{projects[currentIndex].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;

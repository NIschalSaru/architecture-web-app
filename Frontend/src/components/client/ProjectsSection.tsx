import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { apiUrl } from "../../utils";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/architecture-web-app/projects/get-projects`,
          { withCredentials: true }
        );
        const projectData = response.data.data.map((project: any) => ({
          id: project.id,
          title: project.name || "Untitled Project",
          date: new Date(project.createdAt).toLocaleDateString(),
          description: project.description || "No description available.",
          bgImage:
            project.media?.[0]?.fileurl ||
            "https://via.placeholder.com/400x300?text=No+Image",
        }));

        setProjects(projectData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    customPaging: (i: number) => <button>{i + 1}</button>,
    appendDots: (dots: React.ReactNode[]) => (
      <div style={{ marginTop: "20px" }}>
        <ul
          className="slick-dots"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {dots.slice(0, 4)}
        </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: (
      <button style={{ marginTop: "7px" }} type="button" className="slick-prev">
        <FaChevronLeft size={24} />
      </button>
    ),
    nextArrow: (
      <button style={{ marginTop: "7px" }} type="button" className="slick-next">
        <FaChevronRight size={24} />
      </button>
    ),
  };

  return (
    <div id="projects-carousel" className="projects-slider">
      <motion.h2
        className="architectural-expertise__title"
        initial={{ opacity: 0, translateY: 50 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6 }}
      >
        OUR RECENT PROJECTS
      </motion.h2>
      <Slider {...sliderSettings}>
        {projects.map((project: any) => (
          <div
            key={project.id}
            className={`single-project ${project.className}`}
          >
            <div
              className="project-image"
              style={{
                backgroundImage: `url(${project.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                width: "100%",
                height: "400px", // adjust as needed
              }}
            ></div>
            <div className="project-content">
              <h2>
                {project.title.split(" ").map((line: string, index: number) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              <p>{project.date}</p>
              <p className="project-description">{project.description}</p>
              <a href={`/projects/${project.id}`} className="seemore">
                See Project
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectsSection;

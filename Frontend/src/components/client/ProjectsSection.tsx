import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Icon library
const projects = [
  {
    id: 1,
    className: "rest",
    bgImage:
      "https://images.unsplash.com/photo-1728606987255-920740a48fe5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D", // Use local image or fallback
    title: "Biggest Restaurations",
    date: "Jan 19, 2018",
  },
  {
    id: 2,
    className: "build",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1734549547891-02d562030eb8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D",
    title: "Office Building",
    date: "Jan 19, 2018",
  },
  {
    id: 3,
    className: "apart",
    bgImage:
      "https://images.unsplash.com/photo-1724931420584-d360afc3e1f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ0fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D",
    title: "Nice Apartments",
    date: "Jan 19, 2018",
  },
  {
    id: 4,
    className: "rest",
    bgImage:
      "https://images.unsplash.com/photo-1734217673457-cab58c9c29a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D",
    title: "Biggest Restaurations",
    date: "Jan 19, 2018",
  },
  {
    id: 5,
    className: "apart",
    bgImage:
      "https://images.unsplash.com/photo-1719125217488-be5eab036dd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY4fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D",
    title: "Office Building",
    date: "Jan 19, 2018",
  },
];

const ProjectsSection = () => {
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
          {dots.slice(0, 4)} {/* Show only the first 4 dots */}
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
        {projects.map((project) => (
          <div
            key={project.id}
            className={`single-project ${project.className}`}
          >
            <img
              src={project.bgImage}
              alt={project.title}
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
            <div className="project-content">
              <h2>
                {project.title.split(" ").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              <p>{project.date}</p>
              <a href="#" className="seemore">
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

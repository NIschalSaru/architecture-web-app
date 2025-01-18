import { useLocation, useParams } from "react-router-dom";
import InnerHeader from "../../../components/client/InnerHeader";

const ProjectDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const project = location.state; // Retrieve the project data passed via navigate

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <section className="project-details">
      <InnerHeader
        title="PROJECTS"
        className="no-margin"
        currentPage="PROJECT DETAILS"
      />
      <div className="container">
        <div className="project-header">
          {/* <h2 className="project-title mb-4">Beautiful Home to Live In</h2> */}

          <h2>{project.sub_discription}</h2>
          <h4>
            {project.title}, {project.location}
          </h4>
        </div>

        <div className="project-details__content mt-5">
          <div className="project-image-section my-4">
            <img
              className="project-image img-fluid rounded shadow"
              src={project.image}
              alt={project.title}
              style={{ minWidth: "50%" }}
            />
          </div>

          <div className="project-details__content-right">
            <div className="project-details__details-box pb-30">
              <div className="detail-card-row-4">
                <div className="details-card">
                  <p className="details-label">Category</p>
                  <h4 className="details-value">
                    {project.category.charAt(0).toUpperCase() +
                      project.category.slice(1)}
                  </h4>
                </div>
                <div className="details-card">
                  <p className="details-label">Project</p>
                  <h4 className="details-value">{project.title}</h4>
                </div>
                <div className="details-card">
                  <p className="details-label">Location</p>
                  <h4 className="details-value">{project.location}</h4>
                </div>
                <div className="details-card">
                  <p className="details-label">Built-Up Area</p>
                  <h4 className="details-value">{project.sqft}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="project-details__content-left enhanced-content">
            <h2 className="project-title mb-4">{project.sub_title}</h2>
            {/* <p className="project-subtitle mb-5">
              Inspired by classical European architecture while maintaining
              contemporary functionality.
            </p> */}

            <div className="project-description mb-5">
              {/* <p>
                The residence for <strong>{project.client}</strong>, a bungalow
                located at <strong>{project.location}</strong>, is built on{" "}
                <strong>{project.sqft}</strong>.
              </p> */}
              <p>{project.discription}</p>
            </div>

            <div className="project-highlights">
              {/* <h4 className="highlights-title">Project Highlights</h4>
              <ul className="list-style-enhanced">
                <li>
                  <i className="fa fa-check-circle highlight-icon"></i>
                  <span>Built-up Area:</span> {project.sqft}
                </li>
              </ul> */}
              <img
                className="project-image img-fluid rounded shadow"
                src={project.image}
                alt={project.title}
                style={{ minWidth: "50%" }}
              />
              <img
                className="project-image img-fluid rounded shadow"
                src={project.image}
                alt={project.title}
                style={{ minWidth: "50%" }}
              />
              <img
                className="project-image img-fluid rounded shadow"
                src={project.image}
                alt={project.title}
                style={{ minWidth: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;

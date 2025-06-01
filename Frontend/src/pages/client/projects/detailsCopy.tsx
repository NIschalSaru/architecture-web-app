import InnerHeader from "../../../components/client/InnerHeader";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const ProjectDetails = () => {
  const location = useLocation();
  const project = location.state; // Retrieve the project data passed via navigate
  // const { title } = useParams<{ title: string }>();

  if (!project) {
    return <div>Project not found!</div>;
  }

  // State to track the current main image
  const [mainImage, setMainImage] = useState<string>(project.images[0]);

  // Handle the thumbnail click
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  return (
    <section className="project-details-and-discription">
      <InnerHeader
        title="PROJECTS"
        className="no-margin"
        currentPage="PROJECT DETAILS"
      />
      <div className="container" id="container">
        <div className="project-images-section my-4">
          <div className="main-image-section mb-4">
            <img
              className="main-image img-fluid rounded shadow"
              src={mainImage}
              alt="Main Project Image"
              style={{
                maxWidth: "800px",
                maxHeight: "500px",
                marginBottom: "20px",
                padding: "20px",
              }}
            />
          </div>
          <div className="image-gallery">
            {/* Display thumbnails of other images */}
            {project.images.map((image: string, index: number) => (
              <img
                key={index}
                className="thumbnail-image img-fluid rounded"
                src={image}
                alt={`${project.title} - ${index + 1}`}
                style={{
                  margin: "10px",
                  width: "100px",
                  maxWidth: "120px",
                  cursor: "pointer",
                }}
                onClick={() => handleThumbnailClick(image)} // On click, set the main image
              />
            ))}
          </div>
        </div>
        <div className="project-details" style={{ padding: "20px" }}>
          <h2 className="details-title">
            {project.title} -{" "}
            <span className="details-location">{project.location}</span>
          </h2>

          <p className="details-description">{project.discription}</p>
        </div>
      </div>
      <div className="project-details-overview">
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
      </div>
    </section>
  );
};

export default ProjectDetails;

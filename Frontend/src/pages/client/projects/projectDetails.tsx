import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../utils";
// import InnerHeader from "../../../components/client/InnerHeader";
import ProjectInnerHeader from "../../../components/client/ProjectInnerHeader";
import ImageViewer from "react-simple-image-viewer";
import { motion } from "framer-motion";

import { ArrowLeft, User } from "lucide-react";

interface Media {
  id: number;
  project_id: number;
  image_type: string;
  filename: string;
  filepath: string;
  fileurl: string;
}

interface Project {
  id: number;
  name: string;
  project_type_id: number;
  location: string;
  site_area: string;
  description: string;
  media: Media[];
}

interface Client {
  id: number;
  project_id: number;
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  project: Project;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/architecture-web-app/projects/get-project/${id}`
        );
        const clientData = response.data.data.client;
        setClient(clientData);

        // Set first image as default selected image
        if (clientData?.project?.media?.length > 0) {
          setSelectedImage(clientData.project.media[0].fileurl);
        }
      } catch (error) {
        console.error("Error fetching client details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  // Get the feature image from the project media
  const featureImage = client?.project?.media.find(
    (img) => img.image_type === "feature"
  )?.fileurl;

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImageIndex(0);
    setIsViewerOpen(false);
  };

  if (loading) {
    return (
      <div className="project-details-container">
        <ProjectInnerHeader title="PROJECTS" currentPage="PROJECTS" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="project-details-container">
        <ProjectInnerHeader title="PROJECTS" currentPage="PROJECTS" />
        <div className="not-found">
          <h2>No project found</h2>
          <Link to="/projects" className="back-button">
            <ArrowLeft className="back-icon" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProjectInnerHeader
        title="PROJECTS"
        currentPage="PROJECTS"
        backgroundImage={featureImage}
        projectName={client.project.name}
        address={client.project.location}
      />
      <div className="project-details-container">
        <div className="main-content">
          {/* Back Button */}
          <Link to="/projects" className="back-button">
            <ArrowLeft className="back-icon" />
            Back to Projects
          </Link>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Left Column - Project Details */}

            <div className="details-section">
              {/* Client Info Card */}
              <div className="info-card">
                <div className="client-info">
                  <div className="client-item">
                    <User className="client-icon" />
                    <div>
                      {/* Description */}
                      <motion.div
                        className="description-section"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <div className="description-section">
                          <h3>Project Description</h3>
                          <p className="description-text">
                            {client.project.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-details-overview">
                <div className="project-details__content-right">
                  <div className="project-details__details-box pb-30">
                    <h3 className="section-heading">Project Overview</h3>
                    <div className="detail-card-row-4">
                      <div className="details-card">
                        <p className="details-label">Project</p>
                        <h4 className="details-value">{client.fullName}</h4>
                      </div>
                      <div className="details-card">
                        <p className="details-label">Location</p>
                        <h4 className="details-value">
                          {client.project.location}
                        </h4>
                      </div>
                      <div className="details-card">
                        <p className="details-label">Built-Up Area</p>
                        <h4 className="details-value">
                          {client.project.site_area}
                        </h4>
                      </div>
                      <div className="details-card">
                        <p className="details-label">Completed</p>
                        <h4 className="details-value">2021</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Image Gallery */}

            <div className="image-section">
              {/* Main Image */}
              <motion.div
                className="main-image-container"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                {selectedImage && (
                  <div className="main-image-container">
                    <img
                      src={selectedImage}
                      alt="Selected project view"
                      className="main-image"
                    />
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              {client.project.media.length > 1 && (
                <div className="gallery-container">
                  <h3 className="gallery-title">Project Gallery</h3>
                  <div className="thumbnail-grid">
                    {client.project.media.map((media, index) => (
                      <button
                        key={media.id}
                        onClick={() => openImageViewer(index)}
                        className={`thumbnail-button ${
                          selectedImage === media.fileurl ? "active" : ""
                        }`}
                      >
                        <img
                          src={media.fileurl}
                          alt={`Project view ${media.id}`}
                          className="thumbnail-image"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {isViewerOpen && (
                <ImageViewer
                  src={client.project.media.map((m) => m.fileurl)}
                  currentIndex={currentImageIndex}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                  }}
                />
              )}
            </div>
          </div>
          {/* Contact Action */}
          {/* <div className="cta-card">
            <div className="cta-section">
              <h3 className="cta-title">Interested in Similar Work?</h3>
              <p className="cta-description">
                Get in touch to discuss your architectural project.
              </p>
              <button className="cta-button">Contact Us</button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

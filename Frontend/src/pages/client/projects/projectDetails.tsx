import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../utils";
import InnerHeader from "../../../components/client/InnerHeader";
import {
  ArrowLeft,
  MapPin,
  Square,
  Calendar,
  User,
  Mail,
  Phone,
  Home,
} from "lucide-react";

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
    if (!id) return;

    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/architecture-web-app/projects/get-project/${id}`
        );
        setClient(response.data.data.client);
        // Set first image as selected by default
        if (response.data.data.client?.project?.media?.length > 0) {
          setSelectedImage(response.data.data.client.project.media[0].fileurl);
        }
      } catch (error) {
        console.error("Error fetching client details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="project-details-container">
        <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="project-details-container">
        <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
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
      <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
      <div className="project-details-container">
        <div className="main-content">
          {/* Back Button */}
          <Link to="/projects" className="back-button">
            <ArrowLeft className="back-icon" />
            Back to Projects
          </Link>
          <div className="project-title-location">
            <h1 className="project-title">{client.project.name}</h1>
            <div className="project-location">
              <MapPin className="location-icon" />
              <span>{client.project.location}</span>
            </div>
          </div>
          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Left Column - Image Gallery */}
            <div className="image-section">
              {/* Main Image */}
              {selectedImage && (
                <div className="main-image-container">
                  <img
                    src={selectedImage}
                    alt="Selected project view"
                    className="main-image"
                  />
                </div>
              )}

              {/* Thumbnail Gallery */}
              {client.project.media.length > 1 && (
                <div className="gallery-container">
                  <h3 className="gallery-title">Project Gallery</h3>
                  <div className="thumbnail-grid">
                    {client.project.media.map((media) => (
                      <button
                        key={media.id}
                        onClick={() => setSelectedImage(media.fileurl)}
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
              {/* Description */}
              <div className="description-section">
                <h3>Project Description</h3>
                <p className="description-text">{client.project.description}</p>
              </div>
            </div>

            {/* Right Column - Project Details */}
            <div className="details-section">
              {/* Project Info Card */}
              <div className="info-card">
                {/* Project Stats */}
                <div className="stats-grid">
                  <div className="stat-box area">
                    <Square className="stat-icon area" />
                    <div>
                      <p className="stat-label area">Site Area</p>
                      <p className="stat-value area">
                        {client.project.site_area}
                      </p>
                    </div>
                  </div>
                  <div className="stat-box year">
                    <Calendar className="stat-icon year" />
                    <div>
                      <p className="stat-label year">Year Completed</p>
                      <p className="stat-value year">2025</p>
                    </div>
                  </div>
                </div>{" "}
              </div>

              {/* Services Card */}
              <div className="info-card">
                <h3 className="services-title">Services</h3>
                <div className="services-tags">
                  <span className="service-tag architecture">Architecture</span>
                  <span className="service-tag landscape">
                    Landscape Architecture
                  </span>
                  <span className="service-tag planning">Planning</span>
                </div>
              </div>

              {/* Client Info Card */}
              <div className="info-card">
                <h3 className="client-section-title">
                  <User className="client-title-icon" />
                  Client Information
                </h3>

                <div className="client-info">
                  <div className="client-item">
                    <User className="client-icon" />
                    <div>
                      <p className="client-label">Client Name</p>
                      <p className="client-value">{client.fullName}</p>
                    </div>
                  </div>

                  <div className="client-item">
                    <Mail className="client-icon" />
                    <div>
                      <p className="client-label">Email</p>
                      <a
                        href={`mailto:${client.email}`}
                        className="client-link"
                      >
                        {client.email}
                      </a>
                    </div>
                  </div>

                  <div className="client-item">
                    <Phone className="client-icon" />
                    <div>
                      <p className="client-label">Mobile</p>
                      <a href={`tel:${client.mobile}`} className="client-link">
                        {client.mobile}
                      </a>
                    </div>
                  </div>

                  <div className="client-item">
                    <Home className="client-icon" />
                    <div>
                      <p className="client-label">Address</p>
                      <p className="client-value">{client.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Action */}
              <div className="cta-card">
                <h3 className="cta-title">Interested in Similar Work?</h3>
                <p className="cta-description">
                  Get in touch to discuss your architectural project.
                </p>
                <button className="cta-button">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

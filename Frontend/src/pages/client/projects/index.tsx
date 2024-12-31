import { useState } from "react";
import InnerHeader from "../../../components/client/InnerHeader";

// Define the Project type
interface Project {
  title: string;
  location: string;
  date: string;
  sqft: string;
  category: string;
  client: string;
  categories: string;
  rating: number;
  website: string;
  image: string;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalData, setModalData] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Dell Villa",
      location: "New York",
      date: "2024-12-15",
      sqft: "2500 sq ft",
      category: "following",
      client: "Colorlib",
      categories: "Exterior",
      rating: 4.8,
      website: "https://examplesite.com/dell-villa",
      image:
        "https://cdnb.artstation.com/p/assets/images/images/028/842/911/smaller_square/rashed-abdullah-01-guest-room-1.jpg?1595685596",
    },
    {
      title: "Eden Park",
      location: "Singapore",
      date: "2024-11-10",
      sqft: "3200 sq ft",
      category: "upcoming",
      client: "Colorlib",
      categories: "Urban",
      rating: 4.5,
      website: "https://examplesite.com/eden-park",
      image:
        "https://cdna.artstation.com/p/assets/images/images/017/941/688/smaller_square/juan-pablo-orrego-contador-rainyfacade.jpg?1557932336",
    },
    {
      title: "Sky Build",
      location: "Paris",
      date: "2024-10-05",
      sqft: "4000 sq ft",
      category: "popular",
      client: "Colorlib",
      categories: "Modern",
      rating: 5,
      website: "https://examplesite.com/sky-build",
      image:
        "https://cdnb.artstation.com/p/assets/images/images/051/802/287/20220719022825/smaller_square/ilya-galinsky-day-01a-logo.jpg?1658215706",
    },
    {
      title: "Green View",
      location: "London",
      date: "2024-09-20",
      sqft: "2900 sq ft",
      category: "latest",
      client: "Colorlib",
      categories: "Eco-friendly",
      rating: 4.6,
      website: "https://examplesite.com/green-view",
      image:
        "https://cdnb.artstation.com/p/assets/images/images/047/048/647/smaller_square/yantram-architectural-design-studio-3d-exterior-modeling-of-small-house-with-garden-by-architectural-design-studio.jpg?1646647795",
    },
    {
      title: "Sunshine Tower",
      location: "Tokyo",
      date: "2024-08-12",
      sqft: "3600 sq ft",
      category: "popular",
      client: "Colorlib",
      categories: "High-rise",
      rating: 4.9,
      website: "https://examplesite.com/sunshine-tower",
      image:
        "https://cdnb.artstation.com/p/assets/covers/images/053/806/567/smaller_square/andi-inzinger-andi-inzinger-sakura-exterior-preview.jpg?1663079291",
    },
    {
      title: "Ocean Heights",
      location: "Dubai",
      date: "2024-07-25",
      sqft: "4200 sq ft",
      category: "upcoming",
      client: "Colorlib",
      categories: "Luxury",
      rating: 5,
      website: "https://examplesite.com/ocean-heights",
      image:
        "https://cdna.artstation.com/p/assets/images/images/021/205/002/smaller_square/yantram-architectural-design-studio-first-floor-residential-3d-floor-house-design-by-archtectural-design-studio.jpg?1570772900",
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const openModal = (project: Project) => {
    setModalData(project);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
      <section className="project-area section-gap-top" id="project">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center">
                <h2>View Our Projects</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="filters mb-4">
                <ul>
                  {["all", "popular", "latest", "following", "upcoming"].map(
                    (category) => (
                      <li
                        key={category}
                        className={activeCategory === category ? "active" : ""}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="grid">
            {filteredProjects.map((project, index) => (
              <div
                className="single-project"
                key={index}
                onClick={() => openModal(project)}
              >
                <div className="thumb">
                  <img
                    className="image img-fluid"
                    src={project.image}
                    alt={project.title}
                  />
                </div>
                <div className="middle">
                  <h4>{project.title}</h4>
                  <div className="cat">{project.location}</div>
                  <p className="details">Date: {project.date}</p>
                  <p className="details">Size: {project.sqft}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <h3>{modalData.title}</h3>
            <div className="modal-image-and-details">
              <div className="modal-image">
                <img src={modalData.image} alt="projetcs-pictures" />
              </div>
              <div className="modal-data-details">
                <p>
                  <strong>Location:</strong> {modalData.location}
                </p>
                <p>
                  <strong>Date:</strong> {modalData.date}
                </p>
                <p>
                  <strong>Size:</strong> {modalData.sqft}
                </p>
                <p>
                  <strong>Client:</strong> {modalData.client}
                </p>
                <p>
                  <strong>Categories:</strong> {modalData.categories}
                </p>
                <p>
                  <strong>Rating:</strong> {modalData.rating} ⭐
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={modalData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {modalData.website}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;

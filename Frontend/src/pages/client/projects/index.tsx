import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import InnerHeader from "../../../components/client/InnerHeader";
import axios from "axios";
import { apiUrl } from "../../../utils";
import bgImage from "../../../assets/images/blue.png"; // adjust path as needed
import ScrollToTop from "../../../components/client/ScrollToTop";

interface ProjectTypes {
  key: string;
  title: string;
}

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

const Projects = () => {
  const [projectTypes, setProjectTypes] = useState<ProjectTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/architecture-web-app/projects/project-types/`
      );
      const fetchedData = response.data.data.map((item: any) => ({
        key: item.id.toString(),
        title: item.title,
      }));
      setProjectTypes(fetchedData);
      if (fetchedData.length > 0) {
        setSelectedCategory(fetchedData[0].key);
      }
    } catch (error) {
      console.error("Error fetching project types:", error);
    }
  };

  const fetchClients = async (id: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/architecture-web-app/projects/get-clients/${id}`
      );
      setClients(response.data.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleClientClick = (clientId: number) => {
    navigate(`/projects/${clientId}`);
  };

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
  };

  useEffect(() => {
    fetchProjectTypes();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setClients([]);
      fetchClients(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <>
      <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
      <section
        className="project-area"
        id="project"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          padding: "60px 0",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Take a closer look at the ideas we've brought{" "}
              <p> to life — each project is a story of</p>
              Innovation, Design, & Impact
            </motion.h2>
          </motion.div>

          <div className="project-layout">
            {/* Sidebar */}
            <motion.div
              className="sidebar"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {projectTypes.map((projectType) => (
                <motion.button
                  key={projectType.key}
                  onClick={() => handleCategoryClick(projectType.key)}
                  className={`sidebar-btn ${
                    selectedCategory === projectType.key ? "active" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {projectType.title}
                </motion.button>
              ))}
            </motion.div>

            {/* Client List */}
            <div className="client-list">
              <AnimatePresence>
                {clients.length > 0 ? (
                  clients.map((client) => {
                    console.log("Client project:", client.project);

                    const featureImage = client.project?.media?.find(
                      (media) => media.image_type === "feature"
                    );

                    return (
                      <motion.div
                        key={client.id}
                        className="client-item"
                        onClick={() => handleClientClick(client.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                      >
                        {featureImage && (
                          <div className="image-wrapper">
                            <motion.img
                              src={featureImage.fileurl}
                              alt={client.fullName}
                              sizes="(max-width: 479px) 100vw, (max-width: 767px) 96vw, (max-width: 991px) 45vw, 37vw"
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.3 }}
                              loading="lazy"
                            />
                            <motion.div
                              className="image-overlay"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <h3>{client.fullName}</h3>
                              <p>{client.address}</p>
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.p
                    className="no-projects-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    No projects available in this category.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <ScrollToTop />
      </section>
    </>
  );
};

export default Projects;

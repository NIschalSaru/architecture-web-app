import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InnerHeader from "../../../components/client/InnerHeader";
import axios from "axios";
import { apiUrl } from "../../../utils";

interface ProjectTypes {
  key: string;
  title: string;
}

interface ClientType {
  id: number;
  project_id: number;
  fullName: string;
  email: string;
  mobile: string;
  address: string;
}

// interface Media {
//   id: number;
//   project_id: number;
//   image_type: string;
//   filename: string;
//   filepath: string;
//   fileurl: string;
// }

// interface Project {
//   id: number;
//   name: string;
//   project_type_id: number;
//   location: string;
//   site_area: string;
//   description: string;
//   media: Media[];
// }

// interface Client {
//   id: number;
//   project_id: number;
//   fullName: string;
//   email: string;
//   mobile: string;
//   address: string;
//   project: Project;
// }

const Projects = () => {
  const [projectTypes, setProjectTypes] = useState<ProjectTypes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [clients, setClients] = useState<ClientType[]>([]);
  // const [selectedClient, setSelectedClient] = useState<Client | null>(null);

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
    } catch (error: unknown) {
      console.error("Error fetching project types:", error as Error);
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

  const navigate = useNavigate();

  const handleClientClick = (clientId: number) => {
    navigate(`/projects/${clientId}`);
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

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
  };

  return (
    <>
      <InnerHeader title="PROJECTS" currentPage="PROJECTS" />
      <section className="project-area section-gap-top" id="project">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>Explore Project Categories</h2>
          </div>

          <div className="project-layout d-flex gap-4">
            {/* === Sidebar === */}
            <div className="sidebar">
              {projectTypes.map((projectType) => (
                <button
                  key={projectType.key}
                  onClick={() => handleCategoryClick(projectType.key)}
                  className={
                    selectedCategory === projectType.key ? "active" : ""
                  }
                >
                  {projectType.title}
                </button>
              ))}
            </div>

            {/* === Client List Area === */}
            <div className="client-grid">
              {clients.map((client) => (
                <div
                  className="client-card card category-card"
                  key={client.id}
                  onClick={() => handleClientClick(client.id)}
                >
                  <div className="client-card-body">
                    <h4 className="client-name">{client.fullName}</h4>
                    <p>
                      <strong>Email:</strong> {client.email}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {client.mobile}
                    </p>
                    <p>
                      <strong>Address:</strong> {client.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;

import { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, message, Tooltip, Image, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import UpdateProjectModal from "./UpdateProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import ViewProjectModal from "./ViewProjectModal";
import { apiUrl } from "../../../../utils";
import LoadingSpinner from "../../../../components/client/LoadingSpinner";
import { useParams } from "react-router-dom";
import CreateProjectModal from "./CreateProjectModal";
import { DataType, MediaType, ProjectType } from "./types";

const ProjectSetting = () => {
  const { project_id } = useParams<{ project_id: string }>();
  const [data, componentSetData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]); // State for filtered data
  const [searchText, setSearchText] = useState<string>(""); // State for search term
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [mediaModalVisible, setMediaModalVisible] = useState<boolean>(false);
  const [selectedMedia, /*setSelectedMedia*/] = useState<MediaType[]>([]);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [, setRecordName] = useState<string>("");
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [viewingRecord, setViewingRecord] = useState<DataType | null>(null);

  // Fetch project types
  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/architecture-web-app/projects/project-types`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProjectTypes(response.data.data);
      } else {
        message.error("Failed to fetch project types");
      }
    } catch (error) {
      message.error("Error fetching project types");
    }
  };

  const fetchData = async () => {
    let url;
    if (!project_id) {
      url = `${apiUrl}/architecture-web-app/projects/get-projects`;
    } else {
      url = `${apiUrl}/architecture-web-app/projects/get-project/${project_id}`;
    }

    setPageLoading(true);
    try {
      const response = await axios.get(url, { withCredentials: true });

      let fetchedData: DataType[] = [];

      if (project_id) {
        // Handle single project response
        const client = response.data.data.client;
        const project = client.project;
        fetchedData = [{
          key: project.id.toString(),
          id: project.id,
          name: project.name,
          project_type_id: project.project_type_id,
          location: project.location,
          site_area: project.site_area,
          description: project.description,
          status: project.status,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          deletedAt: project.deletedAt,
          client: {
            id: client.id,
            project_id: client.project_id,
            fullName: client.fullName,
            email: client.email,
            mobile: client.mobile,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
            deletedAt: client.deletedAt,
          },
          media: project.media,
        }];
      } else {
        // Handle multiple projects response
        fetchedData = response.data.data.map((project: any) => ({
          key: project.id.toString(),
          id: project.id,
          name: project.name,
          project_type_id: project.project_type_id,
          location: project.location,
          site_area: project.site_area,
          description: project.description,
          status: project.status,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          deletedAt: project.deletedAt,
          client: {
            id: project.client.id,
            project_id: project.client.project_id,
            fullName: project.client.fullName,
            email: project.client.email,
            mobile: project.client.mobile,
            address: project.client.address,
            createdAt: project.client.createdAt,
            updatedAt: project.client.updatedAt,
            deletedAt: project.client.deletedAt,
          },
          media: project.media || [],
        }));
      }

      componentSetData(fetchedData);
      setFilteredData(fetchedData); // Initialize filteredData with fetched data
    } catch (error: unknown) {
      console.error("Error:", (error as Error).message);
      message.error("Failed to fetch projects");
    } finally {
      setPageLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value.trim() === "") {
      setFilteredData(data); // Reset to original data if search is empty
    } else {
      const lowerCaseValue = value.toLowerCase();
      const filtered = data.filter((item) =>
        [
          item.name,
          item.location,
          item.site_area,
          item.client.fullName,
          item.client.mobile,
          // Add other fields as needed (e.g., item.description, item.client.email)
        ].some((field) => field?.toString().toLowerCase().includes(lowerCaseValue))
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProjectTypes();
  }, [project_id]);

  // Update filteredData when data changes (e.g., after create/delete/update)
  useEffect(() => {
    setFilteredData(data);
    handleSearch(searchText); // Reapply search filter
  }, [data]);

  const handleUpdate = async (values: {
    name: string;
    project_type_id: number;
    location: string;
    site_area: string;
    description: string;
    client_name: string;
    client_email: string;
    client_mobile: string;
    client_address: string;
    status: boolean;
    image: any;
    gallery: any[];
    deletedMediaIds: number[];
  }) => {
    setPageLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("project_type_id", values.project_type_id.toString());
      formData.append("location", values.location);
      formData.append("site_area", values.site_area);
      formData.append("description", values.description);
      formData.append("client_name", values.client_name);
      formData.append("client_email", values.client_email);
      formData.append("client_mobile", values.client_mobile);
      formData.append("client_address", values.client_address);
      formData.append("status", values.status.toString());

      if (values.image && values.image.originFileObj) {
        formData.append("image", values.image.originFileObj);
        console.log("Image appended:", values.image.originFileObj.name);
      }

      if (values.gallery && Array.isArray(values.gallery) && values.gallery.length > 0) {
        values.gallery.forEach((file: any) => {
          if (file.originFileObj) {
            formData.append("gallery", file.originFileObj);
            console.log(`Gallery image appended: ${file.originFileObj.name}`);
          }
        });
      }

      if (values.deletedMediaIds && values.deletedMediaIds.length > 0) {
        formData.append("deletedMediaIds", JSON.stringify(values.deletedMediaIds));
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      const response = await axios.put(
        `${apiUrl}/architecture-web-app/projects/${editingRecord?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        message.success("Project updated successfully!");
        setEditModalVisible(false);
        fetchData();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message || "Failed to update project");
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setPageLoading(false);
    }
  };

  const handleDeleteClick = (record: DataType) => {
    setEditingRecord(record);
    setRecordName(record.name);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    setPageLoading(true);
    try {
      const response = await axios.delete(
        `${apiUrl}/architecture-web-app/projects/${editingRecord?.id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        message.success(`${editingRecord?.name} has been deleted`);
        componentSetData(data.filter((item) => item.key !== editingRecord?.key));
        setDeleteModalVisible(false);
      }
    } catch (error) {
      message.error("Error deleting project");
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdateClick = (record: DataType) => {
    setEditingRecord(record);
    setEditModalVisible(true);
  };

  const handleCreate = async (values: any) => {
    setPageLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("project_type_id", values.project_type_id.toString());
      formData.append("location", values.location);
      formData.append("site_area", values.site_area);
      formData.append("description", values.description);
      formData.append("client_name", values.client_name);
      formData.append("client_email", values.client_email);
      formData.append("client_mobile", values.client_mobile);
      formData.append("client_address", values.client_address);
      formData.append("status", values.status.toString());

      if (values.image && values.image.originFileObj) {
        formData.append("image", values.image.originFileObj);
        console.log("Image appended:", values.image.originFileObj.name);
      } else {
        console.log("No valid Quentin image file provided");
        message.error("Please upload a valid image");
        setPageLoading(false);
        return;
      }

      if (values.gallery && Array.isArray(values.gallery) && values.gallery.length > 0) {
        values.gallery.forEach((file: any) => {
          if (file.originFileObj) {
            formData.append("gallery", file.originFileObj);
            console.log(`Gallery image appended: ${file.originFileObj.name}`);
          }
        });
      } else {
        console.log("No gallery files provided");
        message.error("Please upload at least one gallery image");
        setPageLoading(false);
        return;
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      const response = await axios.post(
        `${apiUrl}/architecture-web-app/projects`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        message.success("Project created successfully!");
        setCreateModalVisible(false);
        fetchData();
      } else {
        message.error(`Unexpected response from server: ${response.status}`);
      }
    } catch (error: unknown) {
      console.error("Error creating project:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Failed to create project";
        console.log("Server response:", error.response?.data);
        message.error(errorMessage);
      } else {
        message.error("An unexpected error occurred while creating the project");
      }
    } finally {
      setPageLoading(false);
    }
  };

  const handleViewClick = (record: DataType) => {
    setViewingRecord(record);
    setViewModalVisible(true);
  };

  const columns = [
    {
      title: "SN",
      key: "sn",
      render: (_: any, __: DataType, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Site Area",
      dataIndex: "site_area",
      key: "site_area",
    },
    {
      title: "Client Name",
      dataIndex: ["client", "fullName"],
      key: "clientName",
    },
    {
      title: "Client Mobile",
      dataIndex: ["client", "mobile"],
      key: "clientMobile",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <span>
          {status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Tooltip title="View">
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleViewClick(record)}
              style={{ color: "#1890ff", borderColor: "white" }}
            />
          </Tooltip>
          <Tooltip title="Update">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleUpdateClick(record)}
              style={{ color: "green", borderColor: "white" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteClick(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Get the project_type_id from the fetched project data
  const currentProjectTypeId = data.length > 0 ? data[0].project_type_id : projectTypes[0]?.id || 1;

  return (
    <div>
      {pageLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div
            style={{
              marginBottom: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
              className="create-btn"
            >
              Create
            </Button>
            <Input.Search
              placeholder="Search projects by name, location, site area, client name, or mobile"
              allowClear
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 400 }}
            />
          </div>

          <Table<DataType>
            columns={columns}
            dataSource={[...filteredData].sort((a, b) => a.id - b.id)}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
            rowKey="id"
          />

          {editingRecord && (
            <UpdateProjectModal
              visible={editModalVisible}
              onCancel={() => setEditModalVisible(false)}
              onUpdate={handleUpdate}
              initialValues={{
                name: editingRecord.name,
                project_type_id: editingRecord.project_type_id,
                location: editingRecord.location,
                site_area: editingRecord.site_area,
                description: editingRecord.description,
                client_name: editingRecord.client.fullName,
                client_email: editingRecord.client.email,
                client_mobile: editingRecord.client.mobile,
                client_address: editingRecord.client.address,
                status: editingRecord.status,
                image: editingRecord.media.find((m: MediaType) => m.image_type === "feature") || null,
                gallery: editingRecord.media.filter((m: MediaType) => m.image_type === "gallery"),
              }}
            />
          )}

          <DeleteProjectModal
            visible={deleteModalVisible}
            onCancel={() => setDeleteModalVisible(false)}
            onConfirm={handleDeleteConfirm}
            recordName={editingRecord?.name || ""}
          />

          <Modal
            title="Project Images"
            open={mediaModalVisible}
            onCancel={() => setMediaModalVisible(false)}
            footer={null}
            width={800}
            className="testimonial-modal"
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedMedia.map((media) => (
                <Image
                  key={media.id}
                  src={media.fileurl}
                  alt={media.image_type}
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              ))}
            </div>
          </Modal>

          <ViewProjectModal
            visible={viewModalVisible}
            onCancel={() => setViewModalVisible(false)}
            record={viewingRecord}
            projectTypes={projectTypes}
          />

          <CreateProjectModal
            visible={createModalVisible}
            onCancel={() => setCreateModalVisible(false)}
            onCreate={handleCreate}
            projectTypeId={currentProjectTypeId}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectSetting;














// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Space, Table, Button, message, Tooltip, Image, Modal } from "antd";
// import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
// import UpdateProjectModal from "./UpdateProjectModal";
// import DeleteProjectModal from "./DeleteProjectModal";
// import ViewProjectModal from "./ViewProjectModal";
// import { apiUrl } from "../../../../utils";
// import LoadingSpinner from "../../../../components/client/LoadingSpinner";
// import { useParams } from "react-router-dom";
// import CreateProjectModal from "./CreateProjectModal";
// import { DataType, MediaType, ProjectType } from "./types"; //ClientType

// const ProjectSetting = () => {
//   const { project_id } = useParams<{ project_id: string }>();
//   const [data, componentSetData] = useState<DataType[]>([]);
//   const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
//   const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
//   const [mediaModalVisible, setMediaModalVisible] = useState<boolean>(false);
//   const [selectedMedia, /*setSelectedMedia*/] = useState<MediaType[]>([]);
//   const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
//   const [, setRecordName] = useState<string>("");
//   const [pageLoading, setPageLoading] = useState<boolean>(false);
//   const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
//   const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
//   const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
//   const [viewingRecord, setViewingRecord] = useState<DataType | null>(null);

//   // Fetch project types
//   const fetchProjectTypes = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/architecture-web-app/projects/project-types`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setProjectTypes(response.data.data);
//       } else {
//         message.error("Failed to fetch project types");
//       }
//     } catch (error) {
//       message.error("Error fetching project types");
//     }
//   };

//   const fetchData = async () => {
//     let url;
//     if (!project_id) {
//       url = `${apiUrl}/architecture-web-app/projects/get-projects`;
//     } else {
//       url = `${apiUrl}/architecture-web-app/projects/get-project/${project_id}`;
//     }

//     setPageLoading(true);
//     try {
//       const response = await axios.get(url, { withCredentials: true });

//       let fetchedData: DataType[] = [];

//       if (project_id) {
//         // Handle single project response
//         const client = response.data.data.client;
//         const project = client.project;
//         fetchedData = [{
//           key: project.id.toString(),
//           id: project.id,
//           name: project.name,
//           project_type_id: project.project_type_id,
//           location: project.location,
//           site_area: project.site_area,
//           description: project.description,
//           createdAt: project.createdAt,
//           updatedAt: project.updatedAt,
//           deletedAt: project.deletedAt,
//           client: {
//             id: client.id,
//             project_id: client.project_id,
//             fullName: client.fullName,
//             email: client.email,
//             mobile: client.mobile,
//             address: client.address,
//             createdAt: client.createdAt,
//             updatedAt: client.updatedAt,
//             deletedAt: client.deletedAt,
//           },
//           media: project.media,
//         }];
//       } else {
//         // Handle multiple projects response
//         fetchedData = response.data.data.map((project: any) => ({
//           key: project.id.toString(),
//           id: project.id,
//           name: project.name,
//           project_type_id: project.project_type_id,
//           location: project.location,
//           site_area: project.site_area,
//           description: project.description,
//           createdAt: project.createdAt,
//           updatedAt: project.updatedAt,
//           deletedAt: project.deletedAt,
//           client: {
//             id: project.client.id,
//             project_id: project.client.project_id,
//             fullName: project.client.fullName,
//             email: project.client.email,
//             mobile: project.client.mobile,
//             address: project.client.address,
//             createdAt: project.client.createdAt,
//             updatedAt: project.client.updatedAt,
//             deletedAt: project.client.deletedAt,
//           },
//           media: project.media || [],
//         }));
//       }

//       componentSetData(fetchedData);
//     } catch (error: unknown) {
//       console.error("Error:", (error as Error).message);
//       message.error("Failed to fetch projects");
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchProjectTypes(); // Fetch project types on component mount
//   }, [project_id]);

//   const handleUpdate = async (values: {
//     name: string;
//     project_type_id: number;
//     location: string;
//     site_area: string;
//     description: string;
//     client_name: string;
//     client_email: string;
//     client_mobile: string;
//     client_address: string;
//     image: any;
//     gallery: any[];
//     deletedMediaIds: number[];
//   }) => {
//     setPageLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("project_type_id", values.project_type_id.toString());
//       formData.append("location", values.location);
//       formData.append("site_area", values.site_area);
//       formData.append("description", values.description);
//       formData.append("client_name", values.client_name);
//       formData.append("client_email", values.client_email);
//       formData.append("client_mobile", values.client_mobile);
//       formData.append("client_address", values.client_address);

//       if (values.image && values.image.originFileObj) {
//         formData.append("image", values.image.originFileObj);
//         console.log("Image appended:", values.image.originFileObj.name);
//       }

//       if (values.gallery && Array.isArray(values.gallery) && values.gallery.length > 0) {
//         values.gallery.forEach((file: any) => {
//           if (file.originFileObj) {
//             formData.append("gallery", file.originFileObj);
//             console.log(`Gallery image appended: ${file.originFileObj.name}`);
//           }
//         });
//       }

//       if (values.deletedMediaIds && values.deletedMediaIds.length > 0) {
//         formData.append("deletedMediaIds", JSON.stringify(values.deletedMediaIds));
//       }

//       for (const [key, value] of formData.entries()) {
//         console.log(`${key}: ${value instanceof File ? value.name : value}`);
//       }

//       const response = await axios.put(
//         `${apiUrl}/architecture-web-app/projects/${editingRecord?.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         message.success("Project updated successfully!");
//         setEditModalVisible(false);
//         fetchData();
//       }
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         message.error(error.response?.data.message || "Failed to update project");
//       } else {
//         message.error("An unexpected error occurred");
//       }
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   const handleDeleteClick = (record: DataType) => {
//     setEditingRecord(record);
//     setRecordName(record.name);
//     setDeleteModalVisible(true);
//   };

//   const handleDeleteConfirm = async () => {
//     setPageLoading(true);
//     try {
//       const response = await axios.delete(
//         `${apiUrl}/architecture-web-app/projects/${editingRecord?.id}`,
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         message.success(`${editingRecord?.name} has been deleted`);
//         componentSetData(data.filter((item) => item.key !== editingRecord?.key));
//         setDeleteModalVisible(false);
//       }
//     } catch (error) {
//       message.error("Error deleting project");
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   const handleUpdateClick = (record: DataType) => {
//     setEditingRecord(record);
//     setEditModalVisible(true);
//   };

//   // const handleMediaClick = (media: MediaType[]) => {
//   //   setSelectedMedia(media);
//   //   setMediaModalVisible(true);
//   // };

//   const handleCreate = async (values: any) => {
//     setPageLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("project_type_id", values.project_type_id.toString());
//       formData.append("location", values.location);
//       formData.append("site_area", values.site_area);
//       formData.append("description", values.description);
//       formData.append("client_name", values.client_name);
//       formData.append("client_email", values.client_email);
//       formData.append("client_mobile", values.client_mobile);
//       formData.append("client_address", values.client_address);

//       if (values.image && values.image.originFileObj) {
//         formData.append("image", values.image.originFileObj);
//         console.log("Image appended:", values.image.originFileObj.name);
//       } else {
//         console.log("No valid image file provided");
//         message.error("Please upload a valid image");
//         setPageLoading(false);
//         return;
//       }

//       if (values.gallery && Array.isArray(values.gallery) && values.gallery.length > 0) {
//         values.gallery.forEach((file: any) => {
//           if (file.originFileObj) {
//             formData.append("gallery", file.originFileObj);
//             console.log(`Gallery image appended: ${file.originFileObj.name}`);
//           }
//         });
//       } else {
//         console.log("No gallery files provided");
//         message.error("Please upload at least one gallery image");
//         setPageLoading(false);
//         return;
//       }

//       for (const [key, value] of formData.entries()) {
//         console.log(`${key}: ${value instanceof File ? value.name : value}`);
//       }

//       const response = await axios.post(
//         `${apiUrl}/architecture-web-app/projects`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         message.success("Project created successfully!");
//         setCreateModalVisible(false);
//         fetchData();
//       } else {
//         message.error(`Unexpected response from server: ${response.status}`);
//       }
//     } catch (error: unknown) {
//       console.error("Error creating project:", error);
//       if (axios.isAxiosError(error)) {
//         const errorMessage = error.response?.data?.message || "Failed to create project";
//         console.log("Server response:", error.response?.data);
//         message.error(errorMessage);
//       } else {
//         message.error("An unexpected error occurred while creating the project");
//       }
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   const handleViewClick = (record: DataType) => {
//     setViewingRecord(record);
//     setViewModalVisible(true);
//   };

//   const columns = [
//     {
//       title: "SN",
//       key: "sn",
//       render: (_: any, __: DataType, index: number) => index + 1,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Location",
//       dataIndex: "location",
//       key: "location",
//     },
//     {
//       title: "Site Area",
//       dataIndex: "site_area",
//       key: "site_area",
//     },
//     {
//       title: "Client Name",
//       dataIndex: ["client", "fullName"],
//       key: "clientName",
//     },
//     // {
//     //   title: "Client Email",
//     //   dataIndex: ["client", "email"],
//     //   key: "clientEmail",
//     // },
//     {
//       title: "Client Mobile",
//       dataIndex: ["client", "mobile"],
//       key: "clientMobile",
//     },
//     // {
//     //   title: "Client Address",
//     //   dataIndex: ["client", "address"],
//     //   key: "clientAddress",
//     // },
//     {
//       title: "Action",
//       key: "action",
//       render: (_: any, record: DataType) => (
//         <Space size="middle">
//           <Tooltip title="View">
//             <Button
//               icon={<EyeOutlined />}
//               onClick={() => handleViewClick(record)}
//               style={{ color: "#1890ff", borderColor: "white" }}
//             />
//           </Tooltip>
//           <Tooltip title="Update">
//             <Button
//               icon={<EditOutlined />}
//               onClick={() => handleUpdateClick(record)}
//               style={{ color: "green", borderColor: "white" }}
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Button
//               type="text"
//               danger
//               icon={<DeleteOutlined />}
//               onClick={() => handleDeleteClick(record)}
//             />
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   // Get the project_type_id from the fetched project data
//   const currentProjectTypeId = data.length > 0 ? data[0].project_type_id : projectTypes[0]?.id || 1;

//   return (
//     <div>
//       {pageLoading ? (
//         <LoadingSpinner />
//       ) : (
//         <div>
//           <div
//             style={{
//               marginBottom: "16px",
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => setCreateModalVisible(true)}
//               className="create-btn"
//             >
//               Create
//             </Button>
//           </div>

//           <Table<DataType>
//             columns={columns}
//             dataSource={[...data].sort((a, b) => a.id - b.id)}
//             pagination={{ pageSize: 10 }}
//             scroll={{ x: "max-content" }}
//             rowKey="id"
//           />

//           {editingRecord && (
//             <UpdateProjectModal
//               visible={editModalVisible}
//               onCancel={() => setEditModalVisible(false)}
//               onUpdate={handleUpdate}
//               initialValues={{
//                 name: editingRecord.name,
//                 project_type_id: editingRecord.project_type_id,
//                 location: editingRecord.location,
//                 site_area: editingRecord.site_area,
//                 description: editingRecord.description,
//                 client_name: editingRecord.client.fullName,
//                 client_email: editingRecord.client.email,
//                 client_mobile: editingRecord.client.mobile,
//                 client_address: editingRecord.client.address,
//                 image: editingRecord.media.find((m: MediaType) => m.image_type === "feature") || null,
//                 gallery: editingRecord.media.filter((m: MediaType) => m.image_type === "gallery"),
//               }}
//             />
//           )}

//           <DeleteProjectModal
//             visible={deleteModalVisible}
//             onCancel={() => setDeleteModalVisible(false)}
//             onConfirm={handleDeleteConfirm}
//             recordName={editingRecord?.name || ""}
//           />

//           <Modal
//             title="Project Images"
//             open={mediaModalVisible}
//             onCancel={() => setMediaModalVisible(false)}
//             footer={null}
//             width={800}
//             className="testimonial-modal"
//           >
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//               {selectedMedia.map((media) => (
//                 <Image
//                   key={media.id}
//                   src={media.fileurl}
//                   alt={media.image_type}
//                   width={200}
//                   height={200}
//                   style={{ objectFit: "cover" }}
//                 />
//               ))}
//             </div>
//           </Modal>

//           <ViewProjectModal
//             visible={viewModalVisible}
//             onCancel={() => setViewModalVisible(false)}
//             record={viewingRecord}
//           />

//           <CreateProjectModal
//             visible={createModalVisible}
//             onCancel={() => setCreateModalVisible(false)}
//             onCreate={handleCreate}
//             projectTypeId={currentProjectTypeId}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectSetting;





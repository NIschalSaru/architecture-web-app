import { useState, useEffect } from "react";
import { Table, message, Button, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; //PlusOutlined
import useGetAPI from "../../../hooks/useGetAPI";
// import usePostAPI from "../../../hooks/usePostAPI"; // Assuming you have this from previous interactions
import axios from "axios";
import { apiUrl } from "../../../utils";
import LoadingSpinner from "../../../components/client/LoadingSpinner";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

interface ClientFormData {
  id: string;
  key: string;
  fullName: string;
  email: string;
  mobile: string;
  site_location: string;
  site_area: string;
  type_of_building: string;
  project_duration: string;
  access_road_width: string;
  topography: string;
  site_orientation_details: string;
  site_orientation: string[];
  FAR: string;
  GCR: string;
  setback: string;
  no_of_floor: number;
  parking_area: string;
  room_requirements: string;
  status: string;
  createdAt: string;
}

const ClientFormSetting = () => {
  const { data, loading, error } = useGetAPI<ClientFormData[]>("architecture-web-app/forms");
  // const { postData } = usePostAPI("/architecture-web-app/forms");
  // const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<ClientFormData | null>(null);
  const [recordName, setRecordName] = useState<string>("");
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      message.error("Failed to fetch client forms: " + error);
    }
  }, [error]);

  // const handleCreate = async (values: any) => {
  //   setPageLoading(true);
  //   try {
  //     await postData(values);
  //     message.success("Client form created successfully!");
  //     setModalVisible(false);
  //   } catch (err) {
  //     message.error("Failed to create client form");
  //   } finally {
  //     setPageLoading(false);
  //   }
  // };

  const handleUpdate = async (values: any) => {
    setPageLoading(true);
    try {
      await axios.put(`${apiUrl}/architecture-web-app/forms/${editingRecord?.id}`, values, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      message.success("Client form updated successfully!");
      setEditModalVisible(false);
    } catch (err) {
      message.error("Failed to update client form");
    } finally {
      setPageLoading(false);
    }
  };

  const handleDeleteClick = (record: ClientFormData) => {
    setEditingRecord(record);
    setRecordName(record.fullName);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    setPageLoading(true);
    try {
      await axios.delete(`${apiUrl}/architecture-web-app/forms/${editingRecord?.id}`, {
        withCredentials: true,
      });
      message.success(`${editingRecord?.fullName} has been deleted`);
      setDeleteModalVisible(false);
    } catch (err) {
      message.error("Error deleting client form");
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdateClick = (record: ClientFormData) => {
    setEditingRecord(record);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: "SN",
      key: "sn",
      render: (_: any, __: ClientFormData, index: number) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Site Location",
      dataIndex: "site_location",
      key: "site_location",
    },
    {
      title: "Site Area",
      dataIndex: "site_area",
      key: "site_area",
    },
    {
      title: "Building Type",
      dataIndex: "type_of_building",
      key: "type_of_building",
    },
    {
      title: "Project Duration",
      dataIndex: "project_duration",
      key: "project_duration",
    },
    {
      title: "Access Road Width",
      dataIndex: "access_road_width",
      key: "access_road_width",
    },
    {
      title: "Topography",
      dataIndex: "topography",
      key: "topography",
    },
    {
      title: "Site Orientation",
      dataIndex: "site_orientation",
      key: "site_orientation",
      render: (site_orientation: string[]) => site_orientation.join(", ") || "None",
    },
    {
      title: "Orientation Details",
      dataIndex: "site_orientation_details",
      key: "site_orientation_details",
    },
    {
      title: "FAR",
      dataIndex: "FAR",
      key: "FAR",
    },
    {
      title: "GCR",
      dataIndex: "GCR",
      key: "GCR",
    },
    {
      title: "Setback",
      dataIndex: "setback",
      key: "setback",
    },
    {
      title: "No. of Floors",
      dataIndex: "no_of_floor",
      key: "no_of_floor",
    },
    {
      title: "Parking Area",
      dataIndex: "parking_area",
      key: "parking_area",
    },
    {
      title: "Room Requirements",
      dataIndex: "room_requirements",
      key: "room_requirements",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ClientFormData) => (
        <Space size="middle">
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

  return (
    <div>
      {pageLoading || loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="dashboard-Headings">Client Requirement Form</div>
          <Table<ClientFormData>
            columns={columns}
            dataSource={data?.map((item) => ({ ...item, key: item.id.toString() })) || []}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
            rowKey="id"
          />
          {editingRecord && (
            <UpdateModal
              visible={editModalVisible}
              onCancel={() => setEditModalVisible(false)}
              onUpdate={handleUpdate}
              initialValues={editingRecord}
            />
          )}
          <DeleteModal
            visible={deleteModalVisible}
            onCancel={() => setDeleteModalVisible(false)}
            onConfirm={handleDeleteConfirm}
            recordName={recordName}
          />
        </div>
      )}
    </div>
  );
};

export default ClientFormSetting;







// import { useEffect } from "react";
// import { Table, message } from "antd";
// import useGetAPI from "../../../hooks/useGetAPI";
// import LoadingSpinner from "../../../components/client/LoadingSpinner";

// interface ClientFormData {
//   id: string;
//   key: string;
//   fullName: string;
//   email: string;
//   mobile: string;
//   site_location: string;
//   site_area: string;
//   type_of_building: string;
//   project_duration: string;
//   access_road_width: string;
//   topography: string;
//   site_orientation_details: string;
//   site_orientation: string[];
//   FAR: string;
//   GCR: string;
//   setback: string;
//   no_of_floor: number;
//   parking_area: string;
//   room_requirements: string;
//   status: string;
//   createdAt: string;
// }

// const ClientFormSetting = () => {
//   const { data, loading, error } = useGetAPI<ClientFormData[]>("architecture-web-app/forms");

//   useEffect(() => {
//     if (error) {
//       message.error("Failed to fetch client forms: " + error);
//     }
//   }, [error]);

//   const columns = [
//     {
//       title: "SN",
//       key: "sn",
//       render: (_: any, __: ClientFormData, index: number) => index + 1, // Auto-increment starting from 1
//     },
//     {
//       title: "Full Name",
//       dataIndex: "fullName",
//       key: "fullName",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Mobile",
//       dataIndex: "mobile",
//       key: "mobile",
//     },
//     {
//       title: "Site Location",
//       dataIndex: "site_location",
//       key: "site_location",
//     },
//     {
//       title: "Site Area",
//       dataIndex: "site_area",
//       key: "site_area",
//     },
//     {
//       title: "Building Type",
//       dataIndex: "type_of_building",
//       key: "type_of_building",
//     },
//     {
//       title: "Project Duration",
//       dataIndex: "project_duration",
//       key: "project_duration",
//     },
//     {
//       title: "Access Road Width",
//       dataIndex: "access_road_width",
//       key: "access_road_width",
//     },
//     {
//       title: "Topography",
//       dataIndex: "topography",
//       key: "topography",
//     },
//     {
//       title: "Site Orientation",
//       dataIndex: "site_orientation",
//       key: "site_orientation",
//       render: (site_orientation: string[]) => site_orientation.join(", ") || "None",
//     },
//     {
//       title: "Orientation Details",
//       dataIndex: "site_orientation_details",
//       key: "site_orientation_details",
//     },
//     {
//       title: "FAR",
//       dataIndex: "FAR",
//       key: "FAR",
//     },
//     {
//       title: "GCR",
//       dataIndex: "GCR",
//       key: "GCR",
//     },
//     {
//       title: "Setback",
//       dataIndex: "setback",
//       key: "setback",
//     },
//     {
//       title: "No. of Floors",
//       dataIndex: "no_of_floor",
//       key: "no_of_floor",
//     },
//     {
//       title: "Parking Area",
//       dataIndex: "parking_area",
//       key: "parking_area",
//     },
//     {
//       title: "Room Requirements",
//       dataIndex: "room_requirements",
//       key: "room_requirements",
//     }
//   ];

//   return (
//     <div>
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <Table<ClientFormData>
//           columns={columns}
//           dataSource={data?.map((item) => ({ ...item, key: item.id.toString() })) || []}
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: "max-content" }}
//           rowKey="id" // Use API-provided id for unique row key
//         />
//       )}
//     </div>
//   );
// };

// export default ClientFormSetting;
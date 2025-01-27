import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, message, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CreateModal from "./createModal";
import UpdateModal from "./updateModal";

interface DataType {
  key: string;
  name: string;
  designation: string;
  ratings: number;
  message: string;
}

const TestimonialSetting = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data from API
  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateClick = () => {
    setIsEditMode(false);
    setModalVisible(true);
  };

  const handleUpdate = (record: DataType) => {
    setIsEditMode(true);
    setEditingRecord(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (record: DataType) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/architecture-web-app/testimonial/${record.key}`
      );
      if (response.status === 200) {
        setData(data.filter((item) => item.key !== record.key));
        message.success(`${record.name} has been deleted`);
      } else {
        message.error("Failed to delete the record");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Error deleting record");
    }
  };

  const handleFormSubmit = async (values: any) => {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Rating",
      dataIndex: "ratings",
      key: "ratings",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Tooltip title="Update">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleUpdate(record)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateClick}
          style={{ backgroundColor: "#b0190e", border: "none" }}
        >
          Create
        </Button>
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <CreateModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={handleFormSubmit}
      />

      {editingRecord && (
        <UpdateModal
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onUpdate={handleFormSubmit}
          initialValues={editingRecord}
        />
      )}
    </>
  );
};

export default TestimonialSetting;

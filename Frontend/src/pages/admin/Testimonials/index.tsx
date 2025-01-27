import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, message, Form, Spin, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CreateModal from "./createModal";
import UpdateModal from "./updateModal";
import DeleteModal from "./deleteModal"; // Import DeleteModal
import { apiUrl } from "../../../utils";

interface DataType {
  key: string;
  name: string;
  designation: string;
  rating: number;
  message: string;
}

const TestimonialSetting = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [recordName, setRecordName] = useState<string>("");

  const [form] = Form.useForm();

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/architecture-web-app/testimonial`
      );
      const fetchedData = response.data.data.map((testimonial: any) => ({
        key: testimonial.id.toString(),
        name: testimonial.fullname,
        designation: testimonial.designation,
        rating: testimonial.rating,
        message: testimonial.message,
      }));
      setData(fetchedData);
    } catch (error: unknown) {
      console.error("Error:", (error as Error).message);
      message.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("designation", values.designation);
      formData.append("rating", values.rating.toString());
      formData.append("message", values.message);
      const fileList = form.getFieldValue("imageUrl");
      if (fileList?.[0]?.originFileObj) {
        formData.append("imageUrl", fileList[0].originFileObj);
      }

      const response = await axios.post(
        `${apiUrl}/architecture-web-app/testimonial`,
        formData
      );
      if (response.status === 201) {
        message.success("Testimonial created successfully!");
        setModalVisible(false);
        fetchData();
      }
    } catch (error) {
      message.error("Failed to create testimonial");
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("designation", values.designation);
      formData.append("rating", values.rating.toString());
      formData.append("message", values.message);
      if (values.imagefile) {
        formData.append("imageUrl", values.imageUrl);
      }

      const response = await axios.put(
        `${apiUrl}/architecture-web-app/testimonial/${editingRecord?.key}`,
        formData
      );
      if (response.status === 200) {
        message.success("Testimonial updated successfully!");
        setEditModalVisible(false);
        fetchData();
      }
    } catch (error) {
      message.error("Failed to update testimonial");
    }
  };

  const handleDeleteClick = (record: DataType) => {
    setEditingRecord(record);
    setRecordName(record.name);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log(`${editingRecord?.key}`);
      const response = await axios.delete(
        `${apiUrl}/architecture-web-app/testimonial/${editingRecord?.key}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setData(data.filter((item) => item.key !== editingRecord?.key));
        message.success(`${editingRecord?.name} has been deleted`);
        setDeleteModalVisible(false);
      }
    } catch (error) {
      message.error("Error deleting record");
    }
  };

  const handleUpdateClick = (record: DataType) => {
    setEditingRecord(record);
    setEditModalVisible(true);
  };

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
      dataIndex: "rating",
      key: "rating",
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
              onClick={() => handleUpdateClick(record)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteClick(record)} // Updated here
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
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
          onClick={() => setModalVisible(true)}
          style={{ backgroundColor: "#b0190e", border: "none" }}
        >
          Create
        </Button>
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />

      <CreateModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={handleCreate}
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
        recordName={editingRecord?.name || ""}
      />
    </Spin>
  );
};

export default TestimonialSetting;

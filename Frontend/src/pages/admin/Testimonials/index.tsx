import { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, message, Tooltip, Rate, UploadFile } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CreateModal from "./createModal";
import UpdateModal from "./updateModal";
import DeleteModal from "./deleteModal";
import { apiUrl } from "../../../utils";
import LoadingSpinner from "../../../components/client/LoadingSpinner";
interface DataType {
  key: string;
  fullname: string;
  designation: string;
  rating: number;
  message: string;
  imagefile: UploadFile | null;
}

const TestimonialSetting = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [, setRecordName] = useState<string>("");
  const [pageLoading, setPageLoading] = useState<boolean>(false); // New global loading state


  // Fetch data from API
  const fetchData = async () => {
    setPageLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/architecture-web-app/testimonial`
      );
      const fetchedData = response.data.data.map((testimonial: any) => ({
        key: testimonial.id.toString(),
        fullname: testimonial.fullname,
        designation: testimonial.designation,
        rating: testimonial.rating,
        message: testimonial.message,
        imageUrl: testimonial.imageUrl || "",
      }));
      setData(fetchedData);
    } catch (error: unknown) {
      console.error("Error:", (error as Error).message);
      message.error("Failed to fetch testimonials");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (formData: FormData) => {
    setPageLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/architecture-web-app/testimonial`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        message.success("Testimonial created successfully!");
        setModalVisible(false);
        fetchData();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(
          error.response?.data.message || "Failed to create testimonial"
        );
      } else {
        message.error("An unexpected error occurred");
      }
    }
    finally {
      setPageLoading(false);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    setPageLoading(true);
    console.log(`${editingRecord?.key}`);
    try {
      const response = await axios.put(
        `${apiUrl}/architecture-web-app/testimonial/${editingRecord?.key}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        message.success("Testimonial updated successfully!");
        setEditModalVisible(false);
        fetchData();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(
          error.response?.data.message || "Failed to update testimonial"
        );
      } else {
        message.error("An unexpected error occurred");
      }
    }
    finally {
      setPageLoading(false);
    }
  };

  const handleDeleteClick = (record: DataType) => {
    setEditingRecord(record);
    setRecordName(record.fullname);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    setPageLoading(true);
    try {
      const response = await axios.delete(
        `${apiUrl}/architecture-web-app/testimonial/${editingRecord?.key}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setData(data.filter((item) => item.key !== editingRecord?.key));
        message.success(`${editingRecord?.fullname} has been deleted`);
        setDeleteModalVisible(false);
      }
    } catch (error) {
      message.error("Error deleting record");
    }
    finally {
      setPageLoading(false);
    }
  };

  const handleUpdateClick = (record: DataType) => {
    setEditingRecord(record);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
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
      render: (rating: number) => (
        <Rate
          disabled
          value={rating}
          allowHalf
          style={{ fontSize: "18px", color: "#fadb14" }}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) =>
        imageUrl ? (
          <img
            src={imageUrl}
            alt="Testimonial"
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
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
      {pageLoading  ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="dashboard-Headings">Testimonial Informations</div>
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
              className="create-btn"
            >
              Create
            </Button>
          </div>

          <Table<DataType>
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
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
            recordName={editingRecord?.fullname || ""}
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialSetting;

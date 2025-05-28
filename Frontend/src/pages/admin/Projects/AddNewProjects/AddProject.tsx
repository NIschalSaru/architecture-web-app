import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiUrl } from "../../../../utils";
import { useParams, useNavigate } from "react-router-dom";

const AddProject = () => {
  const { project_id } = useParams<{ project_id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      setImageFile(info.file.originFileObj);
    } else if (info.file.status === "removed") {
      setImageFile(null);
    }
    return false;
  };

  const handleGalleryUpload = (info: any) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      setGalleryFiles(info.fileList.map((file: any) => file.originFileObj));
    } else if (info.file.status === "removed") {
      setGalleryFiles(info.fileList.map((file: any) => file.originFileObj));
    }
    return false;
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("project_type_id", project_id || "");
      formData.append("location", values.location);
      formData.append("site_area", values.site_area);
      formData.append("description", values.description);
      formData.append("client_name", values.client_name);
      formData.append("client_email", values.client_email);
      formData.append("client_mobile", values.client_mobile);
      formData.append("client_address", values.client_address);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      galleryFiles.forEach((file) => {
        formData.append("gallery", file);
      });

      const response = await axios.post(
        `${apiUrl}/architecture-web-app/projects/`,
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
        navigate(`/admin/projects/projects-settings/${project_id}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message || "Failed to create project");
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#fff" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "24px", color: "#333" }}>
        Add New Project
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "800px" }}
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[{ required: true, message: "Please enter the project name" }]}
        >
          <Input placeholder="Enter project name" style={{ borderRadius: "4px" }} />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter the location" }]}
        >
          <Input placeholder="Enter location" style={{ borderRadius: "4px" }} />
        </Form.Item>

        <Form.Item
          name="site_area"
          label="Site Area"
          rules={[{ required: true, message: "Please enter the site area" }]}
        >
          <Input placeholder="Enter site area" style={{ borderRadius: "4px" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the description" }]}
        >
          <Input.TextArea
            placeholder="Enter description"
            rows={4}
            style={{ borderRadius: "4px" }}
          />
        </Form.Item>

        <Form.Item
          name="client_name"
          label="Client Name"
          rules={[{ required: true, message: "Please enter the client name" }]}
        >
          <Input placeholder="Enter client name" style={{ borderRadius: "4px" }} />
        </Form.Item>

        <Form.Item
          name="client_email"
          label="Client Email"
          rules={[
            { required: true, message: "Please enter the client email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter client email" style={{ borderRadius: "4px" }} />
        </Form.Item>

        <Form.Item
          name="client_mobile"
          label="Client Mobile"
          rules={[
            { required: true, message: "Please enter the client mobile" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit mobile number",
            },
          ]}
        >
          <Input placeholder="Enter client mobile" style={{ borderRadius: "4px" }} />
        </Form.Item>

        <Form.Item
          name="client_address"
          label="Client Address"
          rules={[{ required: true, message: "Please enter the client address" }]}
        >
          <Input placeholder="Enter client address" style={{ borderRadius: "4px" }} />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image (Single)"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={handleImageUpload}
            maxCount={1}
            accept="image/*"
            fileList={imageFile ? [{ uid: "-1", name: imageFile.name, status: "done" }] : []}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ borderRadius: "4px" }}
            >
              Upload Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="gallery"
          label="Gallery (Multiple Images)"
          rules={[{ required: true, message: "Please upload at least one gallery image" }]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={handleGalleryUpload}
            multiple
            accept="image/*"
            fileList={galleryFiles.map((file, index) => ({
              uid: `-${index}`,
              name: file.name,
              status: "done",
            }))}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ borderRadius: "4px" }}
            >
              Upload Gallery Images
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "150px",
                borderRadius: "4px",
                background: "#1890ff",
                borderColor: "#1890ff",
              }}
            >
              Create Project
            </Button>
            <Button
              onClick={() => navigate(`/admin/projects/projects-settings/${project_id}`)}
              style={{
                width: "150px",
                borderRadius: "4px",
              }}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProject;
import { Modal, Form, Input, Button, Upload, message, Row, Col, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons"; //DeleteOutlined
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../utils";

interface ProjectType {
  id: number;
  title: string;
  status: boolean;
}

interface MediaType {
  id: number;
  project_id: number;
  image_type: string;
  fileurl: string;
  filename: string;
}

// interface ClientType {
//   id: number;
//   project_id: number;
//   fullName: string;
//   email: string;
//   mobile: string;
//   address: string;
// }

interface UpdateProjectModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: any) => void;
  initialValues: {
    name: string;
    project_type_id: number;
    location: string;
    site_area: string;
    description: string;
    client_name: string;
    client_email: string;
    client_mobile: string;
    client_address: string;
    image?: MediaType | null;
    gallery?: MediaType[];
  };
}

const UpdateProjectModal = ({
  visible,
  onCancel,
  onUpdate,
  initialValues,
}: UpdateProjectModalProps) => {
  const [form] = Form.useForm();
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFileList, setImageFileList] = useState<any[]>([]);
  const [galleryFileList, setGalleryFileList] = useState<any[]>([]);
  const [deletedMediaIds, setDeletedMediaIds] = useState<number[]>([]);

  // Fetch project types from API
  const fetchProjectTypes = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Initialize form and file lists when modal opens
  useEffect(() => {
    if (visible) {
      fetchProjectTypes();
      // Initialize form with provided initialValues
      form.setFieldsValue({
        name: initialValues.name,
        project_type_id: initialValues.project_type_id,
        location: initialValues.location,
        site_area: initialValues.site_area,
        description: initialValues.description,
        client_name: initialValues.client_name,
        client_email: initialValues.client_email,
        client_mobile: initialValues.client_mobile,
        client_address: initialValues.client_address,
        image: initialValues.image
          ? [{ uid: initialValues.image.id, name: initialValues.image.filename, url: initialValues.image.fileurl, status: "done" }]
          : [],
        gallery: initialValues.gallery
          ? initialValues.gallery.map((media) => ({
              uid: media.id,
              name: media.filename,
              url: media.fileurl,
              status: "done",
            }))
          : [],
      });
      // Initialize file lists for preview
      setImageFileList(
        initialValues.image
          ? [{ uid: initialValues.image.id, name: initialValues.image.filename, url: initialValues.image.fileurl, status: "done" }]
          : []
      );
      setGalleryFileList(
        initialValues.gallery
          ? initialValues.gallery.map((media) => ({
              uid: media.id,
              name: media.filename,
              url: media.fileurl,
              status: "done",
            }))
          : []
      );
      setDeletedMediaIds([]);
    }
  }, [visible, initialValues, form]);

  // Handle single image upload
  const handleImageUpload = ({ fileList }: any) => {
    const file = fileList.length > 0 ? fileList[0] : null;
    setImageFileList(file ? [file] : []);
    form.setFieldsValue({ image: file });
    return false; // Prevent automatic upload
  };

  // Handle gallery images upload
  const handleGalleryUpload = ({ fileList }: any) => {
    const updatedFileList = fileList.map((file: any) => ({
      uid: file.uid || `new-${Math.random()}`,
      name: file.name || file.filename,
      status: file.status || "done",
      url: file.url || (file.originFileObj ? URL.createObjectURL(file.originFileObj) : null),
      originFileObj: file.originFileObj || null,
    }));
    setGalleryFileList(updatedFileList);
    form.setFieldsValue({ gallery: updatedFileList });
    return false; // Prevent automatic upload
  };

  // Handle media deletion
  // const handleDeleteMedia = async (file: any) => {
  //   if (file.url && !file.originFileObj) {
  //     // Existing media (from server)
  //     const mediaId = file.uid;
  //     try {
  //       await axios.delete(`${apiUrl}/architecture-web-app/projects/media/${mediaId}`, {
  //         withCredentials: true,
  //       });
  //       message.success("Media deleted successfully");
  //       setDeletedMediaIds((prev) => [...prev, parseInt(mediaId)]);
  //       // Remove from gallery file list
  //       setGalleryFileList((prev) => prev.filter((item) => item.uid !== mediaId));
  //       form.setFieldsValue({
  //         gallery: form.getFieldValue("gallery").filter((item: any) => item.uid !== mediaId),
  //       });
  //     } catch (error) {
  //       message.error("Failed to delete media");
  //     }
  //   } else {
  //     // New file (not yet uploaded)
  //     setGalleryFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  //     form.setFieldsValue({
  //       gallery: form.getFieldValue("gallery").filter((item: any) => item.uid !== file.uid),
  //     });
  //   }
  // };

  const onFinish = async (values: any) => {
    const updatedValues = { ...values, deletedMediaIds };
    onUpdate(updatedValues);
  };

  return (
    <Modal
      title="Update Project"
      open={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
            form.resetFields();
            setImageFileList([]);
            setGalleryFileList([]);
            setDeletedMediaIds([]);
          })
          .catch(() => {
            message.error("Please fill all required fields correctly");
          });
      }}
      onCancel={() => {
        onCancel();
        form.resetFields();
        setImageFileList([]);
        setGalleryFileList([]);
        setDeletedMediaIds([]);
      }}
      okText="Update"
      cancelText="Cancel"
      className="testimonial-modal"
      width={850}
    >
      <Form
        form={form}
        layout="vertical"
        className="compact-form"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Project Name"
              rules={[{ required: true, message: "Please enter the project name" }]}
            >
              <Input placeholder="Enter project name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="project_type_id"
              label="Project Type"
              rules={[{ required: true, message: "Please select a project type" }]}
            >
              <Select
                placeholder="Select project type"
                loading={loading}
                options={projectTypes.map((type) => ({
                  value: type.id,
                  label: type.title,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter the location" }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="site_area"
              label="Site Area"
              rules={[{ required: true, message: "Please enter the site area" }]}
            >
              <Input placeholder="Enter site area" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="client_name"
              label="Client Name"
              rules={[{ required: true, message: "Please enter the client name" }]}
            >
              <Input placeholder="Enter client name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="client_email"
              label="Client Email"
              rules={[
                { required: true, message: "Please enter the client email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter client email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="client_mobile"
              label="Client Mobile"
              rules={[{ required: true, message: "Please enter the client mobile" }]}
            >
              <Input placeholder="Enter client mobile" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="client_address"
              label="Client Address"
              rules={[{ required: true, message: "Please enter the client address" }]}
            >
              <Input placeholder="Enter client address" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter the description" }]}
            >
              <Input.TextArea placeholder="Enter description" rows={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="image"
              label="Image (Single)"
              valuePropName="fileList"
              getValueFromEvent={(e) => (e.fileList.length > 0 ? e.fileList[0] : null)}
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleImageUpload}
                fileList={imageFileList}
                maxCount={1}
                accept="image/*"
                listType="picture"
                className="testimonial-upload"
              >
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gallery"
              label="Gallery (Multiple Images)"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleGalleryUpload}
                fileList={galleryFileList}
                // onRemove={handleDeleteMedia}
                multiple
                accept="image/*"
                listType="picture"
                className="testimonial-upload"
              >
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateProjectModal;
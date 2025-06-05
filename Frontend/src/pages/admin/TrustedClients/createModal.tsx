import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, Row, Col, Select } from "antd";
import { UploadOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import LoadingSpinner from "../../../components/client/LoadingSpinner";

interface CreateClientModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: FormData) => Promise<void>;
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({
  visible,
  onCancel,
  onCreate,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        status: "1" // Set default value when modal opens
      });
    }
  }, [visible, form]);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(-1));
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("link", values.link);
      formData.append("feature", values.status === "1" ? "true" : "false");

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj as Blob);
      }

      await onCreate(formData);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Validation Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Modal
      title="Create New Client"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleCreate}
          disabled={loading}
        >
          Submit
        </Button>,
      ]}
      width={850}
      className="testimonial-modal"
      destroyOnClose
    >
      <Form form={form} layout="vertical" className="compact-form" initialValues={{ status: "1" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Client Name"
              name="name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter client name"
                disabled={loading}
                className="clientName"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select disabled={loading} defaultValue="1">
                <Select.Option value="1">True</Select.Option>
                <Select.Option value="0">False</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Link"
              name="link"
              rules={[
                { required: true, message: "Required" },
                { type: "url", message: "Please enter a valid URL" },
              ]}
              normalize={(value) => {
                if (
                  value &&
                  !value.startsWith("http://") &&
                  !value.startsWith("https://")
                ) {
                  return `https://${value}`;
                }
                return value;
              }}
            >
              <Input
                prefix={<LinkOutlined />}
                placeholder="Enter client website URL (e.g., example.com)"
                disabled={loading}
                className="clientLink"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Logo Image"
              name="fileurl"
              className="upload-wrapper"
              rules={[
                { required: true, message: "Please upload a logo image" },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                onChange={handleFileChange}
                multiple={false}
                listType="picture-card"
                disabled={loading}
                accept="image/jpeg,image/png"
                maxCount={1}
                className="testimonial-upload"
              >
                {fileList.length === 0 && (
                  <div>
                    <UploadOutlined className="upload-icon" />
                    <div className="upload-text">Upload Logo</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateClientModal;

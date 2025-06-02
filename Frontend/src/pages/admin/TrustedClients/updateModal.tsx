import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, Row, Col } from "antd";
import { UploadOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import LoadingSpinner from "../../../components/client/LoadingSpinner";

interface UpdateClientModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: FormData) => Promise<void>;
  initialValues: {
    name: string;
    link: string;
    fileurl: string | null;
    filename: string | null;
  };
}

const UpdateClientModal: React.FC<UpdateClientModalProps> = ({
  visible,
  onCancel,
  onUpdate,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: initialValues.name,
        link: initialValues.link,
      });

      if (initialValues.fileurl) {
        setFileList([
          {
            uid: "-1",
            name: initialValues.filename || "current-logo",
            status: "done",
            url: initialValues.fileurl,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [visible, initialValues, form]);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(-1));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("link", values.link);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj as Blob);
      } else if (initialValues.fileurl) {
        formData.append("image", initialValues.fileurl);
      }

      await onUpdate(formData);
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
      title="Update Client"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleUpdate}
          disabled={loading}
        >
          Submit
        </Button>,
      ]}
      width={850}
      className="testimonial-modal"
      destroyOnClose
    >
      <Form form={form} layout="vertical" className="compact-form">
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
              label="Link"
              name="link"
              rules={[
                { required: true, message: "Required" },
                { type: "url", message: "Please enter a valid URL" },
              ]}
            >
              <Input
                prefix={<LinkOutlined />}
                placeholder="Enter client website URL"
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

export default UpdateClientModal;
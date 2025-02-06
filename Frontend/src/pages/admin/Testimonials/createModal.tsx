import React, { useState } from "react";
import { Modal, Form, Input, Upload, Rate, Button, Row, Col, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";

interface CreateModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: FormData) => Promise<void>;
}

const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  onCancel,
  onCreate,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(-1));
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("designation", values.designation);
      formData.append("rating", values.rating?.toString() || "0");
      formData.append("message", values.message);

      if (fileList.length > 0) {
        formData.append("imageUrl", fileList[0].originFileObj as Blob);
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

  return (
    <Modal
      title="Create New Entry"
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
          Create
        </Button>,
      ]}
      width={800}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="fullname"
                rules={[{ required: true, message: "Full Name is required" }]}
              >
                <Input placeholder="Enter full name" disabled={loading} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Designation"
                name="designation"
                rules={[{ required: true, message: "Designation is required" }]}
              >
                <Input placeholder="Enter designation" disabled={loading} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ratings"
                name="rating"
                rules={[{ required: true, message: "Ratings are required" }]}
              >
                <Rate allowHalf disabled={loading} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Message is required" }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter message"
                  disabled={loading}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Image" name="imageUrl">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
              multiple={false}
              listType="picture"
              disabled={loading}
            >
              <Button icon={<UploadOutlined />} disabled={loading}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateModal;

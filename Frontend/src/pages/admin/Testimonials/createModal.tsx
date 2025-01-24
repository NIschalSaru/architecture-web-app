import React from "react";
import { Modal, Form, Input, Upload, Rate, Button, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

interface CreateModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: CreateFormValues) => void;
}

interface CreateFormValues {
  fullname: string;
  message: string;
  ratings: number;
  designation: string;
  imagefile: RcFile;
}

const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  onCancel,
  onCreate,
}) => {
  const [form] = Form.useForm<CreateFormValues>();

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        // Extract the file from the Upload field
        const file = values.imagefile?.fileList?.[0]?.originFileObj;
        const formData = {
          ...values,
          imagefile: file, // Replace fileList with the actual file
        };
        onCreate(formData);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Create New Entry"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreate}>
          Create
        </Button>,
      ]}
      width={800}
    >
      <Form form={form} layout="vertical" name="create_form">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: "Full Name is required" }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Designation"
              name="designation"
              rules={[{ required: true, message: "Designation is required" }]}
            >
              <Input placeholder="Enter designation" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ratings"
              name="ratings"
              rules={[{ required: true, message: "Ratings are required" }]}
            >
              <Rate allowHalf />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Message is required" }]}
            >
              <Input.TextArea rows={3} placeholder="Enter message" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Image File"
          name="imagefile"
          valuePropName="file"
          rules={[{ required: false, message: "Image file is required" }]}
        >
          <Upload beforeUpload={() => false} accept="image/*">
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;

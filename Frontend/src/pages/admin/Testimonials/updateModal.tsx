import React from "react";
import { Modal, Form, Input, Upload, Rate, Button, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

interface UpdateModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: CreateFormValues) => void;
  initialValues: CreateFormValues;
}

interface CreateFormValues {
  fullname: string;
  message: string;
  ratings: number;
  designation: string;
  imagefile: RcFile;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  visible,
  onCancel,
  onUpdate,
  initialValues,
}) => {
  const [form] = Form.useForm<CreateFormValues>();

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        onUpdate(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Update Entry"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        name="update_form"
        initialValues={initialValues}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="name"
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
              name="rating"
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

export default UpdateModal;

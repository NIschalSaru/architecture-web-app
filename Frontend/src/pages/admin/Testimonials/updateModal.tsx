import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Rate, Button, Row, Col, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";

interface UpdateModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: FormData) => Promise<void>;
  initialValues: {
    fullname: string;
    designation: string;
    rating: number;
    message: string;
    imageUrl?: string;
  };
}

const UpdateModal: React.FC<UpdateModalProps> = ({
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
        fullname: initialValues.fullname,
        designation: initialValues.designation,
        rating: initialValues.rating,
        message: initialValues.message,
      });

      // // Set the initial image if available
      // if (initialValues.imageUrl) {
      //   setFileList([
      //     {
      //       uid: "-1",
      //       name: "image.png", // You can change the file name dynamically if needed
      //       status: "done",
      //       url: initialValues.imageUrl,
      //     },
      //   ]);
      // }
    }
  }, [visible, initialValues]);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    // setFileList(fileList);
    setFileList(fileList.slice(-1));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("designation", values.designation);
      formData.append("rating", values.rating?.toString() || "0");
      formData.append("message", values.message);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("imageUrl", fileList[0].originFileObj as Blob);
      } else if (initialValues.imageUrl) {
        formData.append("imageUrl", initialValues.imageUrl);
      }

      console.log(formData);
      await onUpdate(formData);
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
      title="Update Entry"
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
          Update
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

          <Form.Item label="Image" name="imageUrl">
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default UpdateModal;

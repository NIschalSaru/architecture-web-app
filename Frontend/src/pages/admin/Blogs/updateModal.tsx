import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, Row, Col, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import LoadingSpinner from "../../../components/client/LoadingSpinner";
import { apiUrl } from "../../../utils";

interface UpdateModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: FormData) => Promise<void>;
  initialValues: {
    title: string;
    description: string;
    imagepath?: string;
    filepath?: string;
    feature: boolean;
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
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        title: initialValues.title,
        description: initialValues.description,
        feature: initialValues.feature ? "1" : "0",
      });

      if (initialValues.filepath) {
        setFileList([
          {
            uid: "-1",
            name: initialValues.filepath.split("/").pop() || "PDF",
            status: "done",
            url: `${apiUrl}/architecture-web-app${initialValues.filepath}`,
          },
        ]);
      } else {
        setFileList([]);
      }

      if (initialValues.imagepath) {
        setImageList([
          {
            uid: "-1",
            name: initialValues.imagepath.split("/").pop() || "Image",
            status: "done",
            url: `${apiUrl}/storage${initialValues.imagepath}`,
          },
        ]);
      } else {
        setImageList([]);
      }
    }
  }, [visible, initialValues, form]);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(-1));
  };

  const handleImageChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setImageList(fileList.slice(-1));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("feature", values.feature === "1" ? "true" : "false");

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("file", fileList[0].originFileObj as Blob);
      } else if (initialValues.filepath) {
        formData.append("file", initialValues.filepath);
      }

      if (imageList.length > 0 && imageList[0].originFileObj) {
        formData.append("image", imageList[0].originFileObj as Blob);
      } else if (initialValues.imagepath) {
        formData.append("image", initialValues.imagepath);
      }

      await onUpdate(formData);
      form.resetFields();
      setFileList([]);
      setImageList([]);
    } catch (error) {
      console.error("Validation Failed:", error);
      // message.error("Failed to update blog. Please check the form.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Modal
      title="Update Blog"
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
      width={600}
      className="testimonial-modal"
      destroyOnClose
    >
      <Form form={form} layout="vertical" className="compact-form">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the blog title" }]}
            >
              <Input placeholder="Enter blog title" disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter a description" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter blog description"
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="PDF File"
              name="file"
              className="upload-wrapper"
            >
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                onChange={handleFileChange}
                multiple={false}
                listType="text"
                disabled={loading}
                accept="application/pdf"
                maxCount={1}
                className="testimonial-upload"
              >
                {fileList.length === 0 && (
                  <div>
                    <UploadOutlined className="upload-icon" />
                    <div className="upload-text">Upload PDF</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
              className="upload-wrapper"
            >
              <Upload
                beforeUpload={() => false}
                fileList={imageList}
                onChange={handleImageChange}
                multiple={false}
                listType="picture"
                disabled={loading}
                accept="image/jpeg,image/png"
                maxCount={1}
                className="testimonial-upload"
              >
                {imageList.length === 0 && (
                  <div>
                    <UploadOutlined className="upload-icon" />
                    <div className="upload-text">Upload Image</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Featured"
              name="feature"
              rules={[{ required: true, message: "Please select featured status" }]}
            >
              <Select disabled={loading}>
                <Select.Option value="1">True</Select.Option>
                <Select.Option value="0">False</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateModal;









// import React, { useState, useEffect } from "react";
// import { Modal, Form, Input, Upload, Button, Row, Col } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { UploadFile } from "antd/es/upload/interface";
// import LoadingSpinner from "../../../components/client/LoadingSpinner";

// interface UpdateModalProps {
//   visible: boolean;
//   onCancel: () => void;
//   onUpdate: (values: FormData) => Promise<void>;
//   initialValues: {
//     title: string;
//     filename?: string;
//     filepath?: string;
//   };
// }

// const UpdateModal: React.FC<UpdateModalProps> = ({
//   visible,
//   onCancel,
//   onUpdate,
//   initialValues,
// }) => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (visible) {
//       form.setFieldsValue({
//         title: initialValues.title,
//       });

//       if (initialValues.filename && initialValues.filepath) {
//         setFileList([
//           {
//             uid: "-1",
//             name: initialValues.filename,
//             status: "done",
//             url: initialValues.filepath,
//           },
//         ]);
//       } else {
//         setFileList([]);
//       }
//     }
//   }, [visible, initialValues, form]);

//   const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
//     setFileList(fileList.slice(-1));
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const values = await form.validateFields();
//       const formData = new FormData();
//       formData.append("title", values.title);

//       if (fileList.length > 0 && fileList[0].originFileObj) {
//         formData.append("file", fileList[0].originFileObj as Blob);
//       } else if (initialValues.filepath) {
//         formData.append("file", initialValues.filepath);
//       }

//       await onUpdate(formData);
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       console.error("Validation Failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <Modal
//       title="Update Blog"
//       open={visible}
//       onCancel={onCancel}
//       footer={[
//         <Button key="back" onClick={onCancel} disabled={loading}>
//           Cancel
//         </Button>,
//         <Button
//           key="submit"
//           type="primary"
//           onClick={handleUpdate}
//           disabled={loading}
//         >
//           Submit
//         </Button>,
//       ]}
//       width={600}
//       className="testimonial-modal"
//       destroyOnClose
//     >
//       <Form form={form} layout="vertical" className="compact-form">
//         <Row gutter={16}>
//           <Col span={24}>
//             <Form.Item
//               label="Title"
//               name="title"
//               rules={[{ required: true, message: "Required" }]}
//             >
//               <Input
//                 placeholder="Enter blog title"
//                 disabled={loading}
//                 className="fullname"
//               />
//             </Form.Item>
//           </Col>
//           <Col span={24}>
//             <Form.Item
//               label="PDF File"
//               name="file"
//               className="upload-wrapper"
//             >
//               <Upload
//                 beforeUpload={() => false}
//                 fileList={fileList}
//                 onChange={handleFileChange}
//                 multiple={false}
//                 listType="text"
//                 disabled={loading}
//                 accept="application/pdf"
//                 maxCount={1}
//                 className="testimonial-upload"
//               >
//                 {fileList.length === 0 && (
//                   <div>
//                     <UploadOutlined className="upload-icon" />
//                     <div className="upload-text">Upload PDF</div>
//                   </div>
//                 )}
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>
//       </Form>
//     </Modal>
//   );
// };

// export default UpdateModal;
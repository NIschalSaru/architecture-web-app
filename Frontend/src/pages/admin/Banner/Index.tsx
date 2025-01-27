import { Button, Col, Form, Input, Row, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import usePostAPI from '../../../hooks/usePostAPI';
import useGetAPI from '../../../hooks/useGetAPI';
import LoadingSpinner from "../../../components/client/LoadingSpinner";

const { Title } = Typography;

interface BannerData {
  heading: string;
  subHeading: string;
  imageUrl: string;
}

interface FormBannerData {
  heading: string;
  subHeading: string;
  imageUrl: UploadFile[];
}

const initialValues: FormBannerData = {
  heading: "",
  subHeading: "",
  imageUrl: [],
};

type FieldType = typeof initialValues;

const BannerSettings = () => {
  const [form] = Form.useForm();
  
  const { loading: isSubmitting, postData } = usePostAPI<any>('architecture-web-app/banner');
  const { loading: isLoading, data: bannerData } = useGetAPI<BannerData>('architecture-web-app/banner', true, true);

  // Update form when data is fetched
  useEffect(() => {
    if (bannerData) {
      const formData: FormBannerData = {
        heading: bannerData.heading || "",
        subHeading: bannerData.subHeading || "",
        imageUrl: bannerData.imageUrl ? [
          {
            uid: '-1',
            url: bannerData.imageUrl,
            name: 'banner-image',
            status: 'done',
          } as UploadFile
        ] : [],
      };
      form.setFieldsValue(formData);
    }
  }, [bannerData, form]);

  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append('heading', values.heading);
      formData.append('subHeading', values.subHeading);

      const fileList = form.getFieldValue('imageUrl');
      if (fileList?.[0]?.originFileObj) {
        formData.append('imageUrl', fileList[0].originFileObj);
      }

      const response = await postData(formData);
      
      if (response) {
        // The page will automatically refresh due to useGetAPI's effect
        // No need to manually fetch data again
      }
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (isLoading || isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-card">
      <Title level={3}>Banner Information</Title>
      <Form
        form={form}
        layout="vertical"
        name="banner_settings"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row gutter={[50, 10]}>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Heading"
              name="heading"
              rules={[{ required: true, message: "Heading is required!" }]}
            >
              <Input placeholder="Enter heading..." />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Sub Heading"
              name="subHeading"
              rules={[{ required: true, message: "Sub Heading is required!" }]}
            >
              <Input placeholder="Enter sub heading..." />
            </Form.Item>
          </Col>

          <Col sm={24} lg={12}>
            <Form.Item
              name="imageUrl"
              label="Banner Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Banner Image is required!" }]}
            >
              <Upload
                name="imageUrl"
                listType="picture"
                maxCount={1}
                accept=".jpg,.jpeg,.png"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} block>
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col sm={24}>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BannerSettings;





























// import { Button, Col, Form, Input, Row, Spin, Typography, Upload } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import type { UploadFile } from "antd/es/upload/interface";
// import usePostAPI from '../../../hooks/usePostAPI'; // Update with correct path
// import axios from 'axios';
// import { apiUrl } from '../../../utils/index'; // Update with correct path
// import LoadingSpinner from "../../../components/client/LoadingSpinner";

// const { Title } = Typography;

// interface BannerData {
//   heading: string;
//   subHeading: string;
//   imageUrl: UploadFile[];
// }

// const initialValues: BannerData = {
//   heading: "",
//   subHeading: "",
//   imageUrl: [],
// };

// type FieldType = typeof initialValues;

// const BannerSettings = () => {
//   const [form] = Form.useForm();
//   const [formData, setFormData] = useState<BannerData>(initialValues);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { loading: isSubmitting, postData } = usePostAPI<any>('architecture-web-app/banner');

//   const fetchBannerData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${apiUrl}/architecture-web-app/banner`);
//       const data = response.data;
      
//       const initialValue: BannerData = {
//         heading: data.heading || "",
//         subHeading: data.subHeading || "",
//         imageUrl: data.imageUrl ? [
//           {
//             uid: '-1',
//             url: data.imageUrl,
//             name: 'banner-image',
//             status: 'done',
//           } as UploadFile
//         ] : [],
//       };

//       setFormData(initialValue);
//       form.setFieldsValue(initialValue);
//     } catch (error) {
//       console.error('Error fetching banner data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onFinish = async (values: FieldType) => {
//     try {
//       const formData = new FormData();
//       formData.append('heading', values.heading);
//       formData.append('subHeading', values.subHeading);

//       const fileList = form.getFieldValue('imageUrl');
//       if (fileList?.[0]?.originFileObj) {
//         formData.append('imageUrl', fileList[0].originFileObj);
//       }

//       const response = await postData(formData);
      
//       if (response) {
//         await fetchBannerData();
//       }
//     } catch (error) {
//       console.error('Error updating banner:', error);
//     }
//   };

//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   useEffect(() => {
//     fetchBannerData();
//   }, []);

//   return (
//     <Spin spinning={isLoading || isSubmitting}>
//       <LoadingSpinner/>
//       <div className="dashboard-card">
//         <Title level={3}>Banner Information</Title>
//         <Form
//           form={form}
//           layout="vertical"
//           name="banner_settings"
//           onFinish={onFinish}
//           initialValues={formData}
//         >
//           <Row gutter={[50, 10]}>
//             <Col sm={24} lg={12}>
//               <Form.Item<FieldType>
//                 label="Heading"
//                 name="heading"
//                 rules={[{ required: true, message: "Heading is required!" }]}
//               >
//                 <Input placeholder="Enter heading..." />
//               </Form.Item>
//             </Col>

//             <Col sm={24} lg={12}>
//               <Form.Item<FieldType>
//                 label="Sub Heading"
//                 name="subHeading"
//                 rules={[{ required: true, message: "Sub Heading is required!" }]}
//               >
//                 <Input placeholder="Enter sub heading..." />
//               </Form.Item>
//             </Col>

//             <Col sm={24} lg={12}>
//               <Form.Item
//                 name="imageUrl"
//                 label="Banner Image"
//                 valuePropName="fileList"
//                 getValueFromEvent={normFile}
//                 rules={[{ required: true, message: "Banner Image is required!" }]}
//               >
//                 <Upload
//                   name="imageUrl"
//                   listType="picture"
//                   maxCount={1}
//                   accept=".jpg,.jpeg,.png"
//                   beforeUpload={() => false}
//                 >
//                   <Button icon={<UploadOutlined />} block>
//                     Click to upload
//                   </Button>
//                 </Upload>
//               </Form.Item>
//             </Col>

//             <Col sm={24}>
//               <Button 
//                 type="primary" 
//                 htmlType="submit" 
//                 size="large"
//                 loading={isSubmitting}
//               >
//                 Submit
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </Spin>
//   );
// };

// export default BannerSettings;
import { Button, Col, Form, Input, Row, Spin, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

const { Title } = Typography;

interface BannerData {
  heading: string;
  subHeading: string;
  imageUrl: UploadFile[];
}

const initialValues: BannerData = {
  heading: "",
  subHeading: "",
  imageUrl: [],
};

type FieldType = typeof initialValues;

const BannerSettings = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<BannerData>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBannerData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/architecture-web-app/banner');
      const data = await response.json();
      
      const initialValue: BannerData = {
        heading: data.heading || "",
        subHeading: data.subHeading || "",
        imageUrl: data.imageUrl ? [
          {
            uid: '-1',
            url: data.imageUrl,
            name: 'banner-image',
            status: 'done',
          } as UploadFile
        ] : [],
      };

      setFormData(initialValue);
      form.setFieldsValue(initialValue);
    } catch (error) {
      console.error('Error fetching banner data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = async (values: FieldType) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('heading', values.heading);
      formData.append('subHeading', values.subHeading);

      const fileList = form.getFieldValue('imageUrl');
      if (fileList?.[0]?.originFileObj) {
        formData.append('imageUrl', fileList[0].originFileObj);
      }

      const response = await fetch('/api/architecture-web-app/banner', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update banner');
      }

      await fetchBannerData();
    } catch (error) {
      console.error('Error updating banner:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  return (
    <Spin spinning={isLoading || isSubmitting}>
      <div className="dashboard-card">
        <Title level={3}>Banner Information</Title>
        <Form
          form={form}
          layout="vertical"
          name="banner_settings"
          onFinish={onFinish}
          initialValues={formData}
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
    </Spin>
  );
};

export default BannerSettings;
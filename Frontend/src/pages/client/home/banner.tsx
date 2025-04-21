import { Button, Typography, Form, Input, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Phone, Mail, User } from "lucide-react";
import useGetAPI from "../../../hooks/useGetAPI";
import LoadingSpinner from "../../../components/client/LoadingSpinner";

interface BannerData {
  id: number;
  imageUrl: string;
  heading: string;
  subHeading: string;
}

const BannerComponent = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    data: bannerData,
    loading,
    error,
  } = useGetAPI<BannerData>(`architecture-web-app/banner`);

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    setIsDrawerOpen(false);
    form.resetFields();
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="banner-error">Error loading banner: {error}</div>;
  if (!bannerData) return null;

  return (
    <section className="banner-section">
      <div className="banner-image">
        <img src={bannerData.imageUrl} alt="Banner" />
      </div>
      <div className="banner-content">
        <div className="banner-text">
          <Title level={3} className="banner-heading fade-in">
            {bannerData.heading}
          </Title>
          <Text className="banner-subheading fade-in">
            {bannerData.subHeading}
          </Text>
          <Button
            type="primary"
            size="large"
            className="banner-cta fade-in"
            onClick={() => navigate("/about")}
          >
            Discover More
          </Button>
        </div>
      </div>
      <Button
        className="banner-side-btn fade-in"
        onClick={() => setIsDrawerOpen(true)}
      >
        Book Now
      </Button>
      <Drawer
        title={<div className="banner-drawer-title">Book a Consultation</div>}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={450}
        className="banner-drawer"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="banner-form"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              prefix={<User className="banner-form-icon" />}
              placeholder="Enter your full name"
              className="banner-form-input"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<Mail className="banner-form-icon" />}
              placeholder="Enter your email address"
              className="banner-form-input"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input
              prefix={<Phone className="banner-form-icon" />}
              placeholder="Enter your phone number"
              className="banner-form-input"
            />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea
              placeholder="Tell us about your project requirements"
              rows={5}
              className="banner-form-textarea"
            />
          </Form.Item>
          <Form.Item className="banner-form-submit">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="banner-form-submit-btn"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </section>
  );
};

export default BannerComponent;
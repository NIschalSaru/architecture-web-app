import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import usePostAPI from "../../hooks/usePostAPI";
import ContactUs from "../../assets/svg/undraw_team_chat_re_vbq1.svg";
import ScrollToTop from "../../components/ScrollToTop";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const AboutUsPage = () => {
  const { TextArea } = Input;
  const { Title, Paragraph } = Typography;
  const { loading, postData } = usePostAPI("consultancy/email/send-email");
  const [form] = Form.useForm();
  const contactRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact-us" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      await postData(values);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting Contact Us:", error);
    }
  };

  return (
    <>
      <Layout className="inner-page">
        <div className="container">
          <Title>Hello</Title>
        </div>
      </Layout>
      <Layout className="about">
        <div className="container">
          <Title level={3}>
            aboutUs.title
            <span>aboutUs.subtitle</span>
          </Title>
          <p>"aboutUs.about-1"</p>
          <p>aboutUs.about-2</p>
          <p>aboutUs.about-2</p>
          <p>aboutUs.about-3</p>
          <p>aboutUs.about-4</p>
          <p>aboutUs.about-5</p>
          <p>aboutUs.about-6</p>
        </div>
      </Layout>
      <Layout className="contact" ref={contactRef} id="contact-us">
        <div className="container">
          <Row gutter={20} className="contact-row">
            <Col xs={24} md={12}>
              <Title level={3}>
                <span>contact.title-1</span>
                contact.title-2
              </Title>
              <Paragraph>contact.subtitle</Paragraph>

              <Form
                form={form}
                name="basic"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="contact.name"
                  name="username"
                  rules={[
                    { required: true, message: "contact.nameRequired" },
                  ]}
                >
                  <Input placeholder="contact.name" />
                </Form.Item>
                <Form.Item
                  label="contact.email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "contact.emailRequired",
                    },
                    {
                      type: "email",
                      message: "contact.emailInvalid",
                    },
                  ]}
                >
                  <Input type="email" placeholder="contact.email" />
                </Form.Item>
                <Form.Item
                  label="contact.msg"
                  name="description"
                  rules={[
                    {
                        required: true,
                        message: "contact.msgRequired",
                      },
                      {
                        type: "email",
                        message: "contact.msgInvalid",
                      },
                  ]}
                >
                  <TextArea rows={5} placeholder="contact.msg" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                  >
                    contact.submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xs={24} md={12}>
              <img src={ContactUs} alt="Contact Us" />
            </Col>
          </Row>
        </div>
      </Layout>
      <ScrollToTop />
    </>
  );
};

export default AboutUsPage;

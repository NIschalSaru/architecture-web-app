import { useEffect, useRef } from "react";
import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import { useLocation } from "react-router-dom";
import usePostAPI from "../../hooks/usePostAPI";
// import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import ScrollToTop from "../../components/ScrollToTop";
import CeoImage from "../../assets/images/CEO.jpeg";

const AboutUsPage = () => {
  const { TextArea } = Input;
  const { Title, Paragraph, Text } = Typography;
  const { loading, postData } = usePostAPI("consultancy/email/send-email");
  const [form] = Form.useForm();
  const contactRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    // if (location.hash === '#contact-us' && contactRef.current) {
    //   contactRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
  }, [location]);

  const onFinish = async (values: any) => {
    try {
      await postData(values);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting Contact Us:", error);
    }
  };

  return (
    // <Layout>
    <>
      <div className="inner-header">
        <div className="header-content">
          <h1 className="page-title">ABOUT US</h1>
          <div className="breadcrumb">
            <a href="/">HOME</a>
            <span className="separator">/</span>
            <span className="current">ABOUT US</span>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <Row>
            <div className="mission-content">
              <Title level={2}>Our Story</Title>
              <Paragraph className="mission-text">
                At Nepal Designers and Builders Pvt Ltd, we are more than just a
                construction and design firm; we are architects of dreams.
                Founded in [Year of Establishment], our journey began with a
                simple yet profound vision: to blend innovative design with
                exceptional construction quality. Based in the heart of Nepal,
                our company has grown to become a leading name in the
                architectural landscape of the region.
              </Paragraph>
              <Title level={2}>Our Mission</Title>
              <Paragraph className="mission-text">
                Our mission is to create spaces that not only meet the aesthetic
                and functional needs of our clients but also stand the test of
                time. We are driven by a commitment to excellence,
                sustainability, and client satisfaction. Every project,
                regardless of its size, receives the same level of meticulous
                attention and dedication.
              </Paragraph>
              <Title level={2}>Our Services</Title>
              <Paragraph className="mission-text">
                We specialize in a broad spectrum of services, including:
                Residential and Commercial Architecture Interior Design
                Sustainable Building Practices Custom Construction Solutions
                Project Management
              </Paragraph>
              <Title level={2}>Our Approach</Title>
              <Paragraph className="mission-text">
                At the core of our approach is a collaborative spirit. We work
                closely with our clients, understanding their vision and
                translating it into reality. Our team of experienced architects,
                designers, and builders uses the latest technology and materials
                to ensure that each project is not only aesthetically pleasing
                but also environmentally responsible and structurally sound.
              </Paragraph>
              <Title level={2}>Our Promise</Title>
              <Paragraph className="mission-text">
                To our clients, we promise a partnership that goes beyond mere
                construction. We are dedicated to providing a seamless
                experience from the initial concept to the final brick. Our goal
                is to create spaces that reflect your aspirations and enhance
                your quality of life.
              </Paragraph>
              <Title level={2}>Our Future</Title>
              <Paragraph className="mission-text">
                As we look to the future, Nepal Designers and Builders Pvt Ltd
                is excited to continue pushing the boundaries of design and
                construction. We are committed to innovation and excellence,
                ensuring that we remain at the forefront of the industry,
                setting new standards in the architecture and construction
                realm.
              </Paragraph>
              <div className="stats-container">
                <div className="stat-item">
                  <Text className="stat-number">15+</Text>
                  <Text className="stat-label">Years Experience</Text>
                </div>
                <div className="stat-item">
                  <Text className="stat-number">500+</Text>
                  <Text className="stat-label">Projects Delivered</Text>
                </div>
                <div className="stat-item">
                  <Text className="stat-number">98%</Text>
                  <Text className="stat-label">Client Satisfaction</Text>
                </div>
              </div>
            </div>
            {/* </Col> */}
            {/* <Col xs={24} lg={12}>
              <div className="mission-image">
                <img src="" alt="Our Mission" />
              </div>*/}
          </Row>
        </div>
      </section>

      {/* CEO Section */}
      <section className="ceo-section">
        <div className="container">
          {/* <Row gutter={[48, 48]} align="middle"> */}
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className="ceo-image-container">
                <img src={CeoImage} alt="CEO" className="ceo-image" />
                <div className="ceo-background-shape"></div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="ceo-content">
                <Title level={2}>Chief Executive Officer</Title>
                <Title level={3} className="ceo-name">
                  Amar Chor
                </Title>
                <Text className="ceo-title">
                  Founder & Chief Executive Officer
                </Text>
                <Paragraph className="ceo-bio">
                  With over two decades of experience in technology and
                  innovation, John has been at the forefront of digital
                  transformation. His vision has guided our company to become a
                  leading force in technology consulting, helping businesses
                  across the globe achieve their digital ambitions.
                </Paragraph>
                <div className="ceo-achievements">
                  <div className="achievement-item">
                    <div className="achievement-icon">20+</div>
                    <Text>Years Industry Experience</Text>
                  </div>
                  <div className="achievement-item">
                    <div className="achievement-icon">100+</div>
                    <Text>Speaking Engagements</Text>
                  </div>
                  <div className="achievement-item">
                    <div className="achievement-icon">30+</div>
                    <Text>Industry Awards</Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" ref={contactRef} id="contact-us">
        <div className="container">
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <div className="contact-content" id="contact-section">
                <Title level={2}>
                  <span className="contact-content-1">Contact Us</span> & We Can
                  Work Together
                </Title>
                <Paragraph className="contact-intro">
                  Have questions or need assistance? Reach out to us, and let's
                  collaborate to achieve your goals. We're here to help you
                  every step of the way.
                </Paragraph>

                {/* <div className="contact-info">
                  <div className="info-item">
                    <PhoneOutlined />
                    <Text>+1 (555) 123-4567</Text>
                  </div>
                  <div className="info-item">
                    <MailOutlined />
                    <Text>contact@company.com</Text>
                  </div>
                  <div className="info-item">
                    <EnvironmentOutlined />
                    <Text>123 Business Avenue, Tech City, TC 12345</Text>
                  </div>
                </div> */}

                <Form
                  form={form}
                  name="contact"
                  layout="vertical"
                  onFinish={onFinish}
                  className="contact-form"
                >
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Your Name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input size="large" placeholder="Your Email" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                      { required: true, message: "Please enter your message" },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Your Message"
                      className="message-input"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      size="small"
                      htmlType="submit"
                      loading={loading}
                      className="submit-button"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8407931243287!2d85.27923357547357!3d27.691315126198393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19eda9890b29%3A0x414c20f681475f25!2sNepal%20Designers%20and%20Builders!5e0!3m2!1sne!2snp!4v1733824629346!5m2!1sne!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  // allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <ScrollToTop />
    </>
    // </Layout>
  );
};

export default AboutUsPage;

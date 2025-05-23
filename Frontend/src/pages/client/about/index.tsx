import { useEffect, useRef } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useLocation } from "react-router-dom";
import usePostAPI from "../../../hooks/usePostAPI";
import ScrollToTop from "../../../components/client/ScrollToTop";
import CeoImage from "../../../assets/images/Founder.jpg";

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
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className="mission-card">
                <div className="section-title-wrapper">
                  <Title level={2} className="section-title">Our Story</Title>
                  <div className="title-decorator"></div>
                </div>
                <Paragraph className="mission-text">
                  At Nepal Designers and Builders Pvt Ltd, we are more than just a
                  construction and design firm; we are architects of dreams.
                  Founded in [Year of Establishment], our journey began with a
                  simple yet profound vision: to blend innovative design with
                  exceptional construction quality. Based in the heart of Nepal,
                  our company has grown to become a leading name in the
                  architectural landscape of the region.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="mission-card">
                <div className="section-title-wrapper">
                  <Title level={2} className="section-title">Our Mission</Title>
                  <div className="title-decorator"></div>
                </div>
                <Paragraph className="mission-text">
                  Our mission is to create spaces that not only meet the aesthetic
                  and functional needs of our clients but also stand the test of
                  time. We are driven by a commitment to excellence,
                  sustainability, and client satisfaction. Every project,
                  regardless of its size, receives the same level of meticulous
                  attention and dedication.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="mission-card">
                <div className="section-title-wrapper">
                  <Title level={2} className="section-title">Our Services</Title>
                  <div className="title-decorator"></div>
                </div>
                <Paragraph className="mission-text">
                  We specialize in a broad spectrum of services, including:
                  Residential and Commercial Architecture, Interior Design,
                  Sustainable Building Practices, Custom Construction Solutions,
                  and Project Management.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="mission-card">
                <div className="section-title-wrapper">
                  <Title level={2} className="section-title">Our Approach</Title>
                  <div className="title-decorator"></div>
                </div>
                <Paragraph className="mission-text">
                  At the core of our approach is a collaborative spirit. We work
                  closely with our clients, understanding their vision and
                  translating it into reality. Our team of experienced architects,
                  designers, and builders uses the latest technology and materials
                  to ensure that each project is aesthetically pleasing,
                  environmentally responsible, and structurally sound.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="mission-card">
                <div className="section-title-wrapper">
                  <Title level={2} className="section-title">Our Promise</Title>
                  <div className="title-decorator"></div>
                </div>
                <Paragraph className="mission-text">
                  To our clients, we promise a partnership that goes beyond mere
                  construction. We are dedicated to providing a seamless
                  experience from the initial concept to the final brick. Our goal
                  is to create spaces that reflect your aspirations and enhance
                  your quality of life.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="mission-card">
                <div className="section-title-wrapper">
                  <Title level={2} className="section-title">Our Future</Title>
                  <div className="title-decorator"></div>
                </div>
                <Paragraph className="mission-text">
                  As we look to the future, Nepal Designers and Builders Pvt Ltd
                  is excited to continue pushing the boundaries of design and
                  construction. We are committed to innovation and excellence,
                  ensuring that we remain at the forefront of the industry,
                  setting new standards in the architecture and construction
                  realm.
                </Paragraph>
              </div>
            </Col>
          </Row>
          {/* <div className="stats-section">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={8}>
                <div className="stat-card">
                  <div className="stat-icon">15+</div>
                  <Text className="stat-label">Years Experience</Text>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="stat-card">
                  <div className="stat-icon">500+</div>
                  <Text className="stat-label">Projects Delivered</Text>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="stat-card">
                  <div className="stat-icon">98%</div>
                  <Text className="stat-label">Client Satisfaction</Text>
                </div>
              </Col>
            </Row>
          </div> */}
        </div>
      </section>

      {/* CEO Section */}
      <section className="ceo-section">
        <div className="container">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className="ceo-image-container">
                <img src={CeoImage} alt="CEO" className="ceo-image" />
                <div className="ceo-image-overlay"></div>
                <div className="ceo-background-shape"></div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="ceo-content">
                <div className="section-title-wrapper">
                  <Title level={2} className="section-title">Chief Executive Officer</Title>
                  <div className="title-decorator"></div>
                </div>
                <Title level={3} className="ceo-name">
                  Rajan Karki
                </Title>
                <Text className="ceo-title">
                  Founder & Chief Executive Officer
                </Text>
                <Paragraph className="ceo-bio">
                  With over two decades of experience in technology and
                  innovation, Rajan has been at the forefront of digital
                  transformation. His vision has guided our company to become a
                  leading force in technology consulting, helping businesses
                  across the globe achieve their digital ambitions.
                </Paragraph>
                <div className="ceo-achievements">
                  <div className="achievement-card">
                    <div className="achievement-icon">20+</div>
                    <Text className="achievement-label">Years Industry Experience</Text>
                  </div>
                  <div className="achievement-card">
                    <div className="achievement-icon">100+</div>
                    <Text className="achievement-label">Speaking Engagements</Text>
                  </div>
                  <div className="achievement-card">
                    <div className="achievement-icon">30+</div>
                    <Text className="achievement-label">Industry Awards</Text>
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
  );
};

export default AboutUsPage;
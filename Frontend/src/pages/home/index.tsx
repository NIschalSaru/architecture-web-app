/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Layout, Row, Typography } from "antd";
import BannerComponent from "./banner";
import ScrollToTop from "../../components/ScrollToTop.tsx";
import ContactUsSection from "../../components/ContactUsSection.tsx";
import YoutubeVideoSection from "../../components/YoutubeVideoSection.tsx";
import TestimonialSlider from "../../components/Testimonial.tsx";

const Home = () => {
  const { Title } = Typography;

  return (
    <>
      <BannerComponent/>

      <Layout>
        <YoutubeVideoSection/>
      </Layout>

      <Layout>
        <ContactUsSection/>
      </Layout>

      <Layout>
        <TestimonialSlider />
      </Layout>
    
      <Layout className="contact-container">
        <div className="contact-card container">
          <Row gutter={40}>
            <Col xs={24} md={12}>
              ANOTHER SECTION
            </Col>
          </Row>
        </div>
      </Layout>
      <ScrollToTop />
    </>
  );
};

export default Home;

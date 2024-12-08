/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Layout, Row, Typography } from "antd";
// import Slider from "react-slick";


// import useGetAPI from "../../hooks/useGetAPI";
import BannerComponent from "./banner";
// import ServiceComponent from "./services";

import ScrollToTop from "../../components/ScrollToTop.tsx";

// import ProjectsSection from "../../components/ProjectsSection.tsx";

const Home = () => {
  const { Title } = Typography;

  return (
    <>
      <BannerComponent/>

      <Layout className="testimonial partners">
        <div className="testimonial-circle testimonial-circleTop" />
        <div className="testimonial-circle testimonial-circleBottom" />
        <div className="container testimonial-wrapper">
          <Title level={2}>"testimonial"</Title>
          <div className="slider-container">
          </div>
        </div>
      </Layout>
    

      <Layout className="contact-container">
        <div className="contact-card container">
          <Row gutter={40}>
            <Col xs={24} md={12}>
              Hello Hello
            </Col>
          </Row>
        </div>
      </Layout>
      <ScrollToTop />
    </>
  );
};

export default Home;

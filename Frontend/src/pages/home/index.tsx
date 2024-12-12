/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Layout, Row, Typography } from "antd";
import BannerComponent from "./banner";
import ScrollToTop from "../../components/ScrollToTop.tsx";
import ContactUsSection from "../../components/ContactUsSection.tsx";
import YoutubeVideoSection from "../../components/YoutubeVideoSection.tsx";
import TestimonialSlider from "../../components/Testimonial.tsx";
import ProjectsSection from "../../components/ProjectsSection.tsx";
import Services from "../../pages/home/services.tsx";

const Home = () => {
  const { Title } = Typography;

  return (
    <>
      <BannerComponent />
      <Services/>
      <Layout>
        <YoutubeVideoSection />
      </Layout>

      <Layout>
        <ContactUsSection />
      </Layout>

      <Layout>
        <TestimonialSlider />
      </Layout>

      <Layout className="contact-container">
        <ProjectsSection />
      </Layout>
      <ScrollToTop />
    </>
  );
};

export default Home;

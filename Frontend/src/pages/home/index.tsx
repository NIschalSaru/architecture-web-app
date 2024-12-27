/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "antd";
import BannerComponent from "./banner";
import ScrollToTop from "../../components/ScrollToTop.tsx";
import ContactUsSection from "../../components/ContactUsSection.tsx";
import YoutubeVideoSection from "../../components/YoutubeVideoSection.tsx";
import TestimonialSlider from "../../components/Testimonial.tsx";
// import ProjectsSection from "../../components/ProjectsSection.tsx";
import Services from "./services.tsx";
import WhyUs from "../../components/WhyUs.tsx";
// import LoadingSpinner from '../../components/LoadingSpinner.tsx';

const Home = () => {
  // const { Title } = Typography;
  // if (loading) return <LoadingSpinner />;
  return (
    <>
      {/* <LoadingSpinner /> */}
      <BannerComponent />
      <Services/>
      <Layout>
        <YoutubeVideoSection />
      </Layout>
      <Layout>
        <WhyUs />
      </Layout>
      {/* <Layout>
        <ProjectsSection />
      </Layout> */}
      <Layout>
        <TestimonialSlider />
      </Layout>
      <Layout>
        <ContactUsSection />
      </Layout>

      <ScrollToTop />
    </>
  );
};

export default Home;

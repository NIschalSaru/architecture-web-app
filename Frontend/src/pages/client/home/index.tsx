/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "antd";
import BannerComponent from "./banner.tsx";
import ScrollToTop from "../../../components/client/ScrollToTop.tsx";
import ContactUsSection from "../../../components/client/ContactUsSection.tsx";
import YoutubeVideoSection from "../../../components/client/YoutubeVideoSection.tsx";
import TestimonialSlider from "../../../components/client/Testimonial.tsx";
// import ProjectsSection from "../../components/ProjectsSection.tsx";
import Services from "./services.tsx";
import WhyUs from "../../../components/client/WhyUs.tsx";
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

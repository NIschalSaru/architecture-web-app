import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import ScrollToTop from "../../../components/client/ScrollToTop";
import { InnerHeader } from "../../../components/client/InnerHeader";
import flowchartDesign from "../../../assets/images/DesignProcess-FlowchartImg.png";
import flowchartMunicipal from "../../../assets/images//Municipal-FlowChart.png";
// import flowchartProjectManagement from "../../../assets/images/project_management_flowchart.png";
import step1DesignApproach from "../../../assets/images/DesignProcess-Step1.png";
import step2DesignApproach from "../../../assets/images/DesignProcess-Step2.png";
import step3DesignApproach from "../../../assets/images/DesignProcess-Step3.png";
// import step1InnovativeSolutions from "../../../assets/images/innovative_solutions_step1.png";
// import step2InnovativeSolutions from "../../../assets/images/innovative_solutions_step2.png";
// import step3InnovativeSolutions from "../../../assets/images/innovative_solutions_step3.png";
// import step1ProjectManagement from "../../../assets/images/project_management_step1.png";
// import step2ProjectManagement from "../../../assets/images/project_management_step2.png";
// import step3ProjectManagement from "../../../assets/images/project_management_step3.png";
import { useState } from "react";

const { Title, Paragraph } = Typography;

const Services = () => {
  const services = [
    {
      title: "डिजाइन प्रक्रिया (Design Process)",
      description:
        "Our design philosophy combines aesthetic excellence with functional practicality. We create spaces that not only look stunning but also enhance the quality of life for their occupants. Through careful consideration of light, space, and materials, we develop architectural solutions that stand the test of time.",
      image: flowchartDesign,
      stepImages: [
        step1DesignApproach,
        step2DesignApproach,
        step3DesignApproach,
      ],
      features: [
        "Custom Design Solutions",
        "Sustainable Architecture",
        "Interior Planning",
      ],
    },
    {
      title: "नगरपालिकाको प्रक्रिया (Municipal Process)",
      description:
        "Our design philosophy combines aesthetic excellence with functional practicality. We create spaces that not only look stunning but also enhance the quality of life for their occupants. Through careful consideration of light, space, and materials, we develop architectural solutions that stand the test of time.",
      image: flowchartMunicipal,
      stepImages: [
        step1DesignApproach,
        step2DesignApproach,
        step3DesignApproach,
      ],
      features: [
        "Custom Design Solutions",
        "Sustainable Architecture",
        "Interior Planning",
      ],
    },
    {
      title: "निर्माण प्रक्रिया (Construction Process)",
      description:
        "We leverage cutting-edge technology and innovative thinking to solve complex architectural challenges. Our team stays ahead of industry trends, incorporating smart home features, sustainable materials, and energy-efficient systems into every project while maintaining the timeless principles of good design.",
      image: flowchartDesign,
      stepImages: [
        step1DesignApproach,
        step1DesignApproach,
        step1DesignApproach,
      ],
      features: [
        "Smart Home Integration",
        "Energy Efficiency",
        "Modern Materials",
      ],
    },
    {
      title: "वास्तु शास्त्र (Vaastu Shastra)",
      description:
        "From concept to completion, our project management expertise ensures smooth execution of every detail. We coordinate with contractors, manage timelines, and oversee budgets while maintaining transparent communication with our clients throughout the entire building process.",
      image: flowchartDesign,
      stepImages: [
        step1DesignApproach,
        step1DesignApproach,
        step1DesignApproach,
      ],
      features: ["Timeline Management", "Budget Control", "Quality Assurance"],
    },
  ];

  return (
    <>
      <InnerHeader title="Services" currentPage="SERVICES" />
      <section className="services-section-page">
        <div className="container">
          {services.map((service, index) => {
            const [activeImage, setActiveImage] = useState(service.image);

            return (
              <div
                key={service.title}
                className={`service-card-page ${index % 2 !== 0 ? "reverse" : ""} fade-in`}
              >
                <div className="image-side-page">
                  <div className="image-wrapper-page">
                    <img
                      src={activeImage}
                      alt={service.title}
                      onClick={() => setActiveImage(service.image)}
                      style={{ cursor: "pointer" }}
                    />
                    {activeImage !== service.image && (
                      <div
                        className="back-to-flowchart"
                        onClick={() => setActiveImage(service.image)}
                      >
                        Back to Flowchart
                      </div>
                    )}
                  </div>
                  <div className="step-images-gallery">
                    {service.stepImages.map((stepImage, idx) => (
                      <div
                        key={idx}
                        className={`step-image-wrapper ${
                          activeImage === stepImage ? "active" : ""
                        }`}
                        onClick={() => setActiveImage(stepImage)}
                      >
                        <img
                          src={stepImage}
                          alt={`Step ${idx + 1} for ${service.title}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="content-side-page">
                  <div className="content-wrapper-page">
                    <div className="section-title-wrapper-page">
                      <Title level={2} className="service-title-page">
                        {service.title}
                      </Title>
                      <div className="title-decorator-page"></div>
                    </div>
                    <Paragraph className="service-description-page">
                      {service.description}
                    </Paragraph>
                    <div className="divider-page"></div>
                    <ul className="features-list-page">
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircleOutlined className="feature-icon-page" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button type="primary" className="learn-more-btn-page">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ScrollToTop />
      </section>
    </>
  );
};

export default Services;
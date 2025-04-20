import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import ScrollToTop from "../../../components/client/ScrollToTop";
import { InnerHeader } from "../../../components/client/InnerHeader";
import img from "../../../assets/images/Animated_Architecture.png";


const { Title, Paragraph } = Typography;

const Services = () => {
  const services = [
    {
      title: "Design Approach",
      description:
        "Our design philosophy combines aesthetic excellence with functional practicality. We create spaces that not only look stunning but also enhance the quality of life for their occupants. Through careful consideration of light, space, and materials, we develop architectural solutions that stand the test of time.",
      image: img,
      features: [
        "Custom Design Solutions",
        "Sustainable Architecture",
        "Interior Planning",
      ],
    },
    {
      title: "Innovative Solutions",
      description:
        "We leverage cutting-edge technology and innovative thinking to solve complex architectural challenges. Our team stays ahead of industry trends, incorporating smart home features, sustainable materials, and energy-efficient systems into every project while maintaining the timeless principles of good design.",
      image: img,
      features: [
        "Smart Home Integration",
        "Energy Efficiency",
        "Modern Materials",
      ],
    },
    {
      title: "Project Management",
      description:
        "From concept to completion, our project management expertise ensures smooth execution of every detail. We coordinate with contractors, manage timelines, and oversee budgets while maintaining transparent communication with our clients throughout the entire building process.",
      image: img,
      features: ["Timeline Management", "Budget Control", "Quality Assurance"],
    },
  ];

  return (
    <>
      <InnerHeader title="Services" currentPage="SERVICES" />
      <section className="services-section-page">
        <div className="container">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card-page ${index % 2 !== 0 ? "reverse" : ""} fade-in`}
            >
              <div className="image-side-page">
                <div className="image-wrapper-page">
                  <img src={service.image} alt={service.title} />
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
          ))}
        </div>
        <ScrollToTop />
      </section>
    </>
  );
};

export default Services;
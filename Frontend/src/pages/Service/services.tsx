import img from "../../assets/images/banner.jpg";

// interface ServiceItem {
//     title: string;
//     description: string;
//     image: string;
//     features: string[];
//   }

const Services = () => {
    const services = [
        {
          title: "Design Approach",
          description: "Our design philosophy combines aesthetic excellence with functional practicality. We create spaces that not only look stunning but also enhance the quality of life for their occupants. Through careful consideration of light, space, and materials, we develop architectural solutions that stand the test of time.",
          image: "/api/placeholder/600/400",
          features: ["Custom Design Solutions", "Sustainable Architecture", "Interior Planning"]
        },
        {
          title: "Innovative Solutions",
          description: "We leverage cutting-edge technology and innovative thinking to solve complex architectural challenges. Our team stays ahead of industry trends, incorporating smart home features, sustainable materials, and energy-efficient systems into every project while maintaining the timeless principles of good design.",
          image: "/api/placeholder/600/400",
          features: ["Smart Home Integration", "Energy Efficiency", "Modern Materials"]
        },
        {
          title: "Project Management",
          description: "From concept to completion, our project management expertise ensures smooth execution of every detail. We coordinate with contractors, manage timelines, and oversee budgets while maintaining transparent communication with our clients throughout the entire building process.",
          image: "/api/placeholder/600/400",
          features: ["Timeline Management", "Budget Control", "Quality Assurance"]
        }
      ];
    return (
        <>
        <div className="inner-header">
            <div className="header-content">
                <h1 className="page-title">Services</h1>
                <div className="breadcrumb">
                    <a href="/">HOME</a>
                    <span className="separator">/</span>
                    <span className="current">SERVICES</span>
                </div>
            </div>
        </div>
        <section className="services-section">
      <div className="container">
        {services.map((service, index) => (
          <div 
            key={service.title}
            className={`service-item ${index % 2 !== 0 ? 'reverse' : ''}`}
          >
            <div className="content-side">
              <div className="content-wrapper">
                <span className="service-number">0{index + 1}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className="features-list">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      a.
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="learn-more-btn">
                  Read More !!!
                </button>
              </div>
            </div>
            <div className="image-side">
              <div className="image-wrapper">
                <img 
                  src={img} 
                  alt={service.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
      </>
    );
  };

export default Services;

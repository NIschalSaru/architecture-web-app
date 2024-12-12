import { ToolOutlined, BulbOutlined, ProjectOutlined } from '@ant-design/icons';
// import './Services.scss';

const Services: React.FC = () => {
  const services = [
    {
      icon: <ToolOutlined />,
      title: 'Design Approach',
      description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.'
    },
    {
      icon: <BulbOutlined />,
      title: 'Innovative Solutions',
      description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.'
    },
    {
      icon: <ProjectOutlined />,
      title: 'Project Management',
      description: 'Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.'
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h3 className="subtitle">OUR SERVICES</h3>
          <h2 className="title">
            We Focused On Modern
            <br />
            Architecture And Interior Design
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="icon-wrapper">
                <div className="icon-background"></div>
                <div className="icon-outer">
                  {service.icon}
                </div>
                <div className="icon-inner">
                  {service.icon}
                </div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
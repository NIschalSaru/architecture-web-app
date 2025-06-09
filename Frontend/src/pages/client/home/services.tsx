import { ToolOutlined, BulbOutlined, ProjectOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const services = [
    {
      icon: <BulbOutlined />,
      title: {
        nepali: 'डिजाइन र नगरपालिकाको प्रक्रिया',
        english: '(Design & Municipal Process)'
      },
      description: [
        "Understanding of Client's Needs, Budget, and Vision",
        "Understanding Architectural, Structural Drawings, and 3D Photos & Videos",
        "Understanding the required documents for municipal drawings and the approval process"
      ],
      targetSection: 'design-process'
    },
    {
      icon: <ToolOutlined />,
      title: {
        nepali: 'निर्माण प्रक्रिया',
        english: '(Construction Process)'
      },
      description: [
        "Full-Time Contract: We manage materials, labor, and full supervision with 24/7 CCTV monitoring",
        "Half-Time Contract: Client provides materials, and we oversee labor and supervision",
        "Supervision Only Contract: Our engineers ensure quality and safety throughout the construction"
      ],
      targetSection: 'construction-process'
    },
    {
      icon: <ProjectOutlined />,
      title: {
        nepali: 'वास्तु शास्त्र',
        english: '(Vaastu Shastra)'
      },
      description: [
        "Brings Positive Energy",
        "Makes your space more comfortable",
        "Prevent future issues"
      ],
      targetSection: 'vaastu-shastra'
    }
  ];

  const handleServiceClick = (targetSection: string) => {
    navigate(`/services#${targetSection}`);
  };

  return (
    <section className="home-services-section">
      <div className="home-services-container">
        <div className="home-services-header">
          <h3 className="home-services-subtitle">OUR SERVICES</h3>
          <h2 className="home-services-title">
            हजुरको सपना पुरा गर्नको 
            <br />
            लागि सही मार्गदर्शन र उपयोगी जानकारी
          </h2>
        </div>

        <div className="home-services-grid">
          {services.map((service, index) => (
            <div 
              className="home-services-card" 
              key={index}
              onClick={() => handleServiceClick(service.targetSection)}
              style={{ cursor: 'pointer' }}
            >
              <div className="home-services-icon-wrapper">
                <div className="home-services-icon-background"></div>
                <div className="home-services-icon-outer">
                  {service.icon}
                </div>
                <div className="home-services-icon-inner">
                  {service.icon}
                </div>
              </div>
              <h3 className="home-services-title-text">
                <span className="home-services-nepali-title">{service.title.nepali}</span>
                <span className="home-services-english-title">{service.title.english}</span>
              </h3>
              <ul className="home-services-description">
                {service.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;




// import { ToolOutlined, BulbOutlined, ProjectOutlined } from '@ant-design/icons';

// const Services: React.FC = () => {
//   const services = [
//     {
//       icon: <ToolOutlined />,
//       title: {
//         nepali: 'डिजाइन र नगरपालिकाको प्रक्रिया',
//         english: '(Design & Municipal Process)'
//       },
//       description: [
//         "Understanding of Client's Needs, Budget, and Vision",
//         "Understanding Architectural, Structural Drawings, and 3D Photos & Videos",
//         "Understanding the required documents for municipal drawings and the approval process"
//       ]
//     },
//     {
//       icon: <BulbOutlined />,
//       title: {
//         nepali: 'निर्माण प्रक्रिया',
//         english: '(Construction Process)'
//       },
//       description: [
//         "Full-Time Contract: We manage materials, labor, and full supervision with 24/7 CCTV monitoring",
//         "Half-Time Contract: Client provides materials, and we oversee labor and supervision",
//         "Supervision Only Contract: Our engineers ensure quality and safety throughout the construction"
//       ]
//     },
//     {
//       icon: <ProjectOutlined />,
//       title: {
//         nepali: 'वास्तु शास्त्र',
//         english: '(Vaastu Shastra)'
//       },
//       description: [
//         "Brings Positive Energy",
//         "Makes your space more comfortable",
//         "Prevent future issues"
//       ]
//     }
//   ];

//   return (
//     <section className="services-section">
//       <div className="services-container">
//         <div className="services-header">
//           <h3 className="subtitle">OUR SERVICES</h3>
//           <h2 className="title">
//             हजुरको सपना पुरा गर्नको 
//             <br />
//             लागि सही मार्गदर्शन र उपयोगी जानकारी
//           </h2>
//         </div>

//         <div className="services-grid">
//           {services.map((service, index) => (
//             <div className="service-card" key={index}>
//               <div className="icon-wrapper">
//                 <div className="icon-background"></div>
//                 <div className="icon-outer">
//                   {service.icon}
//                 </div>
//                 <div className="icon-inner">
//                   {service.icon}
//                 </div>
//               </div>
//               <h3 className="service-title">
//                 <span className="nepali-title">{service.title.nepali}</span>
//                 <span className="english-title">{service.title.english}</span>
//               </h3>
//               <ul className="service-description">
//                 {service.description.map((item, idx) => (
//                   <li key={idx}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;
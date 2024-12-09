import React, { useState, useCallback } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import "../assets/scss/components/_contactUsSection.scss";
import MiddleImage from "../assets/images/Outlined1.jpg";
import "linearicons/dist/web-font/style.css";
import ApartmentIcon from "../assets/svg/lnr-apartment.svg";
import PenIcon from "../assets/svg/penIcon.svg";
import BulbIcon from "../assets/svg/lightbulbIcon.svg";

const ContactUsSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Updated mouse move handler to match YouTube section
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const container = e.currentTarget;
      const { left, top, width, height } = container.getBoundingClientRect();

      // Calculate mouse position relative to container center
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      setMousePosition({ x, y });
    },
    []
  );

  const onFinish = (values: any) => {
    console.log("Form values: ", values);
  };

  return (
    <section className="architecture-section" onMouseMove={handleMouseMove}>
      <div className="container">
        <Row
          gutter={[50, 50]}
          align="middle"
          justify="space-between"
          className="content-row"
        >
          {/* Left Section */}
          <Col xs={28} md={12} lg={6} className="info-box">
            <div className="info-item fade-in-left">
              <div className="icon-container">
                <div className="icon">
                  <img src={ApartmentIcon} alt="Apartment Icon" />
                </div>
                <h5 className="icon-text">Architecture</h5>
              </div>
              <div className="info-content">
                <p>We provide high-quality architecture services.</p>
              </div>
            </div>
            <div
              className="info-item fade-in-left"
              style={{ animationDelay: "0.05s" }}
            >
              <div className="icon-container">
                <div className="icon">
                  <img src={PenIcon} alt="Pen Icon" />
                </div>
                <h5 className="icon-text">Interior Design</h5>
              </div>
              <div className="info-content">
                <p>Our team offers unique and stylish architecture solutions.</p>
              </div>
            </div>
            <div
              className="info-item fade-in-left"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="icon-container">
                <div className="icon">
                  <img src={BulbIcon} alt="Bulb Icon" />
                </div>
                <h5 className="icon-text">Lighting Design</h5>
              </div>
              <div className="info-content">
                <p>Let our team design unique lighting for your home.</p>
              </div>
            </div>
          </Col>

          {/* Right Section */}
          <Col xs={24} md={14} lg={10} className="form-col">
            <h1 className="fade-in-right">FIND OUT THE PRICE OF YOUR HOME</h1>
            <h4 className="fade-in-right">We will contact you within 24 hours</h4>
            <div className="form-container">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your name!" }]}
                >
                  <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: "Please enter your phone!" }]}
                >
                  <Input placeholder="Enter your phone" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      {/* Updated background div to match YouTube section style */}
      <div
        className="architecture-section__background"
        style={{
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 30}px, ${
            mousePosition.y * 30
          }px)`,
        }}
      >
        <img
          src={MiddleImage}
          alt="Background decoration"
          style={{
            transform: `scale(1.1) translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        />
      </div>
    </section>
  );
};

export default ContactUsSection;

// import React, { useState } from "react";
// import { Form, Input, Button, Row, Col } from "antd";
// import "../assets/scss/components/_contactUsSection.scss";
// import MiddleImage from "../assets/images/Outlined1.jpg";
// import "linearicons/dist/web-font/style.css";
// import ApartmentIcon from "../assets/svg/lnr-apartment.svg";

// const ContactUsSection: React.FC = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const onFinish = (values: any) => {
//     console.log("Form values: ", values);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width - 0.5;
//     const y = (e.clientY - rect.top) / rect.height - 0.5;

//     setMousePosition({
//       x: -x * 40,
//       y: -y * 40,
//     });
//   };

//   const handleMouseLeave = () => {
//     setMousePosition({ x: 30, y: 30 });
//   };

//   return (
//     <section
//       className="architecture-section"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Background Image */}
//       <div
//         className="background-image"
//         style={{
//           backgroundImage: `url(${MiddleImage})`,
//           transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
//         }}
//       />

//       <div className="container">
//         <Row
//           gutter={[50, 50]}
//           align="middle"
//           justify="space-between"
//           className="content-row"
//         >
//           {/* Left Section */}
//           <Col xs={28} md={12} lg={6} className="info-box">
//             <div className="info-item fade-in-left">
//               <div className="icon-container">
//                 <div className="icon">
//                   <img src={ApartmentIcon} alt="Apartment Icon" />
//                 </div>
//                 <h5 className="icon-text">Architecture</h5>
//               </div>
//               <div className="info-content">
//                 <p>We provide high-quality architecture services.</p>
//               </div>
//             </div>
//             <div
//               className="info-item fade-in-left"
//               style={{ animationDelay: "0.05s" }}
//             >
//               <div className="icon-container">
//                 <div className="icon">
//                   <img src={ApartmentIcon} alt="Apartment Icon" />
//                 </div>
//                 <h5 className="icon-text">Interior Design</h5>
//               </div>
//               <div className="info-content">
//                 <p>
//                   Our team offers unique and stylish architecture solutions.
//                 </p>
//               </div>
//             </div>
//             <div
//               className="info-item fade-in-left"
//               style={{ animationDelay: "0.1s" }}
//             >
//               <div className="icon-container">
//                 <div className="icon">
//                   <img src={ApartmentIcon} alt="Apartment Icon" />
//                 </div>
//                 <h5 className="icon-text">Lighting Design</h5>
//               </div>
//               <div className="info-content">
//                 <p>Let our team design unique lighting for your home.</p>
//               </div>
//             </div>
//           </Col>

//           {/* Right Section */}
//           <Col xs={24} md={14} lg={10} className="form-col">
//             <h1 className="fade-in-right">FIND OUT THE PRICE OF YOUR HOME</h1>
//             <h4 className="fade-in-right">
//               We will contact you within 24 hours
//             </h4>
//             <div className="form-container">
//               <Form layout="vertical" onFinish={onFinish}>
//                 <Form.Item
//                   label="Name"
//                   name="name"
//                   rules={[
//                     { required: true, message: "Please enter your name!" },
//                   ]}
//                 >
//                   <Input placeholder="Enter your name" />
//                 </Form.Item>
//                 <Form.Item
//                   label="Email"
//                   name="email"
//                   rules={[
//                     { required: true, message: "Please enter your email!" },
//                     { type: "email", message: "Please enter a valid email!" },
//                   ]}
//                 >
//                   <Input placeholder="Enter your email" />
//                 </Form.Item>
//                 <Form.Item
//                   label="Phone"
//                   name="phone"
//                   rules={[
//                     { required: true, message: "Please enter your phone!" },
//                   ]}
//                 >
//                   <Input placeholder="Enter your phone" />
//                 </Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Submit
//                 </Button>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </section>
//   );
// };

// export default ContactUsSection;

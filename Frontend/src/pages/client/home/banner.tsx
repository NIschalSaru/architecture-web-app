import { Button, Typography, Form, Input, Drawer, Checkbox, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Phone, Mail, User, MapPin, Ruler, Home, Clock, Mountain, Compass, Layers, ParkingCircle, FileText, ArrowRight } from "lucide-react";

interface BannerData {
  id: number;
  imageUrl: string;
  heading: string;
  subHeading: string;
  description: string;
}

interface BannerComponentProps {
  bannerData: BannerData;
}

const BannerComponent = ({ bannerData }: BannerComponentProps) => {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    setIsDrawerOpen(false);
    form.resetFields();
  };

  return (
    <div className="banner">
      <div>
        <img src={bannerData.imageUrl} alt="Banner Image" />
        <div className="container">
          <div className="banner-info">
            <Title style={{ margin: "0" }} level={3}>
              {bannerData.heading}
            </Title>
            <Text className="banner-info--text">
              <span>{bannerData.subHeading}</span>
            </Text>
            <Text className="banner-info--description">
              {bannerData.description}
            </Text>
            <Button size="large" onClick={() => navigate("/about")}>
              <span> Know More <ArrowRight /></span>
            </Button>
          </div>
        </div>

        <Button className="side-button" onClick={() => setIsDrawerOpen(true)}>
          Book Here
        </Button>

        <div className="banner-ribbon">
          <Text className="ribbon-text">
            We design and construct all types of buildings across Nepal with a skilled team of architects, engineers and construction technicians of respective fields.
          </Text>
        </div>

        <Drawer
          title={<div className="drawer-title">Client Requirement Form</div>}
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          width={600}
          className="booking-drawer"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="consultation-form"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[{ required: true, message: "Please enter your full name" }]}
                >
                  <Input
                    prefix={<User className="form-icon" />}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="locationOfSite"
                  label="Location of Site"
                >
                  <Input
                    prefix={<MapPin className="form-icon" />}
                    placeholder="Enter site location"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="siteArea"
                  label="Site Area"
                >
                  <Input
                    prefix={<Ruler className="form-icon" />}
                    placeholder="Enter site area (e.g., sq ft)"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="typeOfBuilding"
                  label="Type of Building"
                >
                  <Input
                    prefix={<Home className="form-icon" />}
                    placeholder="Enter building type (e.g., residential)"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="projectDuration"
                  label="Project Duration"
                >
                  <Input
                    prefix={<Clock className="form-icon" />}
                    placeholder="Enter project duration (e.g., months)"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="accessRoadWidth"
                  label="Access Road Width"
                >
                  <Input
                    prefix={<Ruler className="form-icon" />}
                    placeholder="Enter road width (e.g., ft)"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="topography"
                  label="Topography"
                >
                  <Input
                    prefix={<Mountain className="form-icon" />}
                    placeholder="Enter topography (e.g., flat, sloped)"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="siteOrientationText"
                  label="Site Orientation (Text)"
                >
                  <Input
                    prefix={<Compass className="form-icon" />}
                    placeholder="Enter site orientation details"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="siteOrientation"
              label="Site Orientation (Check all that apply)"
            >
              <Checkbox.Group className="orientation-checkboxes">
                <Checkbox value="north">North</Checkbox>
                <Checkbox value="east">East</Checkbox>
                <Checkbox value="south">South</Checkbox>
                <Checkbox value="west">West</Checkbox>
              </Checkbox.Group>
            </Form.Item>

            <div className="form-fieldset">
              <div className="fieldset-legend">By Laws</div>
              <Form.Item
                name="far"
                label="FAR"
              >
                <Input
                  prefix={<FileText className="form-icon" />}
                  placeholder="Enter FAR"
                />
              </Form.Item>
              <Form.Item
                name="gcr"
                label="GCR"
              >
                <Input
                  prefix={<FileText className="form-icon" />}
                  placeholder="Enter GCR"
                />
              </Form.Item>
              <Form.Item
                name="setback"
                label="Setback"
              >
                <Input
                  prefix={<FileText className="form-icon" />}
                  placeholder="Enter setback"
                />
              </Form.Item>
            </div>

            <div className="form-fieldset">
              <div className="fieldset-legend">Requirements</div>
              <Form.Item
                name="noOfFloorRequired"
                label="No. of Floor Required"
              >
                <Input
                  type="number"
                  prefix={<Layers className="form-icon" />}
                  placeholder="Enter number of floors"
                />
              </Form.Item>
              <Form.Item
                name="basementOrParkingArea"
                label="Basement or Parking Area"
              >
                <Input
                  prefix={<ParkingCircle className="form-icon" />}
                  placeholder="Enter basement/parking details"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="roomRequirements"
              label="Room Requirements"
            >
              <Input.TextArea
                placeholder="Enter room requirements"
                rows={5}
              />
            </Form.Item>

            <Form.Item className="submit-button">
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default BannerComponent;













// import { Button, Typography, Form, Input, Drawer } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Phone, Mail, User, ArrowRight } from "lucide-react";

// interface BannerData {
//   id: number;
//   imageUrl: string;
//   heading: string;
//   subHeading: string;
//   description: string;
// }

// interface BannerComponentProps {
//   bannerData: BannerData;
// }

// const BannerComponent = ({ bannerData }: BannerComponentProps) => {
//   const { Title, Text } = Typography;
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [form] = Form.useForm();

//   const handleSubmit = (values: any) => {
//     console.log("Form values:", values);
//     setIsDrawerOpen(false);
//     form.resetFields();
//   };

//   return (
//     <div className="banner">
//       <div>
//         <img src={bannerData.imageUrl} alt="Banner Image" />
//         <div className="container">
//           <div className="banner-info">
//             <Title style={{ margin: "0" }} level={3}>
//               {bannerData.heading}
//             </Title>
//             <Text className="banner-info--text">
//               <span>{bannerData.subHeading}</span>
//             </Text>
//             <Text className="banner-info--description">
//               {bannerData.description}
//             </Text>
//             <Button
//               size="large"
//               onClick={() => navigate("/about")}
//             >
//               <span> Know More <ArrowRight /></span>
//             </Button>
//           </div>
//         </div>

//         <Button className="side-button" onClick={() => setIsDrawerOpen(true)}>
//           Book Here
//         </Button>

//         <div className="banner-ribbon">
//           <Text className="ribbon-text">
//             We design and construct all types of buildings across Nepal with a skilled team of architects, engineers and construction technicians of respective fields.
//           </Text>
//         </div>

//         <Drawer
//           title={<div className="drawer-title">Client Requirement Form</div>}
//           placement="right"
//           onClose={() => setIsDrawerOpen(false)}
//           open={isDrawerOpen}
//           width={420}
//           className="booking-drawer"
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleSubmit}
//             className="consultation-form"
//           >
//             <Form.Item
//               name="name"
//               label="Full Name"
//               rules={[{ required: true, message: "Please enter your name" }]}
//             >
//               <Input
//                 prefix={<User className="form-icon" />}
//                 placeholder="Enter your full name"
//               />
//             </Form.Item>

//             <Form.Item
//               name="email"
//               label="Email Address"
//               rules={[
//                 { required: true, message: "Please enter your email" },
//                 { type: "email", message: "Please enter a valid email" },
//               ]}
//             >
//               <Input
//                 prefix={<Mail className="form-icon" />}
//                 placeholder="Enter your email address"
//               />
//             </Form.Item>

//             <Form.Item
//               name="phone"
//               label="Phone Number"
//               rules={[
//                 { required: true, message: "Please enter your phone number" },
//               ]}
//             >
//               <Input
//                 prefix={<Phone className="form-icon" />}
//                 placeholder="Enter your phone number"
//               />
//             </Form.Item>

//             <Form.Item
//               name="message"
//               label="Message"
//               rules={[{ required: true, message: "Please enter your Message" }]}
//             >
//               <Input.TextArea
//                 placeholder="Tell us about your project requirements"
//                 rows={4}
//               />
//             </Form.Item>

//             <Form.Item className="submit-button">
//               <Button type="primary" htmlType="submit" block>
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Drawer>
//       </div>
//     </div>
//   );
// };

// export default BannerComponent;








// import { Button, Typography, Form, Input, Drawer } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Phone, Mail, User } from "lucide-react";
// import useGetAPI from "../../../hooks/useGetAPI";
// import LoadingSpinner from "../../../components/client/LoadingSpinner";

// interface BannerData {
//   id: number;
//   imageUrl: string;
//   heading: string;
//   subHeading: string;
// }

// const BannerComponent = () => {
//   const { Title, Text } = Typography;
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [form] = Form.useForm();

//   const {
//     data: bannerData,
//     loading,
//     error,
//   } = useGetAPI<BannerData>(`architecture-web-app/banner`);

//   const handleSubmit = (values: any) => {
//     console.log("Form values:", values);
//     setIsDrawerOpen(false);
//     form.resetFields();
//   };

//   if (loading) return <LoadingSpinner />;
//   if (error)
//     return <div className="banner-error">Error loading banner: {error}</div>;
//   if (!bannerData) return null;

//   return (
//     <section className="banner-section">
//       <div className="banner-image">
//         <img src={bannerData.imageUrl} alt="Banner" />
//       </div>
//       <div className="banner-content">
//         <div className="banner-text">
//           <Title level={3} className="banner-heading fade-in">
//             {bannerData.heading}
//           </Title>
//           <Text className="banner-subheading fade-in">
//             {bannerData.subHeading}
//           </Text>
//           <Button
//             type="primary"
//             size="large"
//             className="banner-cta fade-in"
//             onClick={() => navigate("/about")}
//           >
//             Discover More
//           </Button>
//         </div>
//       </div>
//       <Button
//         className="banner-side-btn fade-in"
//         onClick={() => setIsDrawerOpen(true)}
//       >
//         Book Now
//       </Button>
//       <Drawer
//         title={<div className="banner-drawer-title">Book a Consultation</div>}
//         placement="right"
//         onClose={() => setIsDrawerOpen(false)}
//         open={isDrawerOpen}
//         width={450}
//         className="banner-drawer"
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           className="banner-form"
//         >
//           <Form.Item
//             name="name"
//             label="Full Name"
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input
//               prefix={<User className="banner-form-icon" />}
//               placeholder="Enter your full name"
//               className="banner-form-input"
//             />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email Address"
//             rules={[
//               { required: true, message: "Please enter your email" },
//               { type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input
//               prefix={<Mail className="banner-form-icon" />}
//               placeholder="Enter your email address"
//               className="banner-form-input"
//             />
//           </Form.Item>
//           <Form.Item
//             name="phone"
//             label="Phone Number"
//             rules={[
//               { required: true, message: "Please enter your phone number" },
//             ]}
//           >
//             <Input
//               prefix={<Phone className="banner-form-icon" />}
//               placeholder="Enter your phone number"
//               className="banner-form-input"
//             />
//           </Form.Item>
//           <Form.Item
//             name="message"
//             label="Message"
//             rules={[{ required: true, message: "Please enter your message" }]}
//           >
//             <Input.TextArea
//               placeholder="Tell us about your project requirements"
//               rows={5}
//               className="banner-form-textarea"
//             />
//           </Form.Item>
//           <Form.Item className="banner-form-submit">
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               className="banner-form-submit-btn"
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Drawer>
//     </section>
//   );
// };

// export default BannerComponent;
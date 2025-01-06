import { Button, Typography, Form, Input, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Phone, Mail, User } from "lucide-react";
import useGetAPI from "../../../hooks/useGetAPI";
import LoadingSpinner from "../../../components/client/LoadingSpinner";

interface BannerData {
  id: number;
  imageUrl: string;
  heading: string;
  subHeading: string;
}

const BannerComponent = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    data: bannerData,
    loading,
    error,
  } = useGetAPI<BannerData>(`architecture-web-app/banner`);

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    setIsDrawerOpen(false);
    form.resetFields();
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="error-message">Error loading banner: {error}</div>;
  if (!bannerData) return null;

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
              {/* <span className="text-blue">We Design,</span>{" "}
              <span className="text-red">We Develop</span> */}
              <span>{bannerData.subHeading}</span>
            </Text>

            <Button
              
              size="large"
              onClick={() => navigate("/about")}
            >
              Read More
            </Button>
          </div>
        </div>

        <Button className="side-button" onClick={() => setIsDrawerOpen(true)}>
          Book Here
        </Button>

        <Drawer
          title={<div className="drawer-title">Book a Consultation</div>}
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          width={420}
          className="booking-drawer"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="consultation-form"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                prefix={<User className="form-icon" />}
                placeholder="Enter your full name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<Mail className="form-icon" />}
                placeholder="Enter your email address"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input
                prefix={<Phone className="form-icon" />}
                placeholder="Enter your phone number"
              />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your Message" }]}
            >
              <Input.TextArea
                placeholder="Tell us about your project requirements"
                rows={4}
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
// import { Phone, Mail, User, MessageSquare } from 'lucide-react';
// import bannerImg from "../../assets/images/banner1.jpg";

// const BannerComponent = () => {
//   const { Title, Text } = Typography;
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [form] = Form.useForm();

//   const handleSubmit = (values: any) => {
//     console.log('Form values:', values);
//     setIsDrawerOpen(false);
//     form.resetFields();
//   };

//   return (
//     <div className="banner">
//       <div>
//         <img
//           src={bannerImg}
//           alt="Banner Image"
//         />
//         <div className="container">
//           <div className="banner-info">
//             <Title style={{ margin: "0" }} level={3}>
//               Nepal Designers & Builders
//             </Title>
//             <Text className="banner-info--text">
//               {/* <span className="dot"></span> */}
//               <span className="text-blue">We Design,</span>{" "}
//               <span className="text-red">We Develop</span>
//             </Text>

//             <Button
//               type="primary"
//               size="large"
//               onClick={() => navigate("/about")}
//             >
//               Read More
//             </Button>
//           </div>
//         </div>

//         <Button
//           className="side-button"
//           onClick={() => setIsDrawerOpen(true)}
//         >
//           Book Here
//         </Button>

//         <Drawer
//           title={
//             <div className="drawer-title">
//               {/* <span className="drawer-dot"></span> */}
//               Book a Consultation
//             </div>
//           }
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
//               rules={[{ required: true, message: 'Please enter your name' }]}
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
//                 { required: true, message: 'Please enter your email' },
//                 { type: 'email', message: 'Please enter a valid email' }
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
//               rules={[{ required: true, message: 'Please enter your phone number' }]}
//             >
//               <Input
//                 prefix={<Phone className="form-icon" />}
//                 placeholder="Enter your phone number"
//               />
//             </Form.Item>

//             <Form.Item
//               name="message"
//               label="Message"
//               rules={[{ required: true, message: 'Please enter your Message' }]}
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

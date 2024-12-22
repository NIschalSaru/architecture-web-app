import { Button, Typography, Form, Input, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bannerImg from "../../assets/images/banner.jpg";

const BannerComponent = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    setIsDrawerOpen(false);
    form.resetFields();
  };

  return (
    <div className="banner">
      <div>
        <img
          src={bannerImg}
          alt="Banner Image"
        />
        <div className="container">
          <div className="banner-info">
            <Text className="banner-info--text">
              <span className="dot"></span>
              <span className="text-blue">We Design,</span>{" "}
              <span className="text-red">We Develop</span>
            </Text>
            <Title style={{ margin: "0" }} level={3}>
              Nepal Designers & Builders
            </Title>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/about")}
            >
              Read More
            </Button>
          </div>
        </div>  
        {/* Side Button */}
        <Button
          className="side-button"
          onClick={() => setIsDrawerOpen(true)}
        >
          Book Here
        </Button>

        <Drawer
          title="Book a Consultation"
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          width={400}
          className="booking-drawer"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
            >
              <Input.TextArea 
                placeholder="Tell us about your project"
                rows={4}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default BannerComponent;




// import { Button, Typography } from "antd";
// import { useNavigate } from "react-router-dom";
// // import { RightOutlined } from "@ant-design/icons";
// import bannerImg from "../../assets/images/banner.jpg";

// const BannerComponent = () => {
//   const { Title, Text } = Typography;
//   const navigate = useNavigate();
//   return (
//     <div className="banner">
//       <div>
//         <img
//           src={bannerImg}
//           alt="Banner Image"
//         />
//         <div className="container">
//           <div className="banner-info">
//             <Text className="banner-info--text">
//               <span className="dot"></span>
//               <span className="text-blue">We Design,</span>{" "}
//               <span className="text-red">We Develop</span>
//             </Text>
//             <Title style={{ margin: "0" }} level={3}>
//               Nepal Designers & Builders
//             </Title>
//             <Button
//               type="primary"
//               size="large"
//               onClick={() => navigate("/about")}
//             >
//                Read More
//             </Button>
//           </div>
//         </div>  
//         {/* Side Button */}
//         <Button
//           className="side-button"
//           onClick={() => alert("Side Button Clicked")}
//         >
//           Book Here
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BannerComponent;

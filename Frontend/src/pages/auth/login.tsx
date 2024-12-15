import { Form, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined, FacebookFilled, GithubOutlined, LinkedinFilled } from '@ant-design/icons';
// import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Nepal-Designers-Builders-Logo.png';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // Add your login logic here
    navigate('/home'); // Navigate to home page after successful login
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="content">
          <div className="logo">

            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
          {/* <h1>Welcome Back!</h1>
          <p>Enter your credentials to access your account</p> */}
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
          {/* <h2>Login to Your Account</h2> */}
          <h2>LOGIN</h2>
          
          <div className="social-buttons">
            <Button shape="circle" icon={<GoogleOutlined />} />
            <Button shape="circle" icon={<FacebookFilled />} />
            <Button shape="circle" icon={<GithubOutlined />} />
            <Button shape="circle" icon={<LinkedinFilled />} />
          </div>
          
          <p className="divider">or use your email account</p>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input placeholder="Email" className="form-input" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" className="form-input" />
            </Form.Item>

            <div className="form-options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Button type="link" className="forgot-password">
                Forgot Password?
              </Button>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-btn">
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;












// import { Button, Checkbox, Form, Input } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// // import './Login.scss';
// import loginImg from '../../assets/svg/undraw_login.svg';
// // import loginImg1 from '../../assets/images/pattern1.jpg';
// import logo from '../../assets/images/Nepal-Designers-Builders-Logo.png';

// interface LoginFormValues {
//   username: string;
//   password: string;
// }

// const Login = () => {
//   const onFinish = (values: LoginFormValues) => {
//     console.log('Success:', values);
//     // Add your login logic here
//   };

//   return (
//     <div className="login-container">
//       {/* <div className="logo-wrapper">
//         <img src={logo} alt="Logo" className="logo" />
//       </div> */}
//       <div className="login-left">
//         <div className="illustration-wrapper">
//           <div className="illustration-content">
//             {/* <h1>Welcome Back!</h1>
//             <p>Enter your credentials to access your account</p> */}
//             <div className="logo-wrapper">
//               <img src={logo} alt="Logo" className="logo" />
//             </div>
//             {/* You can add your illustration/image here */}

//             {/* <div className="decoration-circle"></div> */}
//             <img src={loginImg} alt='login Image'></img>
//             {/* <img src={loginImg1} alt='login Image'></img> */}
//           </div>
//         </div>
//       </div>
      
//       <div className="login-right">
//         <div className="login-form-wrapper">
//           <div className="login-header">
//             <h2>LOG IN</h2>
//             <p>Please login to continue</p>
//             {/* <div className="logo-wrapper">
//               <img src={logo} alt="Logo" className="logo" />
//             </div> */}
//           </div>
          
//           <Form
//             name="login-form"
//             className="login-form"
//             onFinish={onFinish}
//             layout="vertical"
//           >
//             <Form.Item
//               name="username"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your username!',
//                 },
//               ]}
//             >
//               <Input
//                 prefix={<UserOutlined />}
//                 placeholder="Username"
//                 size="large"
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your password!',
//                 },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 placeholder="Password"
//                 size="large"
//               />
//             </Form.Item>
//             <Form.Item>
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>
//           </Form.Item>
//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="login-button"
//                 size="large"
//                 block
//               >
//                 Log In
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
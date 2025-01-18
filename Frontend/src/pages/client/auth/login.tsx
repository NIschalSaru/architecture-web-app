import { Form, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined, FacebookFilled, GithubOutlined, LinkedinFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import usePostAPI from '../../../hooks/usePostAPI';
import logo from '../../../assets/images/Nepal-Designers-Builders-Logo.png';

interface LoginResponse {
  id: number;
  fullName: string;
  email: string;
  message: string;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loading, postData } = usePostAPI<LoginResponse>('architecture-web-app/auth/login');

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await postData({
        email: values.email,
        password: values.password
      });

      if (response) {
        // Store user info in localStorage/sessionStorage if needed
        const userInfo = {
          id: response.id,
          fullName: response.fullName,
          email: response.email
        };
        
        if (values.remember) {
          localStorage.setItem('user', JSON.stringify(userInfo));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userInfo));
        }

        // Force navigation to admin page
        // window.location.href = '/admin';
        navigate("/admin");
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
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
              <Input 
                placeholder="Email" 
                className="form-input"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                placeholder="Password" 
                className="form-input"
                disabled={loading}
              />
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
              <Button 
                type="primary" 
                htmlType="submit" 
                className="login-btn"
                loading={loading}
                block
              >
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














// import { Form, Input, Button, Checkbox } from 'antd';
// import { GoogleOutlined, FacebookFilled, GithubOutlined, LinkedinFilled } from '@ant-design/icons';
// // import './login.scss';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../../assets/images/Nepal-Designers-Builders-Logo.png';

// const LoginPage = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const onFinish = (values: any) => {
//     console.log('Success:', values);
//     // Add your login logic here
//     navigate('/home'); // Navigate to home page after successful login
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <div className="content">
//           <div className="logo">

//             <Link to="/" className="logo-link">
//               <img src={logo} alt="Logo" className="logo" />
//             </Link>
//           </div>
//           {/* <h1>Welcome Back!</h1>
//           <p>Enter your credentials to access your account</p> */}
//         </div>
//       </div>

//       <div className="right-section">
//         <div className="form-container">
//           {/* <h2>Login to Your Account</h2> */}
//           <h2>LOGIN</h2>
          
//           <div className="social-buttons">
//             <Button shape="circle" icon={<GoogleOutlined />} />
//             <Button shape="circle" icon={<FacebookFilled />} />
//             <Button shape="circle" icon={<GithubOutlined />} />
//             <Button shape="circle" icon={<LinkedinFilled />} />
//           </div>
          
//           <p className="divider">or use your email account</p>

//           <Form
//             form={form}
//             name="login"
//             onFinish={onFinish}
//             layout="vertical"
//             className="login-form"
//           >
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[
//                 { required: true, message: 'Please input your email!' },
//                 { type: 'email', message: 'Please enter a valid email!' }
//               ]}
//             >
//               <Input placeholder="Email" className="form-input" />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[{ required: true, message: 'Please input your password!' }]}
//             >
//               <Input.Password placeholder="Password" className="form-input" />
//             </Form.Item>

//             <div className="form-options">
//               <Form.Item name="remember" valuePropName="checked" noStyle>
//                 <Checkbox>Remember me</Checkbox>
//               </Form.Item>
//               <Button type="link" className="forgot-password">
//                 Forgot Password?
//               </Button>
//             </div>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" className="login-btn">
//                 LOGIN
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
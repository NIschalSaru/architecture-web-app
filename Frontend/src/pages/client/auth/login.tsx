import { Form, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined, FacebookFilled, GithubOutlined, LinkedinFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import usePostAPI from '../../../hooks/usePostAPI';
import logo from '../../../assets/images/Nepal-Designers-Builders-Logo.png';
import { Cookie } from 'lucide-react';

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

// Utility function to check for authentication cookie
const isAuthenticated = () => {
  // Get the raw cookie string first to debug
  const rawCookies = document.cookie;
  console.log("Raw cookie string:", rawCookies);

  // Split and find our auth token
  const cookieArray = rawCookies.split(';').map(cookie => cookie.trim());
  console.log("Cookie array:", cookieArray);

  const hasAuthToken = cookieArray.some(cookie => {
    const [name] = cookie.split('=');
    const matches = name === 'authToken';
    console.log(`Checking cookie: ${cookie}, name: ${name}, matches: ${matches}`);
    return matches;
  });

  return hasAuthToken;
};
const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loading, postData } = usePostAPI<LoginResponse>('architecture-web-app/auth/login');

  // Check for authentication on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin/banner');
    }
  }, [navigate]);

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await postData({
        email: values.email,
        password: values.password,
      });

      if (response) {
        const isUserAuthenticated = isAuthenticated(); 
        console.log("Is User Authenticated:", isUserAuthenticated);
        // After login, check if the cookie was set by the server
        if (isAuthenticated()) {
          navigate('/admin/banner');
        }
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
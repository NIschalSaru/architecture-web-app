import { Form, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined, FacebookFilled, GithubOutlined, LinkedinFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
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
        localStorage.setItem('userId', response.id.toString());
        localStorage.setItem('fullName', response.fullName);
        localStorage.setItem('userEmail', response.email);
        
        localStorage.setItem('userData', JSON.stringify(response));
        navigate('/admin/banner');

      }
    } catch (error) {
      console.error('Login error:', error);
      // You might want to show an error message to the user here
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
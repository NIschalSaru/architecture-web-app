import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import './Login.scss';
import loginImg from '../../assets/svg/undraw_login.svg';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log('Success:', values);
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="illustration-wrapper">
          <div className="illustration-content">
            <h1>Welcome Back!</h1>
            <p>Enter your credentials to access your account</p>
            {/* You can add your illustration/image here */}

            {/* <div className="decoration-circle"></div> */}
            <img src={loginImg} alt='login Image'></img>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h2>LOG IN</h2>
            <p>Please login to continue</p>
          </div>
          
          <Form
            name="login-form"
            className="login-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                size="large"
                block
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
import { Form, Input, Button, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import usePostAPI from "../../../hooks/usePostAPI";
import logo from "../../../assets/images/LogoNew.png";
import bgSvg from "../../../assets/svg/bg.svg";
import wavePng from "../../../assets/images/wave.png";

interface LoginResponse {
  id: number;
  fullName: string;
  email: string;
  filepath: string | null;
  token: string;
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
  const { loading, postData } = usePostAPI<LoginResponse>(
    "architecture-web-app/auth/login"
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const redirectPath =
        localStorage.getItem("redirectPath") || "/admin/banner";
      localStorage.removeItem("redirectPath");
      navigate(redirectPath);
    }
  }, [navigate]);

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await postData({
        email: values.email,
        password: values.password,
      });

      if (response && response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("Id", response.id.toString());
        Cookies.set("authToken", response.token, {
          expires: values.remember ? 4 : undefined,
          secure: true,
          sameSite: "None",
          path: "/",
        });
        const redirectPath =
          localStorage.getItem("redirectPath") || "/admin/banner";
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>
        {/* Background SVG */}
        <div className="bg-illustration">
          <img src={bgSvg} alt="Background Illustration" className="bg-svg" />
        </div>

        {/* Wave overlay */}
        <div className="wave-overlay">
          <img src={wavePng} alt="Wave" className="wave-image" />
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
          <div className="welcome-header">
            <div className="user-avatar">
              <div className="avatar-circle">
                <div className="avatar-icon"></div>
              </div>
            </div>
            <h2>WELCOME</h2>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="email"
              label="Username"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <div className="input-wrapper">
                <div className="input-icon user-icon"></div>
                <Input
                  placeholder="Username"
                  className="form-input"
                  disabled={loading}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div className="input-wrapper">
                <div className="input-icon lock-icon"></div>
                <Input.Password
                  placeholder="Password"
                  className="form-input"
                  disabled={loading}
                />
              </div>
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
















// import { Form, Input, Button, Checkbox, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import Cookies from "js-cookie";
// import usePostAPI from "../../../hooks/usePostAPI";
// import logo from "../../../assets/images/LogoNew.png";
// import bgSvg from "../../../assets/svg/bg.svg";
// import wavePng from "../../../assets/images/wave.png";
// import { isAuthenticated } from "../../../utils";

// interface LoginResponse {
//   id: number;
//   fullName: string;
//   email: string;
//   filepath: string | null;
//   token: string;
//   message: string;
// }

// interface LoginFormValues {
//   email: string;
//   password: string;
//   remember?: boolean;
// }

// const LoginPage = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const { loading, postData, error } = usePostAPI<LoginResponse>(
//     "architecture-web-app/auth/login"
//   );
//   const inactivityTimer = useRef<number | null>(null); // Changed to number | null

//   useEffect(() => {
//     // Check authentication status on mount
//     if (isAuthenticated()) {
//       const redirectPath = sessionStorage.getItem("redirectPath") || "/admin/banner";
//       sessionStorage.removeItem("redirectPath");
//       navigate(redirectPath);
//     }

//     // Set up inactivity timer
//     const resetInactivityTimer = () => {
//       if (inactivityTimer.current) {
//         clearTimeout(inactivityTimer.current);
//       }
//       inactivityTimer.current = setTimeout(logoutOnInactivity, 30 * 60 * 1000); // 2 minutes
//     };

//     // Reset timer on user activity
//     const events = ["mousemove", "keydown", "scroll", "click"];
//     events.forEach((event) => {
//       window.addEventListener(event, resetInactivityTimer);
//     });

//     // Initial timer setup
//     resetInactivityTimer();

//     // Cleanup
//     return () => {
//       if (inactivityTimer.current) {
//         clearTimeout(inactivityTimer.current);
//       }
//       events.forEach((event) => {
//         window.removeEventListener(event, resetInactivityTimer);
//       });
//     };
//   }, [navigate]);

//   useEffect(() => {
//     if (error) {
//       message.error("Login failed. Please check your credentials.");
//     }
//   }, [error]);

//   const onFinish = async (values: LoginFormValues) => {
//     try {
//       const response = await postData({
//         email: values.email,
//         password: values.password,
//       });

//       if (response && response.token) {
//         // Store token in sessionStorage (clears on browser close)
//         sessionStorage.setItem("authToken", response.token);
//         sessionStorage.setItem("Id", response.id.toString());
//         // Set cookie with session duration if remembered, otherwise no expiration
//         Cookies.set("authToken", response.token, {
//           expires: values.remember ? 4 : undefined, // 4 days if remembered, session otherwise
//           secure: true,
//           sameSite: "None",
//           path: "/",
//         });
//         const redirectPath = sessionStorage.getItem("redirectPath") || "/admin/banner";
//         sessionStorage.removeItem("redirectPath");
//         navigate(redirectPath);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   const logoutOnInactivity = () => {
//     sessionStorage.removeItem("authToken");
//     sessionStorage.removeItem("Id");
//     Cookies.remove("authToken");
//     navigate("/login"); // Redirect to login page
//     message.info("Session expired due to inactivity.");
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <div className="logo">
//           <Link to="/" className="logo-link">
//             <img src={logo} alt="Logo" className="logo-img" />
//           </Link>
//         </div>
//         <div className="bg-illustration">
//           <img src={bgSvg} alt="Background Illustration" className="bg-svg" />
//         </div>
//         <div className="wave-overlay">
//           <img src={wavePng} alt="Wave" className="wave-image" />
//         </div>
//       </div>

//       <div className="right-section">
//         <div className="form-container">
//           <div className="welcome-header">
//             <div className="user-avatar">
//               <div className="avatar-circle">
//                 <div className="avatar-icon"></div>
//               </div>
//             </div>
//             <h2>WELCOME</h2>
//           </div>

//           <Form
//             form={form}
//             name="login"
//             onFinish={onFinish}
//             layout="vertical"
//             className="login-form"
//           >
//             <Form.Item
//               name="email"
//               label="Username"
//               rules={[
//                 { required: true, message: "Please input your email!" },
//                 { type: "email", message: "Please enter a valid email!" },
//               ]}
//             >
//               <div className="input-wrapper">
//                 <div className="input-icon user-icon"></div>
//                 <Input
//                   placeholder="Username"
//                   className="form-input"
//                   disabled={loading}
//                 />
//               </div>
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[{ required: true, message: "Please input your password!" }]}
//             >
//               <div className="input-wrapper">
//                 <div className="input-icon lock-icon"></div>
//                 <Input.Password
//                   placeholder="Password"
//                   className="form-input"
//                   disabled={loading}
//                 />
//               </div>
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
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="login-btn"
//                 loading={loading}
//                 block
//               >
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
















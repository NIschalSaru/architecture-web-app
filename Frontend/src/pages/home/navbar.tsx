import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
} from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteList } from "../../routes/routeList";
import Logo from "../../assets/images/Nepal-Designers-Builders-Logo.png";
import { MenuOutlined, UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../API/auth";
import fb from "../../assets/svg/facebook.svg";
import yt from "../../assets/svg/youtube.svg";
import ld from "../../assets/svg/linkedin.svg";
import ig from "../../assets/svg/instagram.svg";

const { Header } = Layout;

const NavbarComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const validator = localStorage.getItem('validator');

  const showDrawer = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    localStorage.clear();
    isAuthenticated()
      ? localStorage.getItem("isAdmin") === "true"
        ? navigate("/admin")
        : navigate("/home")
      : navigate("/home");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const menu = (
    <Menu>
      { validator ?
        <Menu.Item>
          <Link to="/admin">Admin Panel</Link>
        </Menu.Item> : <></>
      }
      <Menu.Item>
        <Link to="/changePassword">Change Password</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <a href="tel:+01 12345567890">
                <PhoneOutlined />  +977-9851340040
              </a>
              <a href="mailto:demo@gmail.com">
                <MailOutlined />  contact@ndnb.com.np
              </a>
              <span>
                <EnvironmentOutlined /> Kalanki, Kathmandu
              </span>
            </div>
            <div className="social-links">
              <a href="#" className="facebook">
                  <img src={fb} alt="facebook"></img>
              </a>
              <a href="#" className="Instagram"><img src={ig} alt="Instagram"></img></a>
              <a href="#" className="Youtube"><img src={yt} alt="Youtube"></img></a>
              <a href="#" className="linkedin"><img src={ld} alt="Linkedin"></img></a>
            </div>
          </div>
        </div>
      </div>

      <Header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-logo">
              <Link to="/" onClick={scrollToTop}>
                <img src={Logo} alt="Nepal Designers and Builders Logo" />
              </Link>
            </div>
            
            <ul className="header-list">
              {RouteList.map((route) => (
                <li key={route.label} className="menuButtonListDesk">
                  <Link to={route.path} onClick={scrollToTop}>
                    {route.label}
                  </Link>
                </li>
              ))}
              <li className="menuButtonList">
                <Button className="menuButton" type="text" onClick={showDrawer}>
                  <MenuOutlined />
                </Button>
              </li>
            </ul>

            <div className="auth-section">
              {isAuthenticated() ? (
                <Dropdown overlay={menu} trigger={["click"]} className="dashboard-logout">
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar size={40} shape="circle" icon={<UserOutlined />} />
                  </a>
                </Dropdown>
              ) : (
                <Link to="/login">
                  <Button size="large" ghost>
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <Drawer
          placement="right"
          onClose={showDrawer}
          visible={visible}
          style={{ zIndex: 99999 }}
        >
          <ul className="header-list-mobile">
            {RouteList.map((route) => (
              <li key={route.label}>
                <Link to={route.path} onClick={scrollToTop}>
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </Drawer>
      </Header>
    </>
  );
};

export default NavbarComponent;
















// import {
//   Avatar,
//   Button,
//   Drawer,
//   Dropdown,
//   Layout,
//   Menu,
// } from "antd";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { RouteList } from "../../routes/routeList";

// import Logo from "../../assets/images/Nepal-Designers-Builders-Logo.png";


// import { MenuOutlined, UserOutlined } from "@ant-design/icons";
// import { isAuthenticated } from "../../API/auth";

// const { Header } = Layout;
// const NavbarComponent: React.FC = () => {


//   const location = useLocation();
//   const navigate = useNavigate();

//   const [visible, setVisible] = useState(false);
//   const showDrawer = () => {
//     setVisible(!visible);
//   };

//   const validator = localStorage.getItem('validator');
//   console.log(validator,"basvb")

//   useEffect(() => {
//     setVisible(false);
//   }, [location]);

//   useEffect(() => {
//     window.addEventListener("scroll", isSticky);
//     return () => {
//       window.removeEventListener("scroll", isSticky);
//     };
//   });

//   const isSticky = () => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const header: any = document.querySelector(".header");
//     const scrollTop = window.scrollY;
//     scrollTop >= 250
//       ? header.classList.add("is-sticky")
//       : header.classList.remove("is-sticky");
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     isAuthenticated()
//       ? localStorage.getItem("isAdmin") === "true"
//         ? navigate("/admin")
//         : navigate("/home")
//       : navigate("/home");
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };
//   const menu = (
//     <Menu>
//       { validator ?
//         <Menu.Item>
//           <Link to="/admin">"navigation.admin"</Link>
//         </Menu.Item> :<></>
//       }
//       <Menu.Item>
//         <Link to="/changePassword">"navigation.changePassword"</Link>
//       </Menu.Item>
//       <Menu.Item key="1" onClick={handleLogout}>
//         "navigation.logout"
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Header className="header">
//       <div className="container">
//         <div className="header-wrapper">
//           <div className="header-logo">
//             <Link to="/" onClick={scrollToTop}>
//               <img src={Logo} alt="Nepal Designers and Builders Logo" />
//             </Link>
//           </div>
//           <ul className="header-list">
//             {RouteList.map((route) => (
//               <li key={route.label} className="menuButtonListDesk">
//                 <Link to={route.path} onClick={scrollToTop}>
//                   {route.label}
//                 </Link>
//               </li>
//             ))}
//             <li className="menuButtonList">
//               <Button className="menuButton" type="text" onClick={showDrawer}>
//                 <MenuOutlined />
//               </Button>
//             </li>
//             <li className="menuButtonListDesk">
//               {isAuthenticated() ? (
//                 <>
//                   <Dropdown
//                     overlay={menu}
//                     trigger={["click"]}
//                     className="dashboard-logout"
//                   >
//                     <a onClick={(e) => e.preventDefault()}>
//                       <Avatar
//                         size={40}
//                         shape={"circle"}
//                         icon={<UserOutlined />}
//                       />
//                     </a>
//                   </Dropdown>
//                 </>
//               ) : (
//                 <Link to="/login">
//                   <Button size="large" ghost>
//                     login
//                   </Button>
//                 </Link>
//               )}
//             </li>
//             <li className="menuButtonList">
//               {isAuthenticated() ? (
//                 <Dropdown
//                   overlay={menu}
//                   trigger={["click"]}
//                   className="dashboard-logout"
//                 >
//                   <a onClick={(e) => e.preventDefault()}>
//                     <Avatar
//                       size={40}
//                       shape={"circle"}
//                       icon={<UserOutlined />}
//                     />
//                   </a>
//                 </Dropdown>
//               ) : (
//                 <Link to="/login">
//                   <Button size="large" ghost>
//                     login
//                   </Button>
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>

//       <Drawer
//         placement="right"
//         onClose={showDrawer}
//         visible={visible}
//         style={{ zIndex: 99999 }}
//       >
//         <ul className="header-list-mobile">
//           {RouteList.map((route) => (
//             <li key={route.label}>
//               <Link to={route.path} onClick={scrollToTop}>
//                 {route.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </Drawer>
//     </Header>
//   );
// };

// export default NavbarComponent;
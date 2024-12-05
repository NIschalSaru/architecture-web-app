import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteList } from "../../routes/routeList";

import Logo from "../../assets/images/Nepal-Designers-Builders-Logo.png";


import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../API/auth";

const { Header } = Layout;
const NavbarComponent: React.FC = () => {


  const location = useLocation();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  const validator = localStorage.getItem('validator');
  console.log(validator,"basvb")

  useEffect(() => {
    setVisible(false);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const header: any = document.querySelector(".header");
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
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
          <Link to="/admin">"navigation.admin"</Link>
        </Menu.Item> :<></>
      }
      <Menu.Item>
        <Link to="/changePassword">"navigation.changePassword"</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        "navigation.logout"
      </Menu.Item>
    </Menu>
  );

  return (
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
            <li className="menuButtonListDesk">
              {isAuthenticated() ? (
                <>
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    className="dashboard-logout"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Avatar
                        size={40}
                        shape={"circle"}
                        icon={<UserOutlined />}
                      />
                    </a>
                  </Dropdown>
                </>
              ) : (
                <Link to="/login">
                  <Button size="large" ghost>
                    login
                  </Button>
                </Link>
              )}
            </li>
            <li className="menuButtonList">
              {isAuthenticated() ? (
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  className="dashboard-logout"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar
                      size={40}
                      shape={"circle"}
                      icon={<UserOutlined />}
                    />
                  </a>
                </Dropdown>
              ) : (
                <Link to="/login">
                  <Button size="large" ghost>
                    "navigation.login"
                  </Button>
                </Link>
              )}
            </li>
          </ul>
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
  );
};

export default NavbarComponent;
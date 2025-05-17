import {
  FileImageOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/images/ndbn-logo-white.png";
import { handleSignOut } from "../../utils";

const items = [
  {
    key: "banner",
    icon: <HomeOutlined />,
    label: "Banner Settings",
  },
  {
    key: "testimonials",
    icon: <MessageOutlined />,
    label: "Testimonial Settings",
  },
  {
    key: "Projects",
    icon: <FileImageOutlined />,
    label: "Project Settings",
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: "User Settings",
  },
];

const DashboardContainer = () => {
  const { Header, Content, Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("banner"); // Default to banner

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentPath = pathSegments[pathSegments.length - 1];
    setSelectedMenu(currentPath || "banner");
  }, [location]);

  const handleMenuChange = (e: { key: string; keyPath: string[] }) => {
    setSelectedMenu(e.key);
    navigate(`/admin/${e.key}`);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div style={{ display: "flex", alignItems: "center" }}>
          <UserOutlined style={{ marginRight: "8px" }} />
          <span>Account Setting</span>
        </div>
      </Menu.Item>
      <Menu.Item onClick={() => handleSignOut(navigate)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LogoutOutlined style={{ marginRight: "8px" }} />
          <span>Logout</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="dashboard">
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
      >
        <Link
          to="/"
          className={`dashboard-logo ${
            collapsed ? "dashboard-logo-collapsed" : ""
          }`}
        >
          <img src={Logo} alt="Logo" />
        </Link>
        <hr />
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]}
          mode="inline"
          items={items}
          onClick={handleMenuChange}
          className="dashboard-menu ant-layout-sider"
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
          <div
            className="dashboard-nav"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            <div
              className="dashboard-collapse-icon"
              style={{
                marginRight: "auto",
                cursor: "pointer",
              }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <span>Admin</span>
            <div>
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                overlayStyle={{
                  right: "2%",
                  top: "10%",
                  width: "200px",
                }}
              >
                <a onClick={handleDropdownClick} className="icon-spacing">
                  <Avatar size={40} shape="circle" icon={<UserOutlined />} />
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardContainer;

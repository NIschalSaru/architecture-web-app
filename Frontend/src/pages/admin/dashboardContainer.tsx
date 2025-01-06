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
import { Link, useNavigate } from "react-router-dom";
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
    key: "gallery",
    icon: <FileImageOutlined />,
    label: "Gallery",
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: "Manage Users",
  },
];

const DashboardContainer = () => {
  const { Title } = Typography;
  const { Header, Content, Sider } = Layout;

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const handleMenuChange = (e) => {
    const path = e.keyPath.reverse().toString().replace(",", "/");
    setSelectedMenu(e.key);
    navigate(`/admin/${path}`);
  };

  const handleDropdownClick = (e) => {
    // Prevent default behavior to stop link redirection
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

  useEffect(() => {
    if (location) {
      const pathname = location.pathname?.replace("/admin/", "");
      setSelectedMenu(pathname);
    }
  }, []);

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
          <img src={Logo} alt="Akarui Shorai Logo" />
        </Link>
        <hr />
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]}
          mode="inline"
          items={items}
          onClick={handleMenuChange}
          className="dashboard-menu ant-layout-sider "
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
          </div>
        </Header>
        {/* <Content className="dashboard-content">
          <Outlet />
        </Content> */}
      </Layout>
    </Layout>
  );
};

export default DashboardContainer;

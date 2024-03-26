import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  BookOutlined,
} from "@ant-design/icons";
import UserLink from "./UserLink";
import { MenuProps } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const history = useHistory();

  const [current, setCurrent] = useState(history.location.pathname);

  const menuItems: MenuProps["items"] = [
    {
      label: "Home",
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Authors",
      key: "/authors",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: "Books",
      key: "/books",
      icon: <BookOutlined />,
    },
    {
      key: "SubMenu",
      icon: <UserLink />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    const key = e.key === "/" ? "" : e.key;
    history.push(key);
    setCurrent(key);
  };

  return (
    <Header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">Brand Logo</span>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          className="border-none"
          items={menuItems}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </div>
    </Header>
  );
};

export default Navbar;

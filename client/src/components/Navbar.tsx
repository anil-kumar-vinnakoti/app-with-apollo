import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  BookOutlined,
} from "@ant-design/icons";
import UserLink from "./UserDropdown";
import { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  const [current, setCurrent] = useState("");

  const menuItems: MenuProps["items"] = [
    {
      label: "Home",
      key: "",
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
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    const key = e.key === "/" ? "" : e.key;
    history.push(key);
    setCurrent(key);
  };

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <Header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-lg font-bold">Brand Logo</span>
        <span className="flex">
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            className="border-none"
            items={menuItems}
            onClick={onClick}
            selectedKeys={[current]}
          />
          <span className="ml-4">
            <UserLink />
          </span>
        </span>
      </div>
    </Header>
  );
};

export default Navbar;

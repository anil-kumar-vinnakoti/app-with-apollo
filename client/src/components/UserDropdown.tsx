import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Logout from "./Logout";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Logout />,
  },
];

const UserDropdown = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <UserOutlined style={{ fontSize: "20px" }} />
      </Space>
    </a>
  </Dropdown>
);

export default UserDropdown;

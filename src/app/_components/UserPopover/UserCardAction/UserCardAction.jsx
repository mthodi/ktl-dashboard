import { ASSET_AVATARS } from "@/_utilities/paths";
import {
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Menu, Typography } from "antd";

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem("Profile", "profile", <UserOutlined />),
];

export const UserCardAction = () => {
  const handlClick = async (opt) => {
    // No-op: authentication removed
  };

  return (
    <Card
      classNames={{ body: "p-0" }}
      className="w-[250px] overflow-hidden"
      bordered={false}
    >
      <div className="flex flex-col items-center text-center p-4">
        <Avatar src={`${ASSET_AVATARS}/avatar9.jpg`} size={60} />
        <div>
          <Typography.Title level={5} className="mb-1">
            Guest User
          </Typography.Title>
          <Typography.Text type="secondary">
            No authentication required
          </Typography.Text>
        </div>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        className="shadow-none"
        onClick={(opt) => handlClick(opt)}
      />
    </Card>
  );
};

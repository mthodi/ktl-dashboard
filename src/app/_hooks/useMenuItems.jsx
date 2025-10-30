import { GlobalOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export const useMenuItems = () => {
  return [
    {
      label: (
        <Link to={"/dashboards/countries"}>
          Countries
        </Link>
      ),
      key: "countries",
      icon: <GlobalOutlined />,
    },
    {
      label: (
        <Link to={"/about"}>
          About
        </Link>
      ),
      key: "about",
      icon: <InfoCircleOutlined />,
    },
  ];
};

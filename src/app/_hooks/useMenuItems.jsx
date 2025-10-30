import { GlobalOutlined } from '@ant-design/icons';
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
  ];
};

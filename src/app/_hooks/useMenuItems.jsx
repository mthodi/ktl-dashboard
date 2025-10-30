import { useTranslation } from "react-i18next";
import { RiDashboard2Fill } from "react-icons/ri";
import { GlobalOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export const useMenuItems = () => {
  const { t } = useTranslation();
  const subMenuTheme = "light";
  return [
    {
      label: t("sidebar.menuGroup.main"),
      key: "main",
      theme: subMenuTheme,
      children: [
        {
          label: t("sidebar.menu.dashboards"),
          key: "dashboards",
          icon: <RiDashboard2Fill />,
          theme: subMenuTheme,
          children: [
            {
              label: (
                <Link to={"/dashboards/countries"}>
                  Countries
                </Link>
              ),
              key: "countries",
              icon: <GlobalOutlined />,
            },
          ],
        },
      ],
    },
  ];
};

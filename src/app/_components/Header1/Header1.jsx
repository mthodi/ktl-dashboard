import { SidebarToggleButton } from "@/_components/SidebarToggleButton";
import { theme } from "antd";


export function Header1() {
  const { token } = theme.useToken();
  return (
    <div className="relative flex flex-1 items-center">
      <div className="-ml-3 mr-6">
        <SidebarToggleButton />
      </div>
      <div className="flex-1 max-w-sm">
      </div>
    </div>
  );
}

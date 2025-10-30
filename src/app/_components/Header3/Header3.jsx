import { WieldyContainer } from "@wieldy/components";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import Menubar from "./Menubar";
import Topbar from "./Topbar";

const Header3 = () => {
  return (
    <div className="relative flex-1 xl:before:block xl:before:absolute xl:before:right-[8vw] xl:before:top-[-218px] xl:before:h-[350px] xl:before:w-[280px] xl:before:bg-black/10 xl:before:dark:bg-white/20 xl:before:rotate-45 xl:before:rounded-b-[140px]">
      <Topbar />
      <div className="pt-6">
        <WieldyContainer>
          <div className="flex items-center leading-[64px]">
            <div className="flex">
              <Link to="/" className="inline-flex mr-6">
                <Typography.Title level={3} className="m-0 whitespace-nowrap">
                  KTL Dashboard
                </Typography.Title>
              </Link>
            </div>
            <Menubar />


          </div>
        </WieldyContainer>
      </div>
    </div>
  );
};

export { Header3 };

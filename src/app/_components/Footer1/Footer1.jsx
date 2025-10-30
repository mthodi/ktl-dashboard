import { Typography } from "antd";
import { currentYear } from "../../_utilities/data";

const Footer1 = () => {
  return (
    <div className="flex text-center items-center mx-auto px-8 max-w-[1400px]">
      <Typography.Text>{`Martin ${currentYear}`}</Typography.Text>
    </div>
  );
};
export { Footer1 };

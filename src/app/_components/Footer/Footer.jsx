import { Typography } from "antd";
import { currentYear } from "../../_utilities/data";

const Footer = () => {
  return (
    <div className="flex items-center">
      <Typography.Text>{`Martin ${currentYear}`}</Typography.Text>
    </div>
  );
};
export { Footer };

import { LAYOUTS } from "@/_layouts";
import { Drawer, Space } from "antd";
import React from "react";
import { RiSettings2Line } from "react-icons/ri";
import { useApp } from "../AppProvider/hooks";
import { FooterOptions } from "./FooterOptions";
import { HeaderOptions } from "./HeaderOptions";
import { LayoutOptions } from "./LayoutOptions";
import { LocaleOptions } from "./LocaleOptions";
import { MainThemeOptions } from "./MainThemeOptions";
import { SidebarOptions } from "./SidebarOptions";
import { ThemeModeOption } from "./ThemeModeOptions";

const Customizer = () => {
  const { direction, customizerVisibility, setCustomizerVisibility } = useApp();

  const showCustomizer = React.useCallback(() => {
    setCustomizerVisibility(true);
  }, [setCustomizerVisibility]);

  const closeCustomizer = React.useCallback(() => {
    setCustomizerVisibility(false);
  }, [setCustomizerVisibility]);

  return (
    <>
      <Drawer
        title="Customizer"
        width={350}
        onClose={closeCustomizer}
        open={customizerVisibility}
        placement={direction === "rtl" ? "left" : "right"}
      >
        <Space size={24} direction="vertical" className="flex">
          <LayoutOptions layouts={LAYOUTS} />
          <ThemeModeOption />
          <MainThemeOptions />
          <HeaderOptions />
          <SidebarOptions />
          <FooterOptions />
          <LocaleOptions />
        </Space>
      </Drawer>
    </>
  );
};

export { Customizer };

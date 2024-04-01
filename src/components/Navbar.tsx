import {
  getTheme,
  setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
import {
  Avatar,
  Button,
  ListPropTypes,
  ResponsivePopoverDomRef,
  ShellBar,
  ShellBarDomRef,
  ShellBarItem,
  ShellBarItemPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { useEffect, useRef, useState } from "react";
import ThemeSwitchPopover from "./ThemeSwitchPopover";
import { useSidebar } from "../hooks/useSidebar";
import NotificationPopover from "./NotificationPopover";
import {
  ShellBarNotificationsClickEventDetail,
  ShellBarProfileClickEventDetail,
} from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ProfilePopover from "./ProfilePopover";
import { useNavigate } from "react-router-dom";
import "../navbar.css";

type NavbarProps = {
  companyName: string;
  companyLogo: string;
  productName: string;
  isNotifiction?: boolean;
  notificationCount?: string;
  userName: string;
  userImage: string;
  themeSwitch: (theme: string) => void;
};

const Navbar = ({
  companyLogo,
  companyName,
  productName,
  isNotifiction,
  notificationCount,
  userName,
  userImage,
  themeSwitch,
}: NavbarProps) => {
  const [currentTheme, setCurrentTheme] = useState(getTheme);
  const popoverRef = useRef<ResponsivePopoverDomRef | null>(null);
  const notifyRef = useRef<ResponsivePopoverDomRef | null>(null);
  const profileref = useRef<ResponsivePopoverDomRef | null>(null);
  const { setSidebarCollapsed } = useSidebar();
  const navigate = useNavigate();

  const handleThemeSwitch: ListPropTypes["onSelectionChange"] = (e) => {
    const { targetItem } = e.detail;
    const selectedTheme: string = targetItem.dataset.key!;
    setTheme(targetItem.dataset.key!);
    setCurrentTheme(targetItem.dataset.key!);
    localStorage.setItem("Theme", selectedTheme);
    if (selectedTheme && themeSwitch) {
      themeSwitch(selectedTheme);
    }
  };
  const handleThemeSwitchItemClick: ShellBarItemPropTypes["onClick"] = (e) => {
    popoverRef.current?.showAt(e.detail.targetRef);
  };

  const handleNotificationClick = (
    event: Ui5CustomEvent<
      ShellBarDomRef,
      ShellBarNotificationsClickEventDetail
    >,
  ) => {
    notifyRef.current?.showAt(event.detail.targetRef);
  };

  const handleProfileClick = (
    event: Ui5CustomEvent<ShellBarDomRef, ShellBarProfileClickEventDetail>,
  ) => {
    profileref.current?.showAt(event.detail.targetRef);
  };

  const handleProductSwitchClick = () => {
    navigate("/");
  };

  const handleNavMenuButtonclick = () => {
    setSidebarCollapsed((isCollapseSidebar) => !isCollapseSidebar);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const storedTheme: string | null = localStorage.getItem("Theme");
    if (storedTheme) {
      setCurrentTheme(storedTheme);
      setTheme(storedTheme);
    }
  }, []);

  return (
    <>
      <ShellBar
        className="shellbar_custom"
        style={{
          position: "relative",
          marginTop: "0.2rem",
          marginLeft: "0.4rem",
          borderRadius: "0.50rem",
          width: "calc(100dvw - 0.75rem)",
        }}
        logo={
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={companyLogo}
            alt={`${companyName} Logo`}
          />
        }
        primaryTitle={productName}
        profile={
          <Avatar className="h-10 w-10 cursor-pointer rounded-full outline-none">
            <img
              className="h-full w-full rounded-full object-cover"
              src={userImage}
              alt={userName}
            />
          </Avatar>
        }
        showNotifications={isNotifiction}
        onNotificationsClick={(
          event: Ui5CustomEvent<
            ShellBarDomRef,
            ShellBarNotificationsClickEventDetail
          >,
        ) => handleNotificationClick(event)}
        onProfileClick={(
          e: Ui5CustomEvent<
            ShellBarDomRef,
            ShellBarNotificationsClickEventDetail
          >,
        ) => {
          handleProfileClick(e);
        }}
        onProductSwitchClick={() => {
          handleProductSwitchClick();
        }}
        onLogoClick={handleLogoClick}
        startButton={
          <Button
            style={{
              position: "absolute",
              left: "0.6rem",
            }}
            className="mr-4"
            design="Emphasized"
            icon="menu2"
            onClick={handleNavMenuButtonclick}
          />
        }
        notificationsCount={notificationCount}
        showProductSwitch
      >
        <ShellBarItem
          icon={paletteIcon}
          text="Change Theme"
          onClick={handleThemeSwitchItemClick}
        />
      </ShellBar>

      <ThemeSwitchPopover
        currentTheme={currentTheme}
        popoverRef={popoverRef}
        handleThemeSwitch={handleThemeSwitch}
      />

      <NotificationPopover notifyRef={notifyRef} />
      <ProfilePopover profileref={profileref} />
    </>
  );
};

export default Navbar;

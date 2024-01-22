"use client";
import React, { useState, useEffect } from "react";
import { SideNavigation, SideNavigationItem } from "@ui5/webcomponents-react";
import MainScreen from "./MainScreen";

import dashboard from "@ui5/webcomponents-icons/dist/bbyd-dashboard.js";
import dataLoad from "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import control from "@ui5/webcomponents-icons/dist/settings.js";
import group from "@ui5/webcomponents-icons/dist/group-2.js";
import { useRouter } from "next/navigation";

const SideNav = ({ showSideNav }: { showSideNav: boolean }) => {
  const router = useRouter();
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);

  const handleOnClick = (path: string) => {
    router.push(path);
    setSelectedNavItem(path);
  };

  return (
    <div className="  h-auto w-auto flex">
      <div className="h-auto">
        <SideNavigation
          collapsed={showSideNav}
          className="h-[87.50vh] overflow-hidden sticky top-0 left-0 p-1  -mt-1 ml-3 mr-3 rounded-lg"
        >
          <SideNavigationItem
            className={`text-red-700 ${selectedNavItem === "#dashboard" ? "selected" : ""}`}
            icon={dashboard}
            text="Dashboard"
            onClick={() => handleOnClick("#dashboard")}
          />
          <SideNavigationItem
            className={`text-red-700 ${selectedNavItem === "#dataload" ? "selected" : ""}`}
            icon={dataLoad}
            text="Data Loading"
            onClick={() => handleOnClick("#dataload")}
          />
          <SideNavigationItem
            className={`text-red-700 ${selectedNavItem === "#control" ? "selected" : ""}`}
            icon={control}
            text="Control Attribute"
            onClick={() => handleOnClick("#control")}
          />
          <SideNavigationItem
            className={`text-red-700 ${selectedNavItem === "#group" ? "selected" : ""}`}
            icon={group}
            text="Control Family"
            onClick={() => handleOnClick("#group")}
          />
        </SideNavigation>
      </div>
      <div className="h-[85.50vh] w-[95%] overflow-hidden bg-white text-black rounded-lg mr-4">
        <MainScreen selectedNavItem={selectedNavItem} />
      </div>
    </div>
  );
};

export default SideNav;

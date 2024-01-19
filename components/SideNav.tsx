import React from "react";
import { SideNavigation, SideNavigationItem } from "@ui5/webcomponents-react";

import dashboard from "@ui5/webcomponents-icons/dist/bbyd-dashboard.js";
import dataLoad from "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import control from "@ui5/webcomponents-icons/dist/settings.js";
import group from "@ui5/webcomponents-icons/dist/group-2.js";

const SideNav = ({ showSideNav }: { showSideNav: boolean }) => {
	return (
		<div className="">
			<SideNavigation
				collapsed={showSideNav}
				className="h-[87.50vh] overflow-hidden sticky top-0 left-0 p-1  -mt-1 ml-3 mr-3 rounded-lg">
				<SideNavigationItem
					className="text-red-700 "
					icon={dashboard}
					text="Dashboard"
				/>
				<SideNavigationItem
					icon={dataLoad}
					text="Data Loading"
				/>
				<SideNavigationItem
					className="flex items-center justify-center"
					icon={control}
					text="Control Attribute"
				/>
				<SideNavigationItem
					icon={group}
					text="Control Familiy"
				/>
			</SideNavigation>
		</div>
	);
};

export default SideNav;

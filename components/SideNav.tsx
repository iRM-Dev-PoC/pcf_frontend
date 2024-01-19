import React from "react";
import { SideNavigation, SideNavigationItem } from "@ui5/webcomponents-react";

import dashboard from "@ui5/webcomponents-icons/dist/bbyd-dashboard.js";
import dataLoad from "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import control from "@ui5/webcomponents-icons/dist/settings.js";
import group from "@ui5/webcomponents-icons/dist/group-2.js";

const SideNav = () => {
	return (
		<>
			<SideNavigation>
				<SideNavigationItem
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
		</>
	);
};

export default SideNav;

import { Dispatch, SetStateAction } from "react";

export type SidebarContextType = {
	isSidebarCollapsed: boolean;
	setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

export type PathContextType = string;

import { Dispatch, SetStateAction } from "react";

export type SidebarContextType = {
	isSidebarCollapsed: boolean;
	setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

export type PathContextType = string;

export type User = {
	id: number;
	name: string;
	email: string;
	role: string;
	permissions: Permission;
};

export type Permission = {
	controlAttribute: boolean;
	controlFamily: boolean;
	controlLogic: boolean;
	dashboard: boolean;
	dataLoad: boolean;
	report: boolean;
	roles: boolean;
	typeOfcontrol: boolean;
};

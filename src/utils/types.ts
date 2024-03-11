import { Dispatch, SetStateAction } from "react";

type SidebarContextType = {
	isSidebarCollapsed: boolean;
	setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

type PathContextType = string;

type User = {
	id: number;
	name: string;
	email: string;
	role: string;
	permissions: Permission;
};

type Permission = {
	controlAttribute: boolean;
	controlFamily: boolean;
	controlLogic: boolean;
	dashboard: boolean;
	dataLoad: boolean;
	report: boolean;
	roles: boolean;
	typeOfcontrol: boolean;
};

type SignInProps = {
	setIsLoggedIn: (isLoggedIn: boolean) => void;
};

type SignInFormData = {
	username: string;
	password: string;
};

type logInFuncProps = {
	loginValues: { username: string; password: string };
	setError: (error: string | null) => void;
	setLoading: (loading: boolean) => void;
};

type webComponentsReactProps = {
	showOverlay: boolean;
};

type SimulationDetailsDataType = {
	id: string;
	control_attribute_name: string;
	report_name: string;
	sync_at: string;
	synced_by: string;
	is_simulated: boolean;
	simulate_at: string;
	simulated_by: string;
};

export type {
	SignInProps,
	SignInFormData,
	logInFuncProps,
	User,
	Permission,
	PathContextType,
	SidebarContextType,
	webComponentsReactProps,
	SimulationDetailsDataType,
};

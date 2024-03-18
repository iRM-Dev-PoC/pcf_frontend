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
	setIsForgotPassword: (isForgotPassword: boolean) => void;
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

type ChartDataItem = {
	name: string;
	users: number;
};

type LineChartDataItem = {
	name: string;
	sessions: number;
	users: number;
	volume: number;
};

type ResetPasswordFormData = {
	password: string;
	repeatPassword: string;
};

type resetPasswordFuncProps = {
	resetPasswordValues: { password: string; repeatPassword: string };
	setError: (error: string | null) => void;
	setLoading: (loading: boolean) => void;
};

type OtpInputProps = {
	otp: string;
};

type EmailInputProps = {
	email: string;
};

type uploadFileType = {
	data: FormData;
}

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
	ChartDataItem,
	LineChartDataItem,
	ResetPasswordFormData,
	resetPasswordFuncProps,
	OtpInputProps,
	EmailInputProps,
	uploadFileType,
};

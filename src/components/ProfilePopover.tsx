import {
	Button,
	ResponsivePopover,
	ResponsivePopoverDomRef,
} from "@ui5/webcomponents-react";
import { MutableRefObject } from "react";
import { logOut } from "../lib/auth";

type ProfilePopoverProps = {
	profileref: MutableRefObject<ResponsivePopoverDomRef | null>;
};

const handleLogout = async () => {
	await logOut();
};

const ProfilePopover = ({ profileref }: ProfilePopoverProps) => {
	return (
		<ResponsivePopover
			ref={profileref}
			className="popover">
			<Button
				icon="log"
				onClick={handleLogout}
				design="Attention">
				Logout
			</Button>
		</ResponsivePopover>
	);
};

export default ProfilePopover;

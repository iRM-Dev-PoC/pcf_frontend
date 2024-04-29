import {
    Button,
    List,
    ResponsivePopover,
    ResponsivePopoverDomRef,
} from "@ui5/webcomponents-react";
import { MutableRefObject } from "react";
import { logOut } from "../lib/auth";
import { useNavigate } from "react-router-dom";

type ProfilePopoverProps = {
    profileRef: MutableRefObject<ResponsivePopoverDomRef | null>;
};

const ProfilePopover = ({ profileRef }: ProfilePopoverProps) => {
    const navigate = useNavigate();
    const handleChangePassword = () => {
        navigate("/resetPassword");
    };
    const handleLogout = async () => {
        await logOut();
    };
    return (
        <ResponsivePopover ref={profileRef}>
            <List>
                <div className="space-y-2">
                    <div>
                        <Button
                            className="w-full text-center"
                            icon="log"
                            onClick={handleLogout}
                            design="Attention"
                        >
                            Sign Out
                        </Button>
                    </div>
                    <div>
                        <Button
                            className="w-full"
                            icon="key"
                            design="Emphasized"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </Button>
                    </div>
                </div>
            </List>
        </ResponsivePopover>
    );
};

export default ProfilePopover;

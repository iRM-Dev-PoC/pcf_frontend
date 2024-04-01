import {
  Button,
  List,
  ResponsivePopover,
  ResponsivePopoverDomRef,
  StandardListItem,
} from "@ui5/webcomponents-react";
import { MutableRefObject } from "react";
import { logOut } from "../lib/auth";
import { useNavigate } from "react-router-dom";

type ProfilePopoverProps = {
  profileref: MutableRefObject<ResponsivePopoverDomRef | null>;
};

const ProfilePopover = ({ profileref }: ProfilePopoverProps) => {
  const navigate = useNavigate();
  const handleChangePassword = () => {
    navigate("/resetPassword");
  };
  const handleLogout = async () => {
    await logOut();
  };
  return (
    <ResponsivePopover ref={profileref} className="popover">
      <List>
        <StandardListItem>
          <Button
            className="text-center"
            icon="log"
            onClick={handleLogout}
            design="Attention"
          >
            Sign Out
          </Button>
        </StandardListItem>
        <StandardListItem>
          <Button icon="key" design="Emphasized" onClick={handleChangePassword}>
            Change Password
          </Button>
        </StandardListItem>
      </List>
    </ResponsivePopover>
  );
};

export default ProfilePopover;

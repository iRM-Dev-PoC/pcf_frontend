import {
    List,
    ListMode,
    StandardListItem,
    ResponsivePopover,
    ResponsivePopoverDomRef,
} from "@ui5/webcomponents-react";
import { MutableRefObject } from "react";

const NOTIFICATIONS = [
    { id: 1, text: "Notification 1" },
    { id: 2, text: "Notification 2" },
    { id: 3, text: "Notification 3" },
    { id: 4, text: "Notification 4" },
    { id: 5, text: "Notification 5" },
];

type NotificationPopoverProps = {
    notifyRef: MutableRefObject<ResponsivePopoverDomRef | null>;
};

const NotificationPopover = ({ notifyRef }: NotificationPopoverProps) => {
    return (
        <ResponsivePopover ref={notifyRef}>
            <List
                headerText="Notifications"
                mode={ListMode.SingleSelect}
                onItemClick={() => {}}
            >
                {NOTIFICATIONS.map((notification) => (
                    <StandardListItem key={notification.id}>
                        {notification.text}
                    </StandardListItem>
                ))}
            </List>
        </ResponsivePopover>
    );
};

export default NotificationPopover;

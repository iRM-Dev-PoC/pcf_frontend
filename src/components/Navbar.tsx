import NotificationPopover from "@/components/NotificationPopover";
import ProductSwitchModal from "@/components/ProductSwitchModal";
import ProfilePopover from "@/components/ProfilePopover";
import ThemeSwitchPopover from "@/components/ThemeSwitchPopover";
import "@/css/navbar.css";
import { useSidebar } from "@/hooks/useSidebar";
import {
    getTheme,
    setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import {
    ShellBarNotificationsClickEventDetail,
    ShellBarProfileClickEventDetail,
} from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
import {
    Avatar,
    Bar,
    Button,
    ListPropTypes,
    Modals,
    ResponsivePopoverDomRef,
    ShellBar,
    ShellBarDomRef,
    ShellBarItem,
    ShellBarItemPropTypes,
    Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/Assets.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
    companyName: string;
    companyLogo: string;
    productName: string;
    isNotifiction?: boolean;
    notificationCount?: string;
    fName: string;
    lName: string;
    themeSwitch: (theme: string) => void;
};

const Navbar = ({
    companyLogo,
    companyName,
    productName,
    isNotifiction,
    notificationCount,
    fName,
    lName,
    themeSwitch,
}: NavbarProps) => {
    const [currentTheme, setCurrentTheme] = useState(getTheme);
    const popoverRef = useRef<ResponsivePopoverDomRef | null>(null);
    const notifyRef = useRef<ResponsivePopoverDomRef | null>(null);
    const profileRef = useRef<ResponsivePopoverDomRef | null>(null);
    const { setSidebarCollapsed } = useSidebar();
    const navigate = useNavigate();

    useEffect(() => {
        const storedTheme: string | null = localStorage.getItem("Theme");
        if (storedTheme) {
            setCurrentTheme(storedTheme);
            setTheme(storedTheme);
        }
    }, []);

    const showProductSwitchModal = Modals.useShowDialog();

    const handleThemeSwitch: ListPropTypes["onSelectionChange"] = (e) => {
        const { targetItem } = e.detail;
        const selectedTheme: string = targetItem.dataset.key!;
        setTheme(targetItem.dataset.key!);
        setCurrentTheme(targetItem.dataset.key!);
        localStorage.setItem("Theme", selectedTheme);
        if (selectedTheme && themeSwitch) {
            themeSwitch(selectedTheme);
        }
    };

    const handleThemeSwitchItemClick: ShellBarItemPropTypes["onClick"] = (
        e
    ) => {
        popoverRef.current?.showAt(e.detail.targetRef);
    };

    const handleNotificationClick = (
        event: Ui5CustomEvent<
            ShellBarDomRef,
            ShellBarNotificationsClickEventDetail
        >
    ) => {
        notifyRef.current?.showAt(event.detail.targetRef);
    };

    const handleProfileClick = (
        event: Ui5CustomEvent<ShellBarDomRef, ShellBarProfileClickEventDetail>
    ) => {
        profileRef.current?.showAt(event.detail.targetRef);
    };

    const handleProductSwitchClick = () => {
        const { close } = showProductSwitchModal({
            headerText: "Switch Product",
            children: <ProductSwitchModal />,
            footer: (
                <Bar
                    endContent={<Button onClick={() => close()}>Close</Button>}
                />
            ),
        });
    };

    const handleNavMenuButtonclick = () => {
        setSidebarCollapsed((isCollapseSidebar) => !isCollapseSidebar);
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <>
            <ShellBar
                className="shellbar_custom"
                style={{
                    position: "relative",
                    marginTop: "0.2rem",
                    marginLeft: "0.4rem",
                    borderRadius: "0.50rem",
                    width: "calc(100dvw - 0.75rem)",
                }}
                logo={
                    <img
                        className="size-12 rounded-full object-cover"
                        src={companyLogo}
                        alt={`${companyName} Logo`}
                    />
                }
                primaryTitle={productName}
                profile={
                    <Avatar className="">
                        <div className="flex cursor-pointer items-center justify-center border p-3">
                            <span className=" text-lg font-medium">
                                {fName.charAt(0)}
                            </span>
                            <span className=" text-lg font-medium">
                                {lName.charAt(0)}
                            </span>
                        </div>
                    </Avatar>
                }
                showNotifications={isNotifiction}
                onNotificationsClick={(
                    event: Ui5CustomEvent<
                        ShellBarDomRef,
                        ShellBarNotificationsClickEventDetail
                    >
                ) => handleNotificationClick(event)}
                onProfileClick={(
                    e: Ui5CustomEvent<
                        ShellBarDomRef,
                        ShellBarNotificationsClickEventDetail
                    >
                ) => {
                    handleProfileClick(e);
                }}
                onProductSwitchClick={() => {
                    handleProductSwitchClick();
                }}
                onLogoClick={handleLogoClick}
                startButton={
                    <Button
                        style={{
                            position: "absolute",
                            left: "0.6rem",
                        }}
                        className="mr-4"
                        design="Emphasized"
                        icon="menu2"
                        onClick={handleNavMenuButtonclick}
                    />
                }
                notificationsCount={notificationCount}
                showProductSwitch
            >
                <ShellBarItem
                    icon={paletteIcon}
                    text="Change Theme"
                    onClick={handleThemeSwitchItemClick}
                />
            </ShellBar>

            <ThemeSwitchPopover
                currentTheme={currentTheme}
                popoverRef={popoverRef}
                handleThemeSwitch={handleThemeSwitch}
            />

            <NotificationPopover notifyRef={notifyRef} />
            <ProfilePopover profileRef={profileRef} />
        </>
    );
};

export default Navbar;

import { useCurrentPath } from "@/hooks/useCurrentPath";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { FlexBox } from "@ui5/webcomponents-react";

import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import SideNavbar from "@/components/SideNavbar";

import ForgetPassword from "@/pages/forgetPassword";
import ProductSelection from "@/pages/productSelection";
import SignIn from "@/pages/signIn";

import companyLogo from "@/assets/images/irm.png";

import "@/css/dynamicPage.css";
import { useSwitchProduct } from "@/hooks/useSwitchProduct";
import { routerMap } from "@/lib/routeMap";
import { routes, sodRoutes } from "@/lib/routedata";
import { User } from "@/lib/types";

const App = () => {
    const [, setTheme] = useState("sap_horizon");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const { isSwitchProduct } = useSwitchProduct();
    const [product, setProduct] = useState("Process Control Flow");
    const [isSoD, setIsSoD] = useState(false);
    const path = useCurrentPath();

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            setIsLoggedIn(true);
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
        }
        if (path.includes("/sod")) {
            setIsSoD(true);
            setProduct("Segregation of Duties");
        }
    }, [isLoggedIn, path]);

    return (
        <div
            className={`overflow-hidden`}
            style={{
                backgroundColor: `color-mix(in srgb, black 4%, var(--sapBackgroundColor))`,
                gridTemplateRows: "auto 1fr",
                gridTemplateColumns: "auto 1fr",
            }}
        >
            {isForgotPassword ? (
                <ForgetPassword />
            ) : !isLoggedIn ? (
                <SignIn
                    setIsLoggedIn={setIsLoggedIn}
                    setIsForgotPassword={setIsForgotPassword}
                />
            ) : isSwitchProduct ? (
                <ProductSelection />
            ) : (
                <Suspense fallback={<Loading />}>
                    <Navbar
                        companyName="TRP Global"
                        productName={product}
                        isNotifiction={true}
                        notificationCount="10"
                        companyLogo={companyLogo}
                        fName={user ? user.fName : ""}
                        lName={user ? user.lName : ""}
                        themeSwitch={setTheme}
                    />

                    <FlexBox
                        style={{
                            height: "94.3vh",
                            marginTop: "0.50rem",
                            columnGap: "0.50rem",
                            marginRight: "0.50rem",
                            borderRadius: "0.5rem",
                            overflowX: "hidden",
                        }}
                    >
                        {isSoD ? (
                            <SideNavbar items={sodRoutes} />
                        ) : (
                            <SideNavbar items={routes} />
                        )}

                        <Routes>
                            {routerMap.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Routes>
                    </FlexBox>
                </Suspense>
            )}
        </div>
    );
};

export default App;

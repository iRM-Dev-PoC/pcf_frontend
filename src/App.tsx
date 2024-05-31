import { useCurrentPath } from "@/hooks/useCurrentPath";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { FlexBox } from "@ui5/webcomponents-react";

import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import SideNavbar from "@/components/SideNavbar";

import SoDDashboard from "@/pages/SoD/sodDashboard";
import CheckPoint from "@/pages/checkPoint";
import ControlFamily from "@/pages/controlFamily";
import DataLoad from "@/pages/dataLoad";
import ForgetPassword from "@/pages/forgetPassword";
import Home from "@/pages/home";
import ModuleMaster from "@/pages/moduleMaster";
import ProductSelection from "@/pages/productSelection";
import Report from "@/pages/report";
import ReportCheckPointMapping from "@/pages/reportCheckPointMapping";
import ResetPassword from "@/pages/resetPassword";
import Role from "@/pages/roles";
import SignIn from "@/pages/signIn";
import SubModule from "@/pages/subModule";
import TypeOfControl from "@/pages/typeOfControl";
import AddUsers from "@/pages/users";

import companyLogo from "@/assets/images/irm.png";

import { useSwitchProduct } from "@/hooks/useSwitchProduct";
import { routes, sodRoutes } from "@/lib/routedata";
import { User } from "@/lib/types";
import "@ui5/webcomponents-icons/dist/AllIcons.js";

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
                            height: "93.3vh",
                            marginTop: "0.50rem",
                            columnGap: "0.50rem",
                            marginRight: "0.50rem",
                            // marginBottom: "0.3rem",
                            borderRadius: "0.5rem",
                            overflowX: "hidden",
                        }}
                    >
                        {isSoD ? (
                            <SideNavbar items={sodRoutes} />
                        ) : (
                            <SideNavbar items={routes} />
                        )}

                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Home />} />

                                {/* Master routes */}
                                <Route
                                    path="/pcf/master/controlFamily"
                                    element={<ControlFamily />}
                                />
                                <Route
                                    path="/pcf/master/report"
                                    element={<Report />}
                                />
                                <Route
                                    path="/pcf/master/typeOfControl"
                                    element={<TypeOfControl />}
                                />
                                <Route
                                    path="/pcf/master/checkpoint"
                                    element={<CheckPoint />}
                                />
                                <Route
                                    path="/pcf/master/reportCheckpointMapping"
                                    element={<ReportCheckPointMapping />}
                                />

                                {/* Dataload routes */}
                                <Route
                                    path="/pcf/dataLoad"
                                    element={<DataLoad />}
                                />

                                {/* Configuration routes */}
                                <Route
                                    path="/pcf/config/roles"
                                    element={<Role />}
                                />
                                <Route
                                    path="/pcf/config/addUsers"
                                    element={<AddUsers />}
                                />

                                <Route
                                    path="/pcf/config/subModule"
                                    element={<SubModule />}
                                />

                                <Route
                                    path="/pcf/config/moduleMaster"
                                    element={<ModuleMaster />}
                                />

                                <Route
                                    path="/sod/"
                                    element={<SoDDashboard />}
                                />

                                <Route
                                    path="/resetPassword"
                                    element={
                                        <ResetPassword changePassword={true} />
                                    }
                                />
                            </Routes>
                        </Suspense>
                    </FlexBox>
                </Suspense>
            )}
        </div>
    );
};

export default App;

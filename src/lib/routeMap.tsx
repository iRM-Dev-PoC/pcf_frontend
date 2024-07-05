import AddUsers from "@/components/AddUsers";
import type { routerMapType } from "@/lib/types";
import CheckPoint from "@/pages/checkPoint";
import ControlFamily from "@/pages/controlFamily";
import DataLoad from "@/pages/dataLoad";
import Home from "@/pages/home";
import ModuleMaster from "@/pages/moduleMaster";
import Report from "@/pages/report";
import ReportCheckPointMapping from "@/pages/reportCheckPointMapping";
import ResetPassword from "@/pages/resetPassword";
import Roles from "@/pages/roles";
import SoDDashboard from "@/pages/SoD/sodDashboard";
import SubModules from "@/pages/subModule";
import TypeOfControl from "@/pages/typeOfControl";

export const routerMap: routerMapType[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/pcf/master/controlFamily",
        element: <ControlFamily />,
    },
    {
        path: "/pcf/master/report",
        element: <Report />,
    },
    {
        path: "/pcf/master/typeOfControl",
        element: <TypeOfControl />,
    },
    {
        path: "/pcf/master/checkpoint",
        element: <CheckPoint />,
    },
    {
        path: "/pcf/master/reportCheckpointMapping",
        element: <ReportCheckPointMapping />,
    },
    {
        path: "/pcf/dataLoad",
        element: <DataLoad />,
    },
    {
        path: "/pcf/config/roles",
        element: <Roles />,
    },
    {
        path: "/pcf/config/addUsers",
        element: <AddUsers />,
    },
    {
        path: "/pcf/config/subModule",
        element: <SubModules />,
    },
    {
        path: "/pcf/config/moduleMaster",
        element: <ModuleMaster />,
    },
    {
        path: "/sod/",
        element: <SoDDashboard />,
    },
    {
        path: "/resetPassword",
        element: <ResetPassword changePassword={true} />,
    },
];

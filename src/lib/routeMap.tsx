import AddUsers from "@/components/AddUsers";
import CheckPoint from "@/pages/checkPoint";
import ControlFamily from "@/pages/controlFamily";
import ControlKPI from "@/pages/controlKPI";
import DataLoad from "@/pages/dataLoad";
import Home from "@/pages/home";
//LO imports
import LODashboard from "@/pages/LO/lODashboard";
import ReportLO from "@/pages/LO/reportLO";
import UserDrillDown from "@/pages/LO/userDrillDown";
import UserReport from "@/pages/LO/userReport";
import ActiveInactiveReport from "@/pages/LO/activeInactiveReport";

import ModuleMaster from "@/pages/moduleMaster";
import PivotTable from "@/pages/pivotTable";
import Report from "@/pages/report";
import ReportCheckPointMapping from "@/pages/reportCheckPointMapping";
import ResetPassword from "@/pages/resetPassword";
import Roles from "@/pages/roles";
import SoDDashboard from "@/pages/SoD/sodDashboard";
import SubModules from "@/pages/subModule";
import TypeOfControl from "@/pages/typeOfControl";
import type { routerMapType } from "@/types";

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
        path: "/pcf/config/controlKPI",
        element: <ControlKPI />,
    },
    {
        path: "/sod/",
        element: <SoDDashboard />,
    },
    // Lo Routes
    {
        path:"/lO",
        element: <LODashboard/>
    },
    //Sync Routes LO
    {
        path:"/lO/sync/reportLO",
        element: <ReportLO/>
    },
    {
        path:"/lO/sync/userReport",
        element: <UserReport/>
    },
    {
        path:"/lO/sync/activeInactiveReport",
        element: <ActiveInactiveReport/>
    },
    {
        path:"/lO/sync/userDrillDown",
        element: <UserDrillDown/>
    },

    {
        path: "/resetPassword",
        element: <ResetPassword changePassword={true} />,
    },
    {
        path: "/pcf/config/pivotTable",
        element: <PivotTable/>,

    },
];

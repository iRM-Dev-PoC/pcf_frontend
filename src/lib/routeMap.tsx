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
import Report from "@/pages/report";
import ReportCheckPointMapping from "@/pages/reportCheckPointMapping";
import ResetPassword from "@/pages/resetPassword";
import Roles from "@/pages/roles";
import SoDDashboard from "@/pages/SoD/sodDashboard";
import SubModules from "@/pages/subModule";
import TypeOfControl from "@/pages/typeOfControl";
import type { routerMapType } from "@/types";
import SubscriptionType from "@/pages/LO/subscriptionType";
import ServicePricing from "@/pages/LO/servicePricing";
import Client from "@/pages/LO/client";
import CostConversionRate from "@/pages/LO/costConversionRate";
import RatingReport from "@/pages/LO/ratingReport";
import  SapServices from "@/pages/LO/sapServices";
import SyncUserData from "@/pages/LO/syncUserData";
import CostReport from "@/pages/LO/costReport";
import RoleRevocation from "@/pages/LO/roleRevocation";

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
        path:"/lO/",
        element: <LODashboard/>
    },
    //Sync Routes LO
    {   path:"/license/sync",
        element: <SyncUserData/>
    },
    {
        path:"/license/sync/costReport",
        element: <CostReport/>
    },
    {
        path:"/license/sync/reportLO",
        element: <ReportLO/>
    },
    {
        path:"/license/sync/userReport",
        element: <UserReport/>
    },
    {
        path:"/license/sync/activeInactiveReport",
        element: <ActiveInactiveReport/>
    },
    {
        path:"/license/sync/userDrillDown",
        element: <UserDrillDown/>
    },
    {
        path:"/license/sync/roleRevocation",
        element: <RoleRevocation/>
    },

    //Configuration Routes LO
   {
        path:"/lO/configuration/subsctiptionType",
        element: <SubscriptionType/>
    },
    {
        path:"/lO/configuration/servicePricing",
        element: <ServicePricing/>
    },
    {
        path:"/lO/configuration/client",
        element:<Client/>
    },
    {
        path:"/lO/configuration/costConversionRate",
        element:<CostConversionRate/>
    },
    {
        path:"/lO/configuration/ratingReport",
        element:<RatingReport/>
    },
    {
        path:"/lO/configuration/sapCloudServices",
        element:<SapServices/>
    },

    {
        path: "/resetPassword",
        element: <ResetPassword changePassword={true} />,
    },
];

const routes = [
    {
        text: "Home",
        icon: "home",
        path: "/",
    },
    {
        text: "Data Load",
        icon: "upload-to-cloud",
        path: "/pcf/dataLoad",
    },
    {
        text: "Master",
        icon: "drop-down-list",
        path: "/pcf/master",
        subItems: [
            {
                text: "Type Of Control",
                icon: "permission",
                path: "/typeOfControl",
            },
            {
                text: "Control Family",
                icon: "customer-and-contacts",
                path: "/controlFamily",
            },
            {
                text: "Report",
                icon: "manager-insight",
                path: "/report",
            },
            {
                text: "Check-Point Master",
                icon: "flag-2",
                path: "/checkpoint",
            },
            {
                text: "Report Check-Point Mapping",
                icon: "org-chart",
                path: "/reportCheckpointMapping",
            },
        ],
    },
    {
        text: "Configuration",
        icon: "wrench",
        path: "/pcf/config",
        subItems: [
            {
                text: "Add Roles",
                icon: "role",
                path: "/roles",
            },
            {
                text: "Add Users",
                icon: "add-employee",
                path: "/addUsers",
            },
            {
                text: "Module Master",
                icon: "grid",
                path: "/moduleMaster",
            },
            {
                text: "Sub-Module Master",
                icon: "provision",
                path: "/subModule",
            },
            {
                text: "Control KPI",
                icon: "command-line-interfaces",
                path: "/controlKPI",
            },
            {
                text: "Pivot Table",
                icon: "",
                path: "/pivotTable",
            }
        ],
    },
];

const sodRoutes = [
    {
        text: "Home",
        icon: "home",
        path: "/sod/",
    },
    {
        text: "Test",
        icon: "feed",
        path: "/sod/test",
    },
];

const lORoutes = [
   { text : "Home",
    icon:"home",
    path: "/lO",
   },
   {
    text: "Sync",
    icon: "synchronize",
    path: "/lO/sync",
    subItems:[
        {
            text: "Report",
            icon: "manager-insight",
            path: "/reportLO",
        },
        {
            text: "User Report",
            icon: "trip-report",
            path: "/userReport",
        },
        {
            text: "User-Drill-Down",
            icon: "person-placeholder",
            path: "/userDrillDown",
        },
        {
            text: "Active /Inactive Reports",
            icon: "status-inactive",
            path: "/activeInactiveReport",
        },
    ]
   },
   {
    text: "Configuration",
    icon: "feed",
    path: "/lO/test",
    subItems:[
        
    ]
   },

]

export { routes, sodRoutes,lORoutes };

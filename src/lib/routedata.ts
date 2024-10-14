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
    path: "/lO/",
   },
   {
    text: "Sync",
    icon: "synchronize",
    path: "/license/sync",
    subItems:[
        {
            text: "Cost Report",
            icon: "expense-report",
            path: "/costReport",
        },
        {
            text: "Report",
            icon: "manager-insight",
            path: "/reportLO",
        },
        {
            text: "User Status",
            icon: "trip-report",
            path: "/userStatus",
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
        {
            text: "Role Revocation",
            icon: "undo",
            path: "/roleRevocation",
        },
    ]
   },
   {
    text: "Configuration",
    icon: "wrench",
    path: "/lO/configuration",
    subItems:[

        {
            text: "Subscription Type",
            icon: "opportunities",
            path: "/subsctiptionType",
        },
        {
            text: "SAP Cloud Services",
            icon: "cloud",
            path: "/SapCloudServices",
        },  
        {
            text: "Service Pricing",
            icon: "official-service",
            path: "/servicePricing",
        },
        {
            text: "Client",
            icon: "Netweaver-business-client",
            path: "/client",
        },
        {
            text: "Cost Conversion Rate",
            icon: "measure",
            path: "/costConversionRate",
        },
        {
            text: "Rating Report",
            icon: "measurement-document",
            path: "/ratingReport",
        }, 
    ]
   },

]

export { routes, sodRoutes,lORoutes };

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useCurrentTheme } from "@/hooks/useCurrentTheme";
// import { cn } from "@/lib/utils";

// type DashboardCardprops = {
//     title: string | undefined;
//     desc: string | undefined;
//     count: number | undefined;
//     variant: "High" | "Low" | "Mid";
// };

// const DashboardCards = ({
//     title,
//     desc,
//     count,
//     variant,
// }: DashboardCardprops) => {
//     const { currentTheme } = useCurrentTheme();
//     const isDark = Boolean(currentTheme === "dark");
//     return (
//         <>
//             <Card className={cn("h-full rounded-2xl", isDark && "bg-transparent text-white")}>
//                 <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                         {title}
//                         <Badge
//                             className="text-center text-base"
//                             variant={variant}
//                         >
//                             {count}
//                         </Badge>
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <p className="text-pretty text-xl font-medium">{desc}</p>
//                 </CardContent>
//             </Card>
//         </>
//     );
// };

// export default DashboardCards;


import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { cn } from "@/lib/utils";
import { AnalyticalTable, Button, Modals } from "@ui5/webcomponents-react";


type DashboardCardprops = {
    title: string | undefined;
    desc: string | undefined;
    count: number | undefined;
    variant: "High" | "Low" | "Mid";
};

const DashboardCards = ({
    title,
    desc,
    count,
    variant,
}: DashboardCardprops) => {
    const { currentTheme } = useCurrentTheme();
    const isDark = Boolean(currentTheme === "dark");
    const showDialog = Modals.useShowDialog();

    const openModal = () => {
        const { close } = showDialog({
            headerText: "Analytical Table",
            children: (
                <AnalyticalTable
                    columns={[
                        {
                            Header: "Name",
                            accessor: "name",
                            autoResizable: true,
                            headerTooltip: "Full Name",
                        },
                        {
                            Header: "Age",
                            accessor: "age",
                            autoResizable: true,
                            className: "superCustomClass",
                            disableFilters: false,
                            disableGroupBy: true,
                            disableSortBy: false,
                            // hAlign: "End",
                        },
                        {
                            Header: "Friend Name",
                            accessor: "friend.name",
                            autoResizable: true,
                        },
                        // {
                        //     Filter: function _a() {},
                        //     Header: function _a() {},
                        //     accessor: "friend.age",
                        //     autoResizable: true,
                        //     filter: function _a() {},
                        //     hAlign: "End",
                        //     headerLabel: "Friend Age",
                        // },
                        // {
                        //     Cell: function _a() {},
                        //     Header: "Actions",
                        //     accessor: ".",
                        //     cellLabel: function _a() {},
                        //     disableFilters: true,
                        //     disableGroupBy: true,
                        //     disableResizing: true,
                        //     disableSortBy: true,
                        //     id: "actions",
                        //     minWidth: 100,
                        //     width: 100,
                        // },
                    ]}
                    data={[
                        {
                            age: 80,
                            friend: {
                                age: 68,
                                name: "Carver Vance",
                            },
                            name: "Allen Best",
                            status: "Success",
                        },
                        {
                            age: 84,
                            friend: {
                                age: 44,
                                name: "Petra Potter",
                            },
                            name: "Janis Mcgowan",
                            status: "Information",
                        },
                    ]}
                    filterable
                    groupBy={[]}
                    groupable
                    header="Table Title"
                    infiniteScroll
                    onAutoResize={function _a() {}}
                    onColumnsReorder={function _a() {}}
                    onGroup={function _a() {}}
                    onLoadMore={function _a() {}}
                    onRowClick={function _a() {}}
                    onRowExpandChange={function _a() {}}
                    onRowSelect={function _a() {}}
                    onSort={function _a() {}}
                    onTableScroll={function _a() {}}
                    selectedRowIds={{
                        "3": true,
                    }}
                    selectionMode="SingleSelect"
                    tableHooks={[]}
                    withRowHighlight
                />
            ),
            footer: (
                <div className="flex justify-end">
                    <Button onClick={() => close()}>Close</Button>
                </div>
            ),
        });
    };

    return (
        <>
            <Card
                className={cn(
                    "h-full cursor-pointer rounded-2xl",
                    isDark && "bg-transparent text-white"
                )}
                onClick={openModal}
            >
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {title}
                        <Badge
                            className="text-center text-base"
                            variant={variant}
                        >
                            {count}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-pretty text-xl font-medium">{desc}</p>
                </CardContent>
            </Card>
        </>
    );
};

export default DashboardCards;

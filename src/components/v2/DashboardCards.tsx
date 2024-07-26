// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import DashboardCardTable from "@/components/v2/DashboardCardTable";
// import { useCurrentTheme } from "@/hooks/useCurrentTheme";
// import { cn } from "@/lib/utils";
// import { Bar, Button, Modals } from "@ui5/webcomponents-react";

// type DashboardCardProps = {
//     title: string | undefined;
//     desc: string | undefined;
//     count: number | undefined;
//     variant: "High" | "Low" | "Mid";
//     exceptionData: any;
//     baseAllData: any;
//     baseAllData1:any;
//     baseAllData2:any;
// };

// const DashboardCards = ({
//     title,
//     desc,
//     count,
//     variant,
//     exceptionData,
//     baseAllData,
//     baseAllData1,
//     baseAllData2,
// }: DashboardCardProps) => {
//     const { currentTheme } = useCurrentTheme();
//     const isDark = currentTheme === "dark";
//     const showDialog = Modals.useShowDialog();

//     const openModal = () => {
//         const headerText = title === "Base" ? "Base Data" : "Exception Data";
//         const modalData = title === "Base" ? baseAllData : exceptionData;
//         const modalData1 = title === "Base" ? baseAllData1: exceptionData;
//         const modalData2 = title === "Base" ? baseAllData2 : exceptionData;
//         const isBaseCard = title === "Base";
        

//         const { close } = showDialog({
//             style: { padding: "6px", width: "100%" },
//             headerText,
//             children: <DashboardCardTable modalData={modalData} modalData1={modalData1} modalData2={modalData2} isBaseCard={isBaseCard} />,
//             footer: (
//                 <Bar
//                     endContent={
//                         <Button onClick={() => close()} design="Negative">
//                             Close
//                         </Button>
//                     }
//                 />
//             ),
//         });
//     };

//     return (
//         <Card
//             className={cn(
//                 "h-full cursor-pointer rounded-2xl",
//                 isDark && "bg-transparent text-white"
//             )}
//             onClick={title === "Base" || title === "Exception" ? openModal : undefined}
//         >
//             <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                     {title}
//                     <Badge className="text-center text-base" variant={variant}>
//                         {count}
//                     </Badge>
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-pretty text-xl font-medium">{desc}</p>
//             </CardContent>
//         </Card>
//     );
// };

// // export default DashboardCards;
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import DashboardCardTable from "@/components/v2/DashboardCardTable";
// import { useCurrentTheme } from "@/hooks/useCurrentTheme";
// import { cn } from "@/lib/utils";
// import { Bar, Button, Modals } from "@ui5/webcomponents-react";
// import BoxChart from "./BoxChart";
// // import BoxPlotChart from "@/components/v2/BoxPlotChart";

// type DashboardCardProps = {
//     title: string | undefined;
//     desc: string | undefined;
//     count: number | undefined;
//     variant: "High" | "Low" | "Mid";
//     exceptionData: any;
//     baseAllData: any;
//     baseAllData1: any;
//     baseAllData2: any;
//     // deviationAllData:any;
// };

// const DashboardCards = ({
//     title,
//     desc,
//     count,
//     variant,
//     exceptionData,
//     baseAllData,
//     baseAllData1,
//     baseAllData2,
//     // deviationAllData,
// }: DashboardCardProps) => {
//     const { currentTheme } = useCurrentTheme();
//     const isDark = currentTheme === "dark";
//     const showDialog = Modals.useShowDialog();

//     const openModal = () => {
//         let headerText = "";
//         let children: JSX.Element | null = null;

//         if (title === "Base") {
//             headerText = "Base Data";
//             children = (
//                 <DashboardCardTable
//                     modalData={baseAllData}
//                     modalData1={baseAllData1}
//                     modalData2={baseAllData2}
//                     isBaseCard={true}
//                 />
//             );
//         } else if (title === "Exception") {
//             headerText = "Exception Data";
//             children = (
//                 <DashboardCardTable
//                     modalData={exceptionData}
//                     modalData1={exceptionData}
//                     modalData2={exceptionData}
//                     isBaseCard={false}
//                 />
//             );
//         } else if (title === "Deviation") {
//             headerText = "Deviation Chart";
//             children = <BoxChart />;
//         }

//         if (children) {
//             const { close } = showDialog({
//                 style: { padding: "6px", width: "50%" },
//                 headerText,
//                 children,
//                 footer: (
//                     <Bar
//                         endContent={
//                             <Button onClick={() => close()} design="Negative">
//                                 Close
//                             </Button>
//                         }
//                     />
//                 ),
//             });
//         }
//     };

//     return (
//         <Card
//             className={cn(
//                 "h-full cursor-pointer rounded-2xl",
//                 isDark && "bg-transparent text-white"
//             )}
//             onClick={
//                 title === "Base" || title === "Exception" || title === "Deviation"
//                     ? openModal
//                     : undefined
//             }
//         >
//             <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                     {title}
//                     <Badge className="text-center text-base" variant={variant}>
//                         {count}
//                     </Badge>
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-pretty text-xl font-medium">{desc}</p>
//             </CardContent>
//         </Card>
//     );
// };

// export default DashboardCards;

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCardTable from "@/components/v2/DashboardCardTable";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { cn } from "@/lib/utils";
import { Bar, Button, Modals } from "@ui5/webcomponents-react";
import BoxChart from "@/components/v2/BoxChart";


type DashboardCardProps = {
    title: string | undefined;
    desc: string | undefined;
    count: number | undefined;
    variant: "High" | "Low" | "Mid";
    exceptionData: any;
    baseAllData: any;
    baseAllData1: any;
    baseAllData2: any;
    boxPloting: any;
};

const DashboardCards = ({
    title,
    desc,
    count,
    variant,
    exceptionData,
    baseAllData,
    baseAllData1,
    baseAllData2,
    boxPloting,
}: DashboardCardProps) => {
    const { currentTheme } = useCurrentTheme();
    const isDark = currentTheme === "dark";
    const showDialog = Modals.useShowDialog();

    const openModal = () => {
        let headerText = "";
        let children: JSX.Element | null = null;

        if (title === "Base") {
            headerText = "Base Data";
            children = (
                <DashboardCardTable
                    modalData={baseAllData}
                    modalData1={baseAllData1}
                    modalData2={baseAllData2}
                    isBaseCard={true}
                />
            );
        } else if (title === "Exception") {
            headerText = "Exception Data";
            children = (
                <DashboardCardTable
                    modalData={exceptionData}
                    modalData1={exceptionData}
                    modalData2={exceptionData}
                    isBaseCard={false}
                />
            );
        } else if (title === "Deviation") {
            headerText = "Deviation Chart";
            children = (
                <>
                    <BoxChart boxPloting={boxPloting} /> 
                </>
            );
        }

        if (children) {
            const { close } = showDialog({
                style: { padding: "6px", width: "50%" },
                headerText,
                children,
                footer: (
                    <Bar
                        endContent={
                            <Button onClick={() => close()} design="Negative">
                                Close
                            </Button>
                        }
                    />
                ),
            });
        }
    };

    return (
        <Card
            className={cn(
                "h-full cursor-pointer rounded-2xl",
                isDark && "bg-transparent text-white"
            )}
            onClick={
                title === "Base" || title === "Exception" || title === "Deviation"
                    ? openModal
                    : undefined
            }
        >
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {title}
                    <Badge className="text-center text-base" variant={variant}>
                        {count}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-pretty text-xl font-medium">{desc}</p>
            </CardContent>
        </Card>
    );
};

export default DashboardCards;

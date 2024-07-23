// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import DashboardCardTable from "@/components/v2/DashboardCardTable";
// import { useCurrentTheme } from "@/hooks/useCurrentTheme";
// import { cn } from "@/lib/utils";
// import { Bar, Button, Modals} from "@ui5/webcomponents-react";

// type DashboardCardProps = {
//     title: string | undefined;
//     desc: string | undefined;
//     count: number | undefined;
//     variant: "High" | "Low" | "Mid";
//     exceptionData: any;
//     baseAllData: any;
// };

// const DashboardCards = ({
//     title,
//     desc,
//     count,
//     variant,
//     exceptionData,
//     baseAllData
// }: DashboardCardProps) => {
//     const { currentTheme } = useCurrentTheme();
//     const isDark = currentTheme === "dark";
//     const showDialog = Modals.useShowDialog();

//     const openModal = () => {
//         const headerText = title === "Base" ? "Base Data" : "Exception Data";
//         const modalData = title === "Base" ? baseAllData : exceptionData;

//         const { close } = showDialog({
//             style: { padding: "6px", width: "100%" },
//             headerText,
//             children: <DashboardCardTable modalData={modalData} />,
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

// export default DashboardCards;

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
// };

// const DashboardCards = ({
//     title,
//     desc,
//     count,
//     variant,
//     exceptionData,
//     baseAllData
// }: DashboardCardProps) => {
//     const { currentTheme } = useCurrentTheme();
//     const isDark = currentTheme === "dark";
//     const showDialog = Modals.useShowDialog();

//     const openModal = () => {
//         const headerText = title === "Base" ? "Base Data" : "Exception Data";
//         const modalData = title === "Base" ? baseAllData : exceptionData;
//         const isBaseCard = title === "Base";

//         const { close } = showDialog({
//             style: { padding: "6px", width: "100%" },
//             headerText,
//             children: <DashboardCardTable modalData={modalData} isBaseCard={isBaseCard} />,
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

// export default DashboardCards;

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCardTable from "@/components/v2/DashboardCardTable";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { cn } from "@/lib/utils";
import { Bar, Button, Modals } from "@ui5/webcomponents-react";

type DashboardCardProps = {
    title: string | undefined;
    desc: string | undefined;
    count: number | undefined;
    variant: "High" | "Low" | "Mid";
    exceptionData: any;
    baseAllData: any;
    baseAllData1:any;
    baseAllData2:any;
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
}: DashboardCardProps) => {
    const { currentTheme } = useCurrentTheme();
    const isDark = currentTheme === "dark";
    const showDialog = Modals.useShowDialog();

    const openModal = () => {
        const headerText = title === "Base" ? "Base Data" : "Exception Data";
        const modalData = title === "Base" ? baseAllData : exceptionData;
        const modalData1 = title === "Base" ? baseAllData1: exceptionData;
        const modalData2 = title === "Base" ? baseAllData2 : exceptionData;
        const isBaseCard = title === "Base";
        

        const { close } = showDialog({
            style: { padding: "6px", width: "100%" },
            headerText,
            children: <DashboardCardTable modalData={modalData} modalData1={modalData1} modalData2={modalData2} isBaseCard={isBaseCard} />,
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
    };

    return (
        <Card
            className={cn(
                "h-full cursor-pointer rounded-2xl",
                isDark && "bg-transparent text-white"
            )}
            onClick={title === "Base" || title === "Exception" ? openModal : undefined}
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


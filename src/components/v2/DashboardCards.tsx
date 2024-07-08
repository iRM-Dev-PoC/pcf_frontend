import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCardTable from "@/components/v2/DashboardCardTable";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { cn } from "@/lib/utils";
import { Bar, Button, Modals } from "@ui5/webcomponents-react";

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
            style:{padding:"6px", width:"100%"},
            headerText: "Card Data",
            children: <DashboardCardTable />,
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

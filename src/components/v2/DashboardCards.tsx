import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { cn } from "@/lib/utils";

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
    return (
        <>
            <Card className={cn("h-full rounded-2xl", isDark && "bg-transparent text-white")}>
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

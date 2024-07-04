import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { cn } from "@/lib/utils";

type ActivityCardProps = {
    title: string | undefined;
    desc: string | undefined;
};

const ActivityCard = ({ title, desc }: ActivityCardProps) => {
     const { currentTheme } = useCurrentTheme();
     const isDark = Boolean(currentTheme === "dark");
    return (
        <>
            <Card className={cn("h-full rounded-2xl", isDark && "bg-transparent text-white")}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-pretty text-xl font-medium" >{desc}</p>
                </CardContent>
            </Card>
        </>
    );
};

export default ActivityCard;

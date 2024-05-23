import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardCardprops = {
    title: string | undefined;
    desc: string | undefined;
    count: number | undefined;
};

const DashboardCards = ({ title, desc, count }: DashboardCardprops) => {
    return (
        <>
            <Card className="h-full rounded-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {title}
                        <Badge className="text-center text-base" variant="mid">
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

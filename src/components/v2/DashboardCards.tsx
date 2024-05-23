import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DashboardCardprops = {
    title: string;
    desc: string;
    count: number;
};

const DashboardCards = ({ title, desc, count }: DashboardCardprops) => {
    return (
        <div>
            <Card>
                <CardHeader className="flex justify-between">
                    <Badge variant="outline">{count}</Badge>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{desc}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardCards;

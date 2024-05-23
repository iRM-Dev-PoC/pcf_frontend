import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActivityCardProps = {
    title: string | undefined;
    desc: string | undefined;
};

const ActivityCard = ({ title, desc }: ActivityCardProps) => {
    return (
        <>
            <Card className="h-full rounded-2xl">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-pretty text-xl font-medium">{desc}</p>
                </CardContent>
            </Card>
        </>
    );
};

export default ActivityCard;

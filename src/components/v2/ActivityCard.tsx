import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActivityCardProps = {
    title: string | undefined;
    desc: string | undefined;
};

const ActivityCard = ({ title, desc }: ActivityCardProps) => {
    return (
        <div>
            <Card className="size-full">
                <CardHeader className="hover:rounded-md">
                    <CardTitle className="text-pretty text-xl font-bold">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base">{desc}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ActivityCard;

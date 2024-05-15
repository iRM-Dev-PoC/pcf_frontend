import {
    Badge,
    Card,
    CardHeader,
    ExpandableText,
} from "@ui5/webcomponents-react";
type RiskCardProps = {
    header: string;
    risk: number;
    description: string;
    onClick: () => void;
};

const RiskCard = ({ header, risk, description, onClick }: RiskCardProps) => {
    return (
        <Card className="m-2.5 max-w-lg">
            <CardHeader
                titleText={header}
                onClick={onClick}
                action={
                    <Badge
                        colorScheme={
                            Number(risk) >= 0 && Number(risk) <= 30
                                ? "8"
                                : Number(risk) > 30 && Number(risk) <= 70
                                  ? "1"
                                  : "2"
                        }
                    >
                        Risk : {risk}
                    </Badge>
                }
                interactive={true}
            />
            <div className="p-4">
                <ExpandableText maxCharacters={50} className="text-center">
                    {description}
                </ExpandableText>
            </div>
        </Card>
    );
};

export default RiskCard;

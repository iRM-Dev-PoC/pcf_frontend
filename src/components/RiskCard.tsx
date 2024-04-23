import {
    Card,
    CardHeader,
    Badge,
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
        <Card style={{ width: "32rem" }} className="m-2.5">
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
            <ExpandableText maxCharacters={100} className="text-center">
                {description}
            </ExpandableText>
        </Card>
    );
};

export default RiskCard;

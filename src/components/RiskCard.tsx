import { Card, CardHeader, Icon, Badge, ExpandableText } from "@ui5/webcomponents-react";
type RiskCardProps = {
    header: string;
    icon: string;
    risk: string;
    description: string;
    onClick: () => void; 
};

const RiskCard = ({ header, icon, risk, description, onClick }: RiskCardProps) => {
    return (
        <Card onClick={onClick}>
            <CardHeader
                avatar={<Icon name={icon} />}
                titleText={header}
                action={
                    <Badge colorScheme={
                        Number(risk) >= 0 && Number(risk) <= 30
                            ? "8"
                            : Number(risk) > 30 && Number(risk) <= 70
                                ? "1"
                                : "2"
                    }>
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



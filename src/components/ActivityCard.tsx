import { Card, CardHeader, ExpandableText } from "@ui5/webcomponents-react";
import { ThemingParameters, spacing } from "@ui5/webcomponents-react-base";

type ActivityCardProps = {
    title: string | undefined;
    description: string | undefined;
};

const ActivityCard = ({ title, description }: ActivityCardProps) => {
    return (
        <Card header={<CardHeader titleText={title} />} className="mb-2 h-full">
            <ExpandableText
                style={{
                    fontSize: "1rem",
                    color: ThemingParameters.sapContent_LabelColor,
                    ...spacing,
                }}
                className="p-3 text-xl"
                maxCharacters={100}
            >
                {description}
            </ExpandableText>
        </Card>
    );
};

export default ActivityCard;

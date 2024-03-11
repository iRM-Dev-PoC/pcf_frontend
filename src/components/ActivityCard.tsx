import { Card, CardHeader, ExpandableText } from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { spacing } from "@ui5/webcomponents-react-base";

type ActivityCardProps = {
	title: string;
	description: string;
};

const ActivityCard = ({ title, description }: ActivityCardProps) => {
	return (
		<Card
			header={<CardHeader titleText={title} />}
			style={{
				marginTop: "1rem",
				width: "80%",
			}}>
			<ExpandableText
				style={{
					fontSize: "1rem",
					color: ThemingParameters.sapContent_LabelColor,
					...spacing,
				}}
				className="p-3 text-xl"
				maxCharacters={100}>
				{description}
			</ExpandableText>
		</Card>
	);
};

export default ActivityCard;

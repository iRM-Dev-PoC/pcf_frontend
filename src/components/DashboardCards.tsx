import {
	Badge,
	Card,
	CardHeader,
	ExpandableText,
	FlexBox,
} from "@ui5/webcomponents-react";

type DashboardCardProps = {
	header: string;
	description: string;
	count: number;
};

const DashboardCards = ({ header, description, count }: DashboardCardProps) => {
	return (
		<FlexBox
			direction="Row"
			className="mt-2 flex-grow mb-2">
			<Card
				header={
					<CardHeader
						titleText={header}
						action={<Badge>{count}</Badge>}
					/>
				}>
				<ExpandableText
					className="p-2 text-lg"
					maxCharacters={50}>
					{description}
				</ExpandableText>
			</Card>
		</FlexBox>
	);
};

export default DashboardCards;

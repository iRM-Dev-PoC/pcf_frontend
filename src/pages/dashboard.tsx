import { FlexBox } from "@ui5/webcomponents-react";
import RiskCard from "../components/RiskCard";
import cardData from "../lib/cardData";
const Dashboard = () => {
	return (
		<FlexBox wrap="Wrap">
			{cardData.map((card, index) => {
				return (
					<RiskCard
						key={index}
						header={card.header}
						icon={card.icon}
						risk={card.risk}
						desciption={card.desciption}
					/>
				);
			})}
		</FlexBox>
	);
};

export default Dashboard;

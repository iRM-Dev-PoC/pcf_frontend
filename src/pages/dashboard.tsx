import { FlexBox } from "@ui5/webcomponents-react";
import RiskCard from "../components/RiskCard";
import cardData from "../lib/cardData";
import Breadcrumb from "../components/Breadcrumb";
const Dashboard = () => {
	return (
		<div>
			<Breadcrumb />
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
		</div>
	);
};

export default Dashboard;

import { DynamicPage, FlexBox } from "@ui5/webcomponents-react";
import DashboardCards from "../components/DashboardCards";
import { dasboardCardData } from "../lib/dashboardCardData";
import DashboardDatePicker from "../components/DashboardDatePicker";

import ActivityCard from "../components/ActivityCard";
import RiskFactor from "../components/RiskFactor";

const Dashboard = () => {
	return (
		<DynamicPage
			headerContentPinnable={false}
			showHideHeaderButton={false}
			headerContent={<DashboardDatePicker />}>
		{/* <FlexBox direction="Row"> */}
			<FlexBox direction="Column">
				<FlexBox direction="Row">
					<ActivityCard
						title="Incomplete Customer Master"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, molestiae."
					/>
				</FlexBox>
				<FlexBox
					direction="Row"
					className="mt-4 flex-grow gap-x-3"
					style={{ width: "80%" }}>
					{dasboardCardData.map((card, index) => {
						return (
							<DashboardCards
								key={index}
								header={card.header}
								description={card.description}
								count={card.count}
							/>
						);
					})}
				</FlexBox>	
			</FlexBox>
			<RiskFactor/>
		{/* </FlexBox>	 */}
		</DynamicPage>
	);
};

export default Dashboard;
import {  DynamicPage } from "@ui5/webcomponents-react";
import DashboardCards from "../components/DashboardCards";
import { dasboardCardData } from "../lib/dashboardCardData";
import DashboardDatePicker from "../components/DashboardDatePicker";
import { dasboardCardDataType } from "../utils/types";
const Dashboard = () => {
	const dashboardCardData:dasboardCardDataType[] = dasboardCardData;
	return (
	
		<DynamicPage
		headerContentPinnable={false}
		showHideHeaderButton={false}
		headerContent={
			<DashboardDatePicker/>
		}
		>
		

			{dashboardCardData.map((card, index) => {
				return (
					<DashboardCards
						key={index}
						header={card.header}
						description={card.description}
						cardcolor="bg-blue-200"
						count={card.count}		

					 		/>
				);
			})}
			
      
		</DynamicPage>
		

		)
};

export default Dashboard;

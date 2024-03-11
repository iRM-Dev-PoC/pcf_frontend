import {  DynamicPage } from "@ui5/webcomponents-react";
import DashboardCards from "../components/DashboardCards";
import { dasboardCardData } from "../lib/dashboardCardData";
import DashboardDatePicker from "../components/DashboardDatePicker";
const Dashboard = () => {
	return (
	
		<DynamicPage
		headerContentPinnable={false}
		showHideHeaderButton={false}
		headerContent={
			<DashboardDatePicker/>
		}
		>
		

			{dasboardCardData.map((card, index) => {
				return (
					<DashboardCards
						key={index} 
						header={card.header} 
						description={card.description}/>
				);
			})}
			
      
		</DynamicPage>
		

		)
};

export default Dashboard;

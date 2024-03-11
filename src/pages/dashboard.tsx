import { BackgroundDesign, DatePicker, DynamicPage, DynamicPageTitle, FilterBar } from "@ui5/webcomponents-react";
import DashboardCards from "../components/DashboardCards";
import cardData from "../lib/cardData";

const Dashboard = () => {
	return (
	
		<DynamicPage>
			
      <DynamicPageTitle
			actions={
				<>
					<DatePicker
						onChange={function _a() {}}
						onInput={function _a() {}}
						onValueStateChange={function _a() {}}
						primaryCalendarType="Gregorian"
						valueState="None"
						placeholder="From Date"
					/>
					<DatePicker
						onChange={function _a() {}}
						onInput={function _a() {}}
						onValueStateChange={function _a() {}}
						primaryCalendarType="Gregorian"
						valueState="None"
						placeholder="To Date"
					/>
				</>
			}>
			</DynamicPageTitle>
			<DashboardCards header={""} description={""}/>
      
		</DynamicPage>
		

		)
};

export default Dashboard;

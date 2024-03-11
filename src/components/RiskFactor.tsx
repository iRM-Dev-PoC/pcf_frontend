import { Card, CardHeader, Icon, List } from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";
// import {RadialChart} from "@ui5/webcomponents-react"

const RiskFactor = () => {
	return (
		<Card
			header={
				<CardHeader
					avatar={<Icon name="person-placeholder" />}
					status="3 of 5"
					subtitleText="Direct Reports"
					titleText="TeamSpace"
				/>
			}
			style={{
				width: "300px",
			}}>
			<List>
				<RadialChart
					color="#f0ab00"
					displayValue="50%"
					onClick={function _a() {}}
					onDataPointClick={function _a() {}}
					value={50}
				/>
			</List>
		</Card>
	);
};

export default RiskFactor;

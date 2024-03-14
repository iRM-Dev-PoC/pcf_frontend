import { Card, CardHeader } from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";
const RiskFactor = () => {
	return (
		<Card
			header={<CardHeader titleText="Risk Factor" />}
			style={{ width: "102%", height:"60%"}}>
			<RadialChart
      chartConfig={{
					endAngle: 0,
					startAngle: 180,
					innerRadius:200,
					outerRadius:140,
				}}
				displayValue="50%"
				onClick={function _a() {}}
				onDataPointClick={function _a() {}}
				value={50}
			/>
			
		</Card>
	);
};

export default RiskFactor;

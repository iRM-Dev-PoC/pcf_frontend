import { Card } from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";
const RiskFactor = () => {
	return (
		<Card className="w-[25rem] h-[14.6rem] mt-[0.9rem]">
			<RadialChart
				chartConfig={{
					endAngle: 0,
					startAngle: 180,
					innerRadius: 200,
					outerRadius: 140,
				}}
				color="#f0ab00"
				displayValue="50%"
				value={50}
			/>
		</Card>
	);
};

export default RiskFactor;

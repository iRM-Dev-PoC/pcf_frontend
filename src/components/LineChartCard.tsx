import { Card } from "@ui5/webcomponents-react";
import { LineChart } from "@ui5/webcomponents-react-charts";
import { lineChartData } from "../lib/lineChartData";

const LineChartCard = () => {
	return (
		<Card style={{ width: "100%", height: "100%", aspectRatio: "1" }}>
			<LineChart
				dataset={lineChartData}
				dimensions={[
					{
						accessor: "name",
					},
				]}
				measures={[
					{
						accessor: "users",
					},
					{
						accessor: "sessions",
					},
					{
						accessor: "volume",
					},
				]}
			/>
		</Card>
	);
};

export default LineChartCard;

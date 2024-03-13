import { Card } from "@ui5/webcomponents-react";
import { LineChart } from "@ui5/webcomponents-react-charts";
import { lineChartData } from "../lib/lineChartData";

const LineChartCard = () => {
	return (
		<Card>
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

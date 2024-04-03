import { Card } from "@ui5/webcomponents-react";
import { DonutChart } from "@ui5/webcomponents-react-charts";
import { chartData } from "../lib/donutChartData";

const DonutChartCard = () => {
    return (
        <Card>
            <DonutChart
                centerLabel="Users"
                chartConfig={{
                    innerRadius: "20%",
                    outerRadius: "90%",
                    // legendPosition: "middle",
                    // legendHorizontalAlign: "right",
                }}
                dataset={chartData}
                dimension={{
                    accessor: "name",
                }}
                measure={{
                    accessor: "users",
                }}
            />
        </Card>
    );
};

export default DonutChartCard;

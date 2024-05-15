import { chartData } from "@/lib/donutChartData";
import { Card } from "@ui5/webcomponents-react";
import { DonutChart } from "@ui5/webcomponents-react-charts";

const DonutChartCard = () => {
    return (
        <Card style={{ width: "100%", height: "100%", aspectRatio: "1" }}>
            <DonutChart
                centerLabel="Users"
                chartConfig={{
                    innerRadius: "20%",
                    outerRadius: "90%",
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

import type { donutChartsData } from "@/lib/types";
import { Card } from "@ui5/webcomponents-react";
import { DonutChart } from "@ui5/webcomponents-react-charts";

type DonutChartCardProps = {
    donutChartData: donutChartsData[];
};

const DonutChartCard = ({ donutChartData }: DonutChartCardProps) => {
    console.log(donutChartData);
    if (donutChartData.length === 0) return null;
    return (
        <Card>
            <DonutChart
                className="size-full"
                centerLabel="Users"
                chartConfig={{
                    innerRadius: "20%",
                    outerRadius: "90%",
                }}
                dataset={donutChartData}
                dimension={{
                    accessor: "FULL_NAME",
                }}
                measure={{
                    accessor: "EMPLOYEE_COUNT",
                }}
            />
        </Card>
    );
};

export default DonutChartCard;

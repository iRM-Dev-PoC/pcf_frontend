import type { donutChartsData } from "@/lib/types";
import { Card } from "@ui5/webcomponents-react";
import { DonutChart } from "@ui5/webcomponents-react-charts";

type DonutChartCardProps = {
    data: donutChartsData[];
};

const DonutChartCard = ({ data }: DonutChartCardProps) => {
    if (!data) return null;
    return (
        <Card>
            <DonutChart
                centerLabel="Users"
                chartConfig={{
                    innerRadius: "20%",
                    outerRadius: "90%",
                }}
                dataset={data}
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

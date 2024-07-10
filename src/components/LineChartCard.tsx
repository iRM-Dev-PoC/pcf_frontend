import type { lineChartData } from "@/types";
import { Card } from "@ui5/webcomponents-react";
import { LineChart } from "@ui5/webcomponents-react-charts";

type LineChartCardProps = {
    lineChartData: lineChartData[];
};

const LineChartCard = ({ lineChartData }: LineChartCardProps) => {
    if (lineChartData.length === 0) return null;
    return (
        <Card
            header={<div className="p-8 text-xl font-bold">Market Valuation</div>}
        >
            <LineChart
                className="size-full"
                dataset={lineChartData}
                dimensions={[
                    {
                        accessor: "ITEM_DESCRIPTION",
                    },
                ]}
                measures={[
                    {
                        accessor: "COST",
                        label: "Cost",
                    },
                    {
                        accessor: "NET_VALUE",
                        label: "Net Amount",
                    },
                    {
                        accessor: "TAX_AMOUNT",
                        label: "Tax Amount",
                    },
                ]}
            />
        </Card>
    );
};

export default LineChartCard;

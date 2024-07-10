import type { lineChartData } from "@/types";
import { Card } from "@ui5/webcomponents-react";
import { ColumnChart } from "@ui5/webcomponents-react-charts";

type ColumnChartCardProps = {
    columnChartData: lineChartData[];
};

const ColumnChartCard = ({ columnChartData }: ColumnChartCardProps) => {
    if (columnChartData.length === 0) return null;
    return (
        <Card header={<div className="p-8 text-xl font-bold">Market Valuation</div>}>
            <ColumnChart
                dataset={columnChartData}
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
                        hideDataLabel: true,
                        label: "Net Value",
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

export default ColumnChartCard;

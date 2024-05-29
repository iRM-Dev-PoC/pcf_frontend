import DonutChartCard from "@/components/DonutChartCard";
import LineChartCard from "@/components/LineChartCard";
import ColumnChartCard from "@/components/v2/ColumnChartCard";
import type { donutChartsData, lineChartData } from "@/lib/types";
import { FlexBox } from "@ui5/webcomponents-react";

type ChartsProps = {
    donutChartsData: donutChartsData[];
    lineChartData: lineChartData[];
    columnChartData: lineChartData[];
};

const Charts = ({
    donutChartsData,
    lineChartData,
    columnChartData,
}: ChartsProps) => {
    return (
        <>
            <FlexBox direction="Column" data-name="top">
                <div className="4xl:grid-cols-2 grid grid-cols-2 gap-2">
                    <DonutChartCard donutChartData={donutChartsData} />
                    <ColumnChartCard columnChartData={columnChartData} />
                    {lineChartData.length > 0 && (
                        <div className="col-span-2">
                            <LineChartCard lineChartData={lineChartData} />
                        </div>
                    )}
                </div>
            </FlexBox>
        </>
    );
};

export default Charts;

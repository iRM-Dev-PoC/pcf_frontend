import DonutChartCard from "@/components/DonutChartCard";
import LineChartCard from "@/components/LineChartCard";
import type { donutChartsData } from "@/lib/types";
import { FlexBox } from "@ui5/webcomponents-react";

type ChartsProps = {
    data: donutChartsData[];
};

const Charts = ({ data }: ChartsProps) => {
    return (
        <>
            <FlexBox direction="Column" data-name="top">
                <FlexBox data-name="AnalyticalCards" className="mt-0 gap-x-2 ">
                    <DonutChartCard data={data} />
                    <LineChartCard />
                </FlexBox>
            </FlexBox>
        </>
    );
};

export default Charts;

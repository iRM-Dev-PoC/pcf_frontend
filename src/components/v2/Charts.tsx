import DonutChartCard from "@/components/DonutChartCard";
import LineChartCard from "@/components/LineChartCard";
import { FlexBox } from "@ui5/webcomponents-react";

const Charts = () => {
    return (
        <>
            <FlexBox direction="Column" data-name="top">
                <FlexBox data-name="AnalyticalCards" className="mt-0 gap-x-2 ">
                    <DonutChartCard />
                    <LineChartCard />
                </FlexBox>
            </FlexBox>
        </>
    );
};

export default Charts;

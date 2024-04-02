import { DynamicPage, FlexBox } from "@ui5/webcomponents-react";
import DashboardCards from "../components/DashboardCards";
import { dasboardCardData } from "../lib/dashboardCardData";
import DashboardDatePicker from "../components/DashboardDatePicker";
import ActivityCard from "../components/ActivityCard";
import RiskFactor from "../components/RiskFactor";
import DonutChartCard from "../components/DonutChartCard";
import LineChartCard from "../components/LineChartCard";
import NonCompilantData from "../components/NonCompilantData";

const Dashboard = () => {
    return (
        <DynamicPage
            headerContentPinnable={false}
            showHideHeaderButton={false}
            headerContent={<DashboardDatePicker />}
        >
            <FlexBox direction="Column" data-name="parent">
                <FlexBox direction="Column" data-name="top">
                    {/* FlexBox for DashboardandActivityCardContainer and RiskFactor */}
                    <FlexBox
                        direction="Row"
                        className="gap-x-2"
                        data-name="DashboardAndRiskContainer"
                    >
                        {/* FlexBox for DashboardandActivityCardContainer */}
                        <FlexBox
                            style={{ width: "75%" }}
                            direction="Column"
                            data-name="DashboardandActivityCardContainer"
                        >
                            <FlexBox
                                direction="Row"
                                style={{ width: "100%" }}
                                data-name="ActivityCard"
                            >
                                <ActivityCard
                                    title="Activity"
                                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, obcaecati!"
                                />
                            </FlexBox>
                            <FlexBox
                                data-name="DashboardCards"
                                direction="Row"
                                className="gap-x-2 overflow-hidden"
                            >
                                {dasboardCardData.map((cardData, index) => (
                                    <DashboardCards
                                        key={index}
                                        header={cardData.header}
                                        description={cardData.description}
                                        count={cardData.count}
                                    />
                                ))}
                            </FlexBox>
                        </FlexBox>
                        {/* FlexBox for RiskFactor */}
                        <FlexBox
                            className="top-0"
                            data-name="RiskFactor"
                            direction="Column"
                        >
                            <RiskFactor />
                        </FlexBox>
                    </FlexBox>
                    {/* FlexBox for AnalyticalCards */}
                    <FlexBox
                        data-name="AnalyticalCards"
                        className="mt-0 gap-x-2 "
                    >
                        <DonutChartCard />
                        <LineChartCard />
                    </FlexBox>
                </FlexBox>
                <FlexBox className="mb-3 mt-4">
                    {/* FlexBox for Table */}
                    <NonCompilantData />
                </FlexBox>
            </FlexBox>
        </DynamicPage>
    );
};

export default Dashboard;

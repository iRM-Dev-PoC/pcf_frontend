import ActivityCard from "@/components/ActivityCard";
import DashboardCards from "@/components/DashboardCards";
import DonutChartCard from "@/components/DonutChartCard";
import ErrorComponent from "@/components/ErrorComponent";
import LineChartCard from "@/components/LineChartCard";
import Loading from "@/components/Loading";
import NonCompilantData from "@/components/NonCompilantData";
import RiskFactor from "@/components/RiskFactor";
import RiskCard from "@/components/v2/RiskCard";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import { getAllCardDataType, getControlDataType } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";
import {
    Button,
    ButtonDesign,
    FCLLayout,
    FlexBox,
    FlexibleColumnLayout,
    Toolbar,
    ToolbarDesign,
    ToolbarSpacer,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { Fragment, useState } from "react";

type FlexibleColumnTempleteProps = {
    dataCard: getAllCardDataType[];
};

const FlexibleColumnTemplete = ({ dataCard }: FlexibleColumnTempleteProps) => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isloading, setIsLoading] = useState(false);
    const [dasboardData, setDashboardData] = useState<
        getControlDataType | undefined
    >(undefined);

    const { selectedItem } = useSelectedItem();
    const hdrId = selectedItem?.ID;
    console.log(layout);
    const isTwoColumn = layout === "TwoColumnsMidExpanded";
    console.log("IsTwocolumn", isTwoColumn);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const onStartColumnClick = (e: any) => {
    //     const cardId = parseInt(e.detail.item.dataset.cardId);

    //     setSelectedCard(cardData.find((card) => card.id === cardId)!);
    //     setLayout(FCLLayout.TwoColumnsMidExpanded);
    // };

    const fetchAllControlData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/get-control-data`;

        try {
            setIsLoading(true);
            const reqBody = {
                id,
                hdrId,
            };
            const res = await axios.post(endPoint, reqBody);
            if (res?.data.statuscode !== 200) {
                setError("Something went wrong!");
            }
            return res.data;
        } catch (error) {
            console.error("[FLEXIBLECOMPONENTERROR]", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardClick = async (id: number) => {
        setLayout(FCLLayout.TwoColumnsMidExpanded);
        const res = await fetchAllControlData(id);
        const val: getControlDataType = res?.data;
        setDashboardData(val);
    };

    const nonCompilantDataRes = dasboardData?.violatedData;
    const activityCardDataRes = dasboardData?.control_data;
    const syncIdDataRes = dasboardData?.getSyncHeaderData;

    console.log(syncIdDataRes);

    if (error && !isloading) {
        <ErrorComponent />;
    }

    if (isloading && !error) {
        <Loading />;
    }

    return (
        <FlexibleColumnLayout
            hideArrows
            style={{
                height: "100%",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
            }}
            layout={layout}
            startColumn={
                <ul
                    className={cn(
                        "grid  grid-cols-1 gap-2 md:grid-cols-3",
                        isTwoColumn && "md:grid-cols-1"
                    )}
                >
                    {dataCard?.map((card) => (
                        <Fragment key={card?.ID}>
                            <RiskCard
                                title={card?.CHECK_POINT_NAME}
                                riskScore={formatNumber(card?.RISK_SCORE)}
                                desc={card?.CHECK_POINT_DESC}
                                info={card?.CHECK_POINT_DESC}
                                onClick={() => handleCardClick(card?.ID)}
                            />
                        </Fragment>
                    ))}
                </ul>
            }
            midColumn={
                <div className="m-2">
                    <Toolbar design={ToolbarDesign.Solid}>
                        <ToolbarSpacer />
                        <Button
                            icon="decline"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                setLayout(FCLLayout.OneColumn);
                            }}
                        />

                        {isFullScreen ? (
                            <Button
                                icon="exit-full-screen"
                                design={ButtonDesign.Transparent}
                                onClick={() => {
                                    setIsFullScreen(!isFullScreen);
                                    setLayout(FCLLayout.TwoColumnsMidExpanded);
                                }}
                            />
                        ) : (
                            <Button
                                icon="full-screen"
                                design={ButtonDesign.Transparent}
                                onClick={() => {
                                    setIsFullScreen(!isFullScreen);
                                    setLayout(FCLLayout.MidColumnFullScreen);
                                }}
                            />
                        )}
                    </Toolbar>
                    <Toolbar
                        // key={selectedCard.header}
                        style={{ height: "300px" }}
                    >
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
                                        title={
                                            activityCardDataRes
                                                ? activityCardDataRes.CHECK_POINT_NAME
                                                : ""
                                        }
                                        description={
                                            activityCardDataRes
                                                ? activityCardDataRes.CHECK_POINT_DESC
                                                : ""
                                        }
                                    />
                                </FlexBox>
                                <FlexBox
                                    data-name="DashboardCards"
                                    direction="Row"
                                    className="gap-x-2 overflow-hidden"
                                >
                                    <DashboardCards
                                        header="Base"
                                        description="Total Number of Rows in Base Data"
                                        count={
                                            dasboardData
                                                ? formatNumber(
                                                      dasboardData?.base_data_count
                                                  )
                                                : 0
                                        }
                                    />
                                    <DashboardCards
                                        header="Exception"
                                        description="Number of Exceptions in Report"
                                        count={
                                            dasboardData
                                                ? formatNumber(
                                                      dasboardData?.exception_count
                                                  )
                                                : 0
                                        }
                                    />
                                    <DashboardCards
                                        header="Deviation"
                                        description="Deviation Between Total Rows and Exception"
                                        count={
                                            dasboardData
                                                ? formatNumber(
                                                      dasboardData?.deviation_count
                                                  )
                                                : 0
                                        }
                                    />
                                </FlexBox>
                            </FlexBox>
                            <FlexBox
                                className="top-0"
                                data-name="RiskFactor"
                                direction="Column"
                            >
                                <RiskFactor
                                    layout={layout}
                                    value={
                                        dasboardData
                                            ? dasboardData?.risk_score
                                            : 0
                                    }
                                />
                            </FlexBox>
                        </FlexBox>
                    </Toolbar>

                    <FlexBox direction="Column" data-name="parent">
                        <FlexBox direction="Column" data-name="top">
                            <FlexBox
                                data-name="AnalyticalCards"
                                className="mt-0 gap-x-2 "
                            >
                                <DonutChartCard />
                                <LineChartCard />
                            </FlexBox>
                        </FlexBox>
                        <FlexBox className="mb-3 mt-4">
                            <NonCompilantData
                                nonCompilantDataRes={nonCompilantDataRes}
                            />
                        </FlexBox>
                    </FlexBox>
                </div>
            }
        />
    );
};

export default FlexibleColumnTemplete;

import {
    Button,
    ButtonDesign,
    FCLLayout,
    FlexBox,
    FlexibleColumnLayout,
    List,
    Toolbar,
    ToolbarDesign,
    ToolbarSpacer,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { Fragment, useState } from "react";
import cardData from "../lib/cardData";
import { formatNumber } from "../lib/formatNumber";
import {
    dataCardType,
    getAllCardDataType,
    getControlDataType,
} from "../utils/types";
import ActivityCard from "./ActivityCard";
import DashboardCards from "./DashboardCards";
import DonutChartCard from "./DonutChartCard";
import LineChartCard from "./LineChartCard";
import NonCompilantData from "./NonCompilantData";
import RiskCard from "./RiskCard";
import RiskFactor from "./RiskFactor";

type FlexibleColumnTempleteProps = {
    dataCard: getAllCardDataType[];
};

const FlexibleColumnTemplete = ({ dataCard }: FlexibleColumnTempleteProps) => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<dataCardType>(cardData[0]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isloading, setIsLoading] = useState(false);
    const [dasboardData, setDashboardData] = useState<
        getControlDataType | undefined
    >(undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const cardId = parseInt(e.detail.item.dataset.cardId);

        setSelectedCard(cardData.find((card) => card.id === cardId)!);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };
    const fetchData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/get-control-data`;
        try {
            setIsLoading(true);
            const reqBody = {
                id,
                hdrId: 51,
            };
            const res = await axios.post(endPoint, reqBody);
            if (res?.data.statuscode !== 200) {
                setError("Something went wrong!");
            }
            return res.data;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardClick = async (id: number) => {
        setLayout(FCLLayout.TwoColumnsMidExpanded);
        const res = await fetchData(id);
        const val: getControlDataType = res?.data;
        setDashboardData(val);
    };

    const nonCompilantDataRes = dasboardData?.violatedData;
    const activityCardDataRes = dasboardData?.control_data;
    // const baseDataRes = dasboardCardData[0];
    // const exceptionDataRes = dasboardCardData[1];
    // const deviationDataRes = dasboardCardData[2];

    console.log("dasboardCardData", dasboardData?.base_data_count);
    // const cardDataRes = {
    // baseData: dasboardData?.base_data_count,
    // exceptionData: dasboardData?.exception_count,
    // daviationData: dasboardData?.deviation_count,
    // };

    // const cardDataRes = [
    //     {
    //         header: "Base",
    //         baseData: dasboardData?.base_data_count,
    //     },
    //     {
    //         header: "Exception",
    //         exceptionData: dasboardData?.exception_count,
    //     },
    //     {
    //         header: "Daviation",
    //         daviationData: dasboardData?.deviation_count,
    //     },
    // ];

    // console.log("exceptionDataRes", exceptionDataRes);
    // console.log("deviationDataRes", deviationDataRes);

    console.log(error);
    console.log(isloading);

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
                <List
                    onItemClick={onStartColumnClick}
                    key={`${selectedCard.header}-${selectedCard.id}`}
                >
                    {dataCard?.map((card) => (
                        <Fragment key={card?.ID}>
                            <RiskCard
                                header={card?.CHECK_POINT_NAME}
                                risk={formatNumber(card?.RISK_SCORE)}
                                description={card?.CHECK_POINT_DESC}
                                onClick={() => handleCardClick(card?.ID)}
                            />
                        </Fragment>
                    ))}
                </List>
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
                        key={selectedCard.header}
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

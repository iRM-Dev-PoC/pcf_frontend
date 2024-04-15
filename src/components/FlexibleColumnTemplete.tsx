import { useState } from "react";
import {
    List,
    Toolbar,
    ToolbarSpacer,
    Button,
    FlexBox,
    ToolbarDesign,
    FCLLayout,
    FlexibleColumnLayout,
    ButtonDesign,
} from "@ui5/webcomponents-react";
import { dataCardType } from "../utils/types";
import RiskCard from "./RiskCard";
import cardData from "../lib/cardData";
import NonCompilantData from "./NonCompilantData";
import DonutChartCard from "./DonutChartCard";
import LineChartCard from "./LineChartCard";
import RiskFactor from "./RiskFactor";
import { dasboardCardData } from "../lib/dashboardCardData";
import DashboardCards from "./DashboardCards";
import ActivityCard from "./ActivityCard";

type FlexibleColumnTempleteProps = {
    dataCard: dataCardType[];
};

const FlexibleColumnTemplete = ({ dataCard }: FlexibleColumnTempleteProps) => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<dataCardType>(cardData[0]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const cardId = parseInt(e.detail.item.dataset.cardId);
        setSelectedCard(cardData.find((card) => card.id === cardId)!);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    const handleCardClick = ({ data }: { data: dataCardType }) => {
        console.table(data);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

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
                    {dataCard.map((card, index) => (
                        <>
                            <RiskCard
                                key={`${index}-${card.id}-${card.header}-${card.risk}`}
                                header={card.header}
                                icon={card.icon}
                                risk={card.risk}
                                description={card.description}
                                onClick={() => handleCardClick({ data: card })}
                            />
                        </>
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
                            <FlexBox
                                className="top-0"
                                data-name="RiskFactor"
                                direction="Column"
                            >
                                <RiskFactor layout={layout} />
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
                            <NonCompilantData />
                        </FlexBox>
                    </FlexBox>
                </div>
            }
        />
    );
};

export default FlexibleColumnTemplete;

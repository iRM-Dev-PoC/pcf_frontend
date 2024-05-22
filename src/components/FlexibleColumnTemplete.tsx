import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import NonCompilantData from "@/components/NonCompilantData";
import Charts from "@/components/v2/Charts";
import DashboardCardList from "@/components/v2/DashboardCardList";
import DashboardToolbar from "@/components/v2/DashboardToolbar";
import DashboardTopCards from "@/components/v2/DashboardTopCards";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import { getAllCardDataType, getControlDataType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
    FCLLayout,
    FlexBox,
    FlexibleColumnLayout,
    Toolbar,
    ToolbarDesign,
    ToolbarSpacer,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useState } from "react";

type FlexibleColumnTempleteProps = {
    dataCard: getAllCardDataType[];
};

const FlexibleColumnTemplete = ({ dataCard }: FlexibleColumnTempleteProps) => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    // const [isFullScreen, setIsFullScreen] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isloading, setIsLoading] = useState(false);
    const [dasboardData, setDashboardData] = useState<
        getControlDataType | undefined
    >(undefined);
    const [clickedCard, setClickedCard] = useState<
        getAllCardDataType | undefined
    >(undefined);

    const { selectedItem } = useSelectedItem();
    const hdrId = selectedItem?.ID;
    const isTwoColumn = layout === "TwoColumnsMidExpanded";

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
        //this sets two column mid expanded for the flexible column layout
        // setLayout(FCLLayout.TwoColumnsMidExpanded);

        //this sets two column mid fullscreen for the flexible column layout
        setLayout(FCLLayout.MidColumnFullScreen);
        const res = await fetchAllControlData(id);
        const val: getControlDataType = res?.data;
        setDashboardData(val);
        const index = dataCard.findIndex((data) => data.ID === id);
        setClickedCard(dataCard[index]);
    };

    const nonCompilantDataRes = dasboardData?.violatedData;

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
                    <DashboardCardList
                        dataCard={dataCard}
                        isTwoColumn={isTwoColumn}
                        onClick={handleCardClick}
                    />
                </ul>
            }
            midColumn={
                <div className="m-2">
                    <Toolbar design={ToolbarDesign.Solid}>
                        <ToolbarSpacer />

                        <DashboardToolbar
                            // isFullScreen={isFullScreen}
                            // setIsFullScreen={setIsFullScreen}
                            setLayout={setLayout}
                        />
                    </Toolbar>

                    {/* Dashboard top cards */}
                    <DashboardTopCards
                        activityCardData={clickedCard}
                        dashboardCardsData={dasboardData}
                    />

                    <FlexBox direction="Column" data-name="parent">
                        {/* Charts */}
                        <Charts />

                        {/* Datatable */}
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

import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
// import NonCompilantData from "@/components/NonCompilantData";
import Charts from "@/components/v2/Charts";
import DashboardCardList from "@/components/v2/DashboardCardList";
import DashboardToolbar from "@/components/v2/DashboardToolbar";
import DashboardTopCards from "@/components/v2/DashboardTopCards";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { getAllCardDataType, getControlDataType } from "@/types";
import {
    Card,
    FCLLayout,
    FlexBox,
    FlexibleColumnLayout,
    Toolbar,
    ToolbarSpacer,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useState, useEffect } from "react";
import PivotTable from "./v2/PivotTable";

const FlexibleColumnTemplate = ({
    dataCard,
    filterData,
}: {
    dataCard: getAllCardDataType[];
    filterData: any;
}) => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false); // Changed isloading to isLoading
    const [dashboardData, setDashboardData] = useState<
        getControlDataType | undefined
    >(undefined);
    const [clickedCard, setClickedCard] = useState<
        getAllCardDataType | undefined
    >(undefined);
    const { isSidebarCollapsed } = useSidebar();

    const { selectedItem } = useSelectedItem();
    const hdrId = selectedItem?.ID;

    const fetchAllControlData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/get-control-data`;
        try {
            setIsLoading(true); // Changed isloading to isLoading
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
            console.error(error);
            setError("Error fetching data"); // Set error in case of exception
        } finally {
            setIsLoading(false); // Changed isloading to isLoading
        }
    };

    const handleCardClick = async (id: number) => {
        setLayout(FCLLayout.MidColumnFullScreen);
        setDashboardData(undefined); // Clear previous data
        setClickedCard(undefined); // Clear previous clicked card
        const res = await fetchAllControlData(id);
        if (res?.data) { // Check if res.data is available
            const val: getControlDataType = res.data;
            setDashboardData(val);
            const index = dataCard.findIndex((data) => data.ID === id);
            setClickedCard(dataCard[index]);
        }
    };

    useEffect(() => {
        if (clickedCard) {
            fetchAllControlData(clickedCard.ID);
        }
    }, [clickedCard]);

    // const nonCompliantDataRes = dashboardData?.violatedData; // Corrected spelling error
    const donutChartData = dashboardData?.donutChartData; 
    const lineChartData = dashboardData?.lineChartData;
    const columnChartData = dashboardData?.columnChartData;

    if (error && !isLoading) { // Updated condition to return component
        return <ErrorComponent />;
    }

    if (isLoading && !error) { // Updated condition to return component
        return <Loading />;
    }

    return (
        <FlexibleColumnLayout
            hideArrows
            style={{
                height: "100%",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                transition: "all 0.3s ease-in-out"
            }}
            layout={layout}
            startColumn={
                <ul
                    className={cn(
                        "grid grid-cols-1 gap-2 transition-all sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4",
                        !isSidebarCollapsed && "xl:grid-cols-3"
                    )}
                >
                    <DashboardCardList
                        dataCard={filterData}
                        onClick={handleCardClick}
                    />
                </ul>
            }
            midColumn={
                <div className="m-2">
                    <Toolbar>
                        <ToolbarSpacer />
                        <DashboardToolbar setLayout={setLayout} />
                    </Toolbar>

                    {/* Dashboard top cards */}
                    <DashboardTopCards
                        activityCardData={clickedCard}
                        dashboardCardsData={dashboardData}
                        baseAllData={dashboardData?.baseAllData}
                        exceptionData={dashboardData?.violatedData}
                        baseAllData1={dashboardData?.baseAllData1}
                        baseAllData2={dashboardData?.baseAllData2}
                        boxPloting={dashboardData?.boxPloting}
                    />

                    <FlexBox direction="Column" data-name="parent">
                        {/* Charts */}
                        <Charts
                            donutChartsData={
                                donutChartData ? donutChartData : []
                            }
                            lineChartData={lineChartData ? lineChartData : []}
                            columnChartData={
                                columnChartData ? columnChartData : []
                            }
                        />

                        {/* Datatable */}
                        {/* <FlexBox className="mb-3 mt-4 p-72">
                            <NonCompilantData
                                nonCompliantDataRes={
                                    nonCompliantDataRes
                                        ? nonCompliantDataRes
                                        : []
                                }
                            />
                        </FlexBox> */}
                        <Card className="p-98">
                        {dashboardData && (
                                <PivotTable pivotData={dashboardData?.pivotData} />
                            )} 
                        </Card>
                    </FlexBox>
                </div>
            }
        />
    );
};

export default FlexibleColumnTemplate;

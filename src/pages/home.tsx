import FilterBarComponent from "@/components/FilterBarComponent";
import FlexibleColumnTemplete from "@/components/FlexibleColumnTemplete";
import "@/css/dynamicPage.css";
import { getAllCardDataType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
    DynamicPage,
    DynamicPageHeader,
    DynamicPageTitle,
    MessageStrip,
    Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [error, setError] = useState(false);
    const [filterData, setFilterData] = useState<any>([]);
    const [resetKey, setResetKey] = useState(0); // Add a state to force a reset

    const getAllControlCheckPoint = async () => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
        try {
            const res = await axios.post(endPoint);
            if (res.data?.statuscode === 200) {
                setError(false);
            } else {
                setError(true);
            }
            return res.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const {
        data: cardData,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["allcardData"],
        queryFn: getAllControlCheckPoint,
        retry: 3,
    });

    const fetchCardsData = async (syncId?: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
        try {
            let syncId;
            const lastSyncId = async () => {
                const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/data-sync/get-all-headers`;
                const res = await axios.get(endPoint);
                if (res.data?.statuscode === 200) {
                   syncId = res.data.data[0].ID;
                } else {
                    throw new Error("Error fetching data");
                }
            };
            await lastSyncId();
            const reqData = {
                typeOfControlsId: 0,
                hdrId: syncId,
            };

            if (syncId) {
                reqData['syncId'] = syncId;
            }

            const response = await axios.post(endPoint, reqData);
            console.log("response", response);
            if (response.data.statuscode !== 201) {
                setFilterData(response);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const resetFilters = () => {
        setResetKey(prevKey => prevKey + 1); // Increment the reset key to force component reset
        setFilterData([]); // Clear filter data
    };

    useEffect(() => {
        fetchCardsData();
    }, [resetKey]); // Re-fetch data on reset

    const cardValue: getAllCardDataType[] = cardData?.data;

    return (
        <DynamicPage
            className="dynamicPage"
            headerContent={
                <DynamicPageHeader>
                    <FilterBarComponent 
                        setFilterData={setFilterData} 
                        resetFilters={resetFilters} 
                    />
                </DynamicPageHeader>
            }
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            A Dashboard is a visual interface that presents key
                            information and data in a consolidated view for
                            quick insights and decision-making.
                        </MessageStrip>
                    }
                    header={<Title>Dashboard</Title>}
                ></DynamicPageTitle>
            }
            style={{
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            {Object.keys(filterData).length > 0 ? (
                <FlexibleColumnTemplete
                    dataCard={cardValue}
                    filterData={filterData.data.data}
                />
            ) : (
                ""
            )}
        </DynamicPage>
    );
};

export default Home;

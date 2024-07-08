import ErrorComponent from "@/components/ErrorComponent";
import FilterBarComponent from "@/components/FilterBarComponent";
import FlexibleColumnTemplete from "@/components/FlexibleColumnTemplete";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
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
import { Suspense, useState } from "react";

const Home = () => {
    const [error, setError] = useState(false);

    const getAllControlCheckPoint = async () => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
        try {
            const res = await axios.get(endPoint);
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

    const cardValue: getAllCardDataType[] = cardData?.data;

    return (
        <DynamicPage
            className="dynamicPage"
            headerContent={
                <DynamicPageHeader>
                    <FilterBarComponent />
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
            <Suspense fallback={<Loading />}>
                {isFetching && <Loading />}
                {error || isError ? (
                    <ErrorComponent />
                ) : !isFetching && cardValue.length === 0 ? (
                    <NoDataComponent />
                ) : (
                    <FlexibleColumnTemplete dataCard={cardValue} />
                )}
            </Suspense>
        </DynamicPage>
    );
};
export default Home;

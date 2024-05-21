import ErrorComponent from "@/components/ErrorComponent";
import FilterBarComponent from "@/components/FilterBarComponent";
import FlexibleColumnTemplete from "@/components/FlexibleColumnTemplete";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
import { getAllCardDataType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
    DatePicker,
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
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
    const [error, setError] = useState(false);

    const getAllControlCheckPoint = async () => {
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

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allcardData"],
        queryFn: getAllControlCheckPoint,
        retry: 3,
    });

    const cardValue: getAllCardDataType[] = data?.data;

    return (
        <DynamicPage
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
                    actions={
                        <>
                            <DatePicker
                                onChange={function _a() {}}
                                onInput={function _a() {}}
                                onValueStateChange={function _a() {}}
                                primaryCalendarType="Gregorian"
                                valueState="None"
                                placeholder="Start Date"
                            />
                            <DatePicker
                                onChange={function _a() {}}
                                onInput={function _a() {}}
                                onValueStateChange={function _a() {}}
                                primaryCalendarType="Gregorian"
                                valueState="None"
                                placeholder="End Date"
                            />
                        </>
                    }
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

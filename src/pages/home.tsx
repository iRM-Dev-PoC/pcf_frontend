// // import ErrorComponent from "@/components/ErrorComponent";
// // import FilterBarComponent from "@/components/FilterBarComponent";
// // import FlexibleColumnTemplete from "@/components/FlexibleColumnTemplete";
// // import Loading from "@/components/Loading";
// // import NoDataComponent from "@/components/NoDataComponent";
// // import "@/css/dynamicPage.css";
// // import { getAllCardDataType } from "@/types";
// // import { useQuery } from "@tanstack/react-query";
// // import {
// //     DynamicPage,
// //     DynamicPageHeader,
// //     DynamicPageTitle,
// //     MessageStrip,
// //     Title,
// // } from "@ui5/webcomponents-react";
// // import { ThemingParameters } from "@ui5/webcomponents-react-base";
// // import axios from "axios";
// // import { Suspense, useState } from "react";

// // const Home = () => {
// //     const [error, setError] = useState(false);

// //     const getAllControlCheckPoint = async () => {
// //         const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
// //         try {
// //             const res = await axios.get(endPoint);
// //             if (res.data?.statuscode === 200) {
// //                 setError(false);
// //             } else {
// //                 setError(true);
// //             }
// //             return res.data;
// //         } catch (error) {
// //             console.error(error);
// //             setError(true);
// //         }
// //     };

// //     const {
// //         data: cardData,
// //         isFetching,
// //         isError,
// //     } = useQuery({
// //         queryKey: ["allcardData"],
// //         queryFn: getAllControlCheckPoint,
// //         retry: 3,
// //     });

// //     const cardValue: getAllCardDataType[] = cardData?.data;

// //     return (
// //         <DynamicPage
// //             className="dynamicPage"
// //             headerContent={
// //                 <DynamicPageHeader>
// //                     <FilterBarComponent />
// //                 </DynamicPageHeader>
// //             }
// //             headerTitle={
// //                 <DynamicPageTitle
// //                     expandedContent={
// //                         <MessageStrip>
// //                             A Dashboard is a visual interface that presents key
// //                             information and data in a consolidated view for
// //                             quick insights and decision-making.
// //                         </MessageStrip>
// //                     }
// //                     header={<Title>Dashboard</Title>}
// //                 ></DynamicPageTitle>
// //             }
// //             style={{
// //                 borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
// //             }}
// //             showHideHeaderButton={false}
// //             headerContentPinnable={false}
// //         >
// //             <Suspense fallback={<Loading />}>
// //                 {isFetching && <Loading />}
// //                 {error || isError ? (
// //                     <ErrorComponent />
// //                 ) : !isFetching && cardValue.length === 0 ? (
// //                     <NoDataComponent />
// //                 ) : (
// //                     <FlexibleColumnTemplete dataCard={cardValue} />
// //                 )}
// //             </Suspense>
// //         </DynamicPage>
// //     );
// // };
// // export default Home;
// // commented by prity for future changes

// import FilterBarComponent from "@/components/FilterBarComponent";
// import FlexibleColumnTemplete from "@/components/FlexibleColumnTemplete";
// import "@/css/dynamicPage.css";
// import { getAllCardDataType } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import {
//     DynamicPage,
//     DynamicPageHeader,
//     DynamicPageTitle,
//     MessageStrip,
//     Title,
// } from "@ui5/webcomponents-react";
// import { ThemingParameters } from "@ui5/webcomponents-react-base";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const Home = () => {
//     const [error, setError] = useState(false);
//     const [filterData, setFilterData] = useState<any>([]);
//     console.log("ResponsefilterData", filterData?.data?.data);
//     const getAllControlCheckPoint = async () => {
//         const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
//         try {
//             const res = await axios.post(endPoint);
//             if (res.data?.statuscode === 200) {
//                 setError(false);
//             } else {
//                 setError(true);
//             }
//             return res.data;
//         } catch (error) {
//             console.error(error);
//             setError(true);
//         }
//     };

//     const {
//         data: cardData,
//         isFetching,
//         isError,
//     } = useQuery({
//         queryKey: ["allcardData"],
//         queryFn: getAllControlCheckPoint,
//         retry: 3,
//     });

//     const fetchCardsData = async () => {
//         const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/control-checkpoints`;
//         try {
//             const reqData = {
//                 // "syncId": 1,
//                 typeOfControlsId: 0,
//                 // "startDate": "2024-07-04",
//                 // "endDate": "2024-07-11"
//             };
//             const response = await axios.post(endPoint, reqData);
//             console.log("response", response);
//             if (response.data.statuscode !== 201) {
//                 // throw new Error(response.data?.message);
//                 setFilterData(response);
//             }

//             // return response.data;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     };

//     useEffect(() => {
//         fetchCardsData();
//     }, []);

//     const cardValue: getAllCardDataType[] = cardData?.data;
    
//     return (
//         <DynamicPage
//             className="dynamicPage"
//             headerContent={
//                 <DynamicPageHeader>
//                     <FilterBarComponent setFilterData={setFilterData} />
//                 </DynamicPageHeader>
//             }
//             headerTitle={
//                 <DynamicPageTitle
//                     expandedContent={
//                         <MessageStrip>
//                             A Dashboard is a visual interface that presents key
//                             information and data in a consolidated view for
//                             quick insights and decision-making.
//                         </MessageStrip>
//                     }
//                     header={<Title>Dashboard</Title>}
//                 ></DynamicPageTitle>
//             }
//             style={{
//                 borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
//             }}
//             showHideHeaderButton={false}
//             headerContentPinnable={false}
//         >
//             {/* <Suspense fallback={<Loading />}>
//                 {isFetching && <Loading />}
//                 {error || isError ? (
//                     <ErrorComponent />
//                 ) : !isFetching && cardValue.length === 0 ? (
//                     <NoDataComponent />
//                 ) : ( */}
//             {Object.keys(filterData).length > 0 ? (
//                 <FlexibleColumnTemplete
//                     dataCard={cardValue}
//                     filterData={filterData.data.data}
//                 />
//             ) : (
//                 ""
//             )}

//             {/* )}
//             </Suspense> */}
//         </DynamicPage>
//     );
// };
// export default Home;
 
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
    console.log("ResponsefilterData", filterData?.data?.data);
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
            const reqData = {
                typeOfControlsId: 0,
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

    useEffect(() => {
        // Fetch data for all syncs initially
        fetchCardsData();
    }, []);

    const cardValue: getAllCardDataType[] = cardData?.data;

    return (
        <DynamicPage
            className="dynamicPage"
            headerContent={
                <DynamicPageHeader>
                    <FilterBarComponent setFilterData={setFilterData} />
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

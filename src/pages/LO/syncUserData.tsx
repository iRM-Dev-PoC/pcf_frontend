// // import FileUploaderComponent from "@/components/FileUploader";
// import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";
// import {
//     Bar,
//     Button,
//     ButtonDomRef,
//     DynamicPage,
//     DynamicPageTitle,
//     MessageStrip,
//     Modals,
//     Title,
// } from "@ui5/webcomponents-react";
// import { ThemingParameters } from "@ui5/webcomponents-react-base";
// import { BarChart } from "lucide-react";
// import { useRef } from "react";

// const syncUserData = () => {
//     const showDialog = Modals.useShowDialog();
//     const closeButtonref = useRef<ButtonDomRef>(null);

//     return (
//         <DynamicPage
//             className="dynamicPage"
//             headerTitle={
//                 <DynamicPageTitle
//                     header={<Title>Sync User Details</Title>}
//                     actions={
//                         <Button
//                             design="Emphasized"
//                             tooltip="Upload"
//                             icon="upload-to-cloud"
//                             onClick={() => {
//                                 const { close } = showDialog({
//                                     headerText: "Click to select a file",
//                                     // children: (
//                                     //     <FileUploaderComponent
//                                     //         closeButtonref={closeButtonref}
//                                     //     />
//                                     // ),
//                                     footer: (
//                                         <Bar
//                                             endContent={
//                                                 <>
//                                                     <Button
//                                                         ref={closeButtonref}
//                                                         onClick={() => close()}
//                                                         design="Negative"
//                                                     >
//                                                         Close
//                                                     </Button>
//                                                 </>
//                                             }
//                                         ></Bar>
//                                     ),
//                                 });
//                             }}
//                         >
//                             Upload
//                         </Button>
//                     }
//                     snappedContent={
//                         <MessageStrip>
//                            The SAP BTP License Optimization sync reports retrieve user details, roles, activity logs, and license consumption data from SAP BTP to ensure accurate and up-to-date license allocations within the License Optimization app.
//                         </MessageStrip>
//                     }
//                 ></DynamicPageTitle>
//             }
//             style={{
//                 borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
//             }}
//             showHideHeaderButton={false}
//             headerContentPinnable={false}
//         >  
//         </DynamicPage>
//     );
// };

// export default syncUserData;


import BarChart from "@/components/LO/Charts/BarChart";
// import LineChart from "@/components/LO/Charts/LineChart";
import StackedBarChart from "@/components/LO/Charts/StackedBarChart";
import TrendAnalysisChart from "@/components/LO/Charts/TrendAnalysisChart";
import { seriesData, categories } from "@/mockLOData/Sync_1_Data/ExpensesData";
import { PrivelegeService } from "@/mockLOData/Sync_1_Data/PrivelegeCountServiceData";
import { RecalculatedPriceData } from "@/mockLOData/Sync_1_Data/RecalculatedPriceData";
import { UserCountServiceData } from "@/mockLOData/Sync_1_Data/UserCountServiceData";
import "@ui5/webcomponents-fiori/dist/illustrations/UploadToCloud.js";
import {
    Bar, Button, ButtonDomRef, DynamicPage, DynamicPageTitle,
    MessageStrip, Modals, Title
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { useRef } from "react";

const syncUserData = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonref = useRef<ButtonDomRef>(null);

    return (
        <DynamicPage
            className="dynamicPage"
            headerTitle={
                <DynamicPageTitle
                    header={<Title>Sync User Details</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Upload"
                            icon="upload-to-cloud"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Click to select a file",
                                    footer: (
                                        <Bar
                                            endContent={
                                                <>
                                                    <Button
                                                        ref={closeButtonref}
                                                        onClick={() => close()}
                                                        design="Negative"
                                                    >
                                                        Close
                                                    </Button>
                                                </>
                                            }
                                        ></Bar>
                                    ),
                                });
                            }}
                        >
                            Upload
                        </Button>
                    }
                    snappedContent={
                        <MessageStrip>
                            The SAP BTP License Optimization sync reports retrieve user details, roles, activity logs, and license consumption data from SAP BTP to ensure accurate and up-to-date license allocations within the License Optimization app.
                        </MessageStrip>
                    }
                ></DynamicPageTitle>
            }
            style={{
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <div className="grid grid-cols-2 gap-5">
                {/* <BarChart data={PrivelegeService} title={"Privelege Count By Service"} /> */}
                {/* <BarChart data={UserCountServiceData} title={"User Count Services"} /> */}
                <StackedBarChart data={seriesData} categories={categories} title={"Over Expenses(In USD) Vs User Count By Subscription Type"} />
                {/* <BarChart data={RecalculatedPriceData} title={"Recalculated Service"} /> */}
                <TrendAnalysisChart />
                {/* <LineChart/> */}
            </div>    
        </DynamicPage>
    );
};

export default syncUserData;


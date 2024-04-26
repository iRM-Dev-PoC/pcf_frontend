// import {
//     AnalyticalTable,
//     Button,
//     Card,
//     FlexBox,
//     TextAlign,

// } from "@ui5/webcomponents-react";
// import { reportData } from "../lib/reportData";
// import { webComponentsReactProps } from "../utils/types";

// const ReportDetails = () => {
//     return (
//         <Card>
//             <AnalyticalTable
//                 columns={[
//                     {
//                         Header: "Report_ID",
//                         accessor: "report_ID",
//                         hAlign: "center" as TextAlign,
//                     },
//                     {
//                         Header: "Report Name",
//                         accessor: "report_name",
//                         headerTooltip: "Full Name",
//                         hAlign: "center" as TextAlign,
//                     },
//                     {
//                         Header: "Customer ID",
//                         accessor: "customer_ID",
//                         headerTooltip: "Full Name",
//                         hAlign: "center" as TextAlign,
//                     },
//                     {
//                         Header: "Created By",
//                         accessor: "created_By",
//                         hAlign: "center" as TextAlign,
//                     },
//                     {
//                         Cell: (instance: {
//                             cell: string;
//                             row: string;
//                             webComponentsReactProperties: webComponentsReactProps;
//                         }) => {
//                             const { webComponentsReactProperties } = instance;
//                             const isOverlay =
//                                 webComponentsReactProperties.showOverlay;
//                             return (
//                                 <FlexBox>
//                                     <Button
//                                         icon="create-entry-time"
//                                         disabled={isOverlay}
//                                     />
//                                 </FlexBox>
//                             );
//                         },
//                         Header: "Created At",
//                         accessor: ".",
//                         disableFilters: true,
//                         disableGroupBy: true,
//                         disableResizing: true,
//                         disableSortBy: true,
//                         id: "created_at",
//                         width: 100,
//                     },

//                     {
//                         Cell: (instance: {
//                             cell: string;
//                             row: string;
//                             webComponentsReactProperties: webComponentsReactProps;
//                         }) => {
//                             const { webComponentsReactProperties } = instance;
//                             const isOverlay =
//                                 webComponentsReactProperties.showOverlay;

//                             return (
//                                 <FlexBox>
//                                     <Button
//                                         icon="add-document"
//                                         disabled={isOverlay}
//                                     />
//                                     <Button icon="edit" disabled={isOverlay} />
//                                     <Button
//                                         icon="delete"
//                                         disabled={isOverlay}
//                                     />
//                                 </FlexBox>
//                             );
//                         },
//                         Header: "Actions",
//                         accessor: ".",
//                         disableFilters: true,
//                         disableGroupBy: true,
//                         disableResizing: true,
//                         disableSortBy: true,
//                         id: "actions",
//                         width: 150,
//                         hAlign: "center" as TextAlign,
//                     },
//                 ]}
//                 data={reportData.map((item) => ({
//                     report_ID: item.report_ID,
//                     report_name: item.report_name,
//                     customer_ID: item.customer_ID,
//                     created_By: item.created_By,
//                 }))}
//                 filterable
//                 infiniteScroll
//                 alternateRowColor
//                 rowHeight={44}
//                 selectedRowIds={{
//                     3: true,
//                 }}
//                 selectionMode="None"
//             />
//         </Card>
//     );
// };

// export default ReportDetails;



import { useState } from "react";
import {
    List,
    StandardListItem,
    Toolbar,
    Title,
    ToolbarSpacer,
    Button,
    Avatar,
    FlexBox,
    Label,
    Text,
    ToolbarDesign,
    AvatarSize,
    FCLLayout,
    FlexibleColumnLayout,
    ButtonDesign,
    FlexBoxDirection,
    MessageBoxTypes,
    MessageBoxActions,
    Modals,
    Card,
} from "@ui5/webcomponents-react";
import {  getAllModuleType } from "../utils/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import ReportEditForm from "./ReportEditForm";


const ReportDetails = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<getAllModuleType|undefined>(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();
    
    const fetchData = async () => {
        try {
            const endPointAllReports = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-master/get-all-reports`;
            const response = await fetch(endPointAllReports);
            if (!response.ok) {
                setError(true);
            }
            setError(false);
            return response.json();
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allReportData"],
        queryFn: fetchData,
        retry: 3,
    });
    
    const deleteReportData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-master/delete-report`;
        try {
            const data ={
                id,
                customer_id: 1,
            }
            const response = await axios.patch(endPoint,data)
            if (response.data?.statuscode === 400) {
                setError(true);
                throw response.data?.message;
            }
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
            throw error;
        }
    };

    const handleDeleteModule = async (id: number) => {
        await toast.promise(deleteReportData(id), {
            loading: "Deleting Report...",
            success: "Report deleted successfully!",
            error: (error) => `Failed to delete report: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allReportData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    }
 
    const reportDataRes = data;

    const allReportData: getAllModuleType[] = reportDataRes?.data;

    if (isError || error) {
        return (
            <StandardListItem className="pointer-events-none">
                Something went wrong!
            </StandardListItem>
        );
    }

    if (isFetching) {
        return (
            <StandardListItem className="pointer-events-none">
                <Loading />
            </StandardListItem>
        );
    }

    if (!isFetching &&  allReportData === undefined) {
        return (
            <StandardListItem className="pointer-events-none">
                Something went wrong!
            </StandardListItem>
        );
    }

    if (!isFetching && data?.statuscode === 500) {
        return (
            <StandardListItem className="pointer-events-none">
                Something went wrong!
            </StandardListItem>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const reportId = parseInt(e.detail.item.dataset.moduleId);
        const report = allReportData.find((report) => Number(report.ID) === reportId);
        setSelectedReport(report);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <FlexibleColumnLayout
            style={{
                height: "100%",
                width:"100%",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
            }}
            layout={layout}
            startColumn={
                <List onItemClick={onStartColumnClick}>
                 
                 {allReportData.length === 0 && (
                        <StandardListItem className="pointer-events-none">
                            No reports found!
                        </StandardListItem>
                    )}
                
                    {allReportData?.map((report, index) => (
                        <StandardListItem
                            // description={module.REPORT_DESC}
                            data-report-id={report.ID}
                            key={`${report.ID}-${index}`}
                        >
                            {report.REPORT_NAME}
                        </StandardListItem>
                    ))}
                </List>
            }
            midColumn={
                <>
                    <Toolbar design={ToolbarDesign.Solid}>
                        <Title> {selectedReport?.REPORT_NAME} </Title>
                        <ToolbarSpacer />

                       {isFullScreen ? (
                            <Button
                                icon="exit-full-screen"
                                design={ButtonDesign.Transparent}
                                onClick={() => {
                                    setIsFullScreen(!isFullScreen);
                                    setLayout(
                                        FCLLayout.TwoColumnsStartExpanded
                                    );
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
                        <Button
                            icon="delete"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                showDeleteConfirmation({
                                    onClose(event) {
                                        if (event.detail.action === "Delete") {
                                            handleDeleteModule(
                                                selectedReport?.ID ?? 0
                                            );
                                        }
                                    },
                                    type: MessageBoxTypes.Warning,
                                    actions: [
                                        MessageBoxActions.Delete,
                                        MessageBoxActions.Cancel,
                                    ],

                                    children:
                                        "Are sure you want to delete this module?",
                                });
                            }}
                        />
                        <Button
                            icon="edit"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                setIsEdit(!isEdit);
                            }}
                        />
                        <Button
                            icon="decline"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                setLayout(FCLLayout.OneColumn);
                                setIsEdit(false);
                            }}
                            />
                    </Toolbar>


                    <Toolbar key={selectedReport?.ID} style={{ height: "200px" }}>
                        <Avatar
                            icon="person-placeholder"
                            size={AvatarSize.XL}
                            style={{ marginLeft: "12px" }}
                        />
                        <FlexBox
                            direction={FlexBoxDirection.Column}
                            style={{ marginLeft: "6px" }}
                        >
                            <FlexBox>
                                <Label>Path:</Label>
                                <Text style={{ marginLeft: "2px" }}>
                                    {selectedReport?.REPORT_PATH}
                                </Text>
                            </FlexBox>
                            <FlexBox>
                                <Label> Name:</Label>
                                <Text style={{ marginLeft: "2px" }}>
                                    {selectedReport?.REPORT_NAME}
                                </Text>
                            </FlexBox>
                            <FlexBox>
                                <Label>Destination:</Label>
                                <Text style={{ marginLeft: "2px" }}>
                                    {selectedReport?.REPORT_DESTINATION}
                                </Text>
                            </FlexBox>
                        </FlexBox>
                    </Toolbar>

                    <Card>
                      {isEdit && (
                      <ReportEditForm
                      id={selectedReport?.ID ?? 0}
                      reportName={selectedReport?.REPORT_NAME ?? ""}
                      reportDestination={selectedReport?.REPORT_DESTINATION ?? ""}
                      reportPath={selectedReport?.REPORT_PATH ?? ""}
                      setIsEdit={setIsEdit}
                      setIsFullScreen={setIsFullScreen}
                      setLayout={setLayout}
         
                      />)}

                    </Card>
                </>
            }
        />
    );
};

export default ReportDetails;


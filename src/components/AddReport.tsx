import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
import ReportEditForm from "@/components/ReportEditForm";
import { getAllModuleType } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Avatar,
    AvatarSize,
    Button,
    ButtonDesign,
    Card,
    FCLLayout,
    FlexBox,
    FlexBoxDirection,
    FlexibleColumnLayout,
    Label,
    List,
    MessageBoxActions,
    MessageBoxTypes,
    Modals,
    StandardListItem,
    Text,
    Title,
    Toolbar,
    ToolbarDesign,
    ToolbarSpacer,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddReport = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<
        getAllModuleType | undefined
    >(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const getAllReportData = async () => {
        try {
            const endPointAllReports = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-master/get-all-reports`;
            const response = await axios.get(endPointAllReports);
            if (response.data.statuscode !== 200) {
                setError(true);
            }
            setError(false);
            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allReportData"],
        queryFn: getAllReportData,
        retry: 3,
    });

    const deleteReportData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-master/delete-report`;
        try {
            const data = {
                id,
                customer_id: 1,
            };
            const response = await axios.patch(endPoint, data);
            if (response.data?.statuscode !== 200) {
                setError(true);
                throw response.data?.message;
            }
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
    };

    const reportDataRes = data;

    const allReportData: getAllModuleType[] = reportDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allReportData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const reportId = parseInt(e.detail.item.dataset.reportId);
        const report = allReportData.find(
            (report) => Number(report.ID) === reportId
        );
        setSelectedReport(report);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allReportData.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    style={{
                        height: "100%",
                        width: "100%",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                    }}
                    layout={layout}
                    startColumn={
                        <List onItemClick={onStartColumnClick}>
                            {allReportData?.map((report, index) => (
                                <StandardListItem
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
                                            setLayout(
                                                FCLLayout.MidColumnFullScreen
                                            );
                                        }}
                                    />
                                )}
                                <Button
                                    icon="delete"
                                    design={ButtonDesign.Transparent}
                                    onClick={() => {
                                        showDeleteConfirmation({
                                            onClose(event) {
                                                if (
                                                    event.detail.action ===
                                                    "Delete"
                                                ) {
                                                    handleDeleteModule(
                                                        selectedReport
                                                            ? selectedReport.ID
                                                            : 0
                                                    );
                                                }
                                            },
                                            type: MessageBoxTypes.Warning,
                                            actions: [
                                                MessageBoxActions.Delete,
                                                MessageBoxActions.Cancel,
                                            ],

                                            children:
                                                "Are sure you want to delete this report?",
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

                            <Toolbar
                                key={selectedReport?.ID}
                                style={{ height: "200px" }}
                            >
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
                                        id={
                                            selectedReport
                                                ? selectedReport.ID
                                                : 0
                                        }
                                        reportName={
                                            selectedReport
                                                ? selectedReport.REPORT_NAME
                                                : ""
                                        }
                                        reportDestination={
                                            selectedReport
                                                ? selectedReport.REPORT_DESTINATION
                                                : ""
                                        }
                                        reportPath={
                                            selectedReport
                                                ? selectedReport.REPORT_PATH
                                                : ""
                                        }
                                        setIsEdit={setIsEdit}
                                        setIsFullScreen={setIsFullScreen}
                                        setLayout={setLayout}
                                    />
                                )}
                            </Card>
                        </>
                    }
                />
            )}
        </>
    );
};

export default AddReport;

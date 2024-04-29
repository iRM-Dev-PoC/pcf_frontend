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
import {
    checkPointDatType,
    getReportCheckPointMappingType,
    reportDataType,
} from "../utils/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import ErrorComponent from "./ErrorComponent";
import NoDataComponent from "./NoDataComponent";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const AddReportCheckPointMapping = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedCheckPointMapping, setSelectedCheckPointMapping] = useState<
        getReportCheckPointMappingType | undefined
    >(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const fetchData = async () => {
        try {
            const endPointAllReports = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-check-point-mapping/get-all-mappings`;
            const response = await axios.get(endPointAllReports);
            console.log(response.data);

            const mappingData = response?.data;
            if (response.data.statuscode !== 200) {
                setError(true);
            }
            setError(false);
            console.log(mappingData);

            return mappingData;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allReportCheckPointMappingData"],
        queryFn: fetchData,
        retry: 3,
    });

    // const deleteReportData = async (id: number) => {
    // 	const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-master/delete-report`;
    // 	try {
    // 		const data = {
    // 			id,
    // 			customer_id: 1,
    // 		};
    // 		const response = await axios.patch(endPoint, data);
    // 		if (response.data?.statuscode !== 200) {
    // 			setError(true);
    // 			throw response.data?.message;
    // 		}
    // 		return response.data;
    // 	} catch (error) {
    // 		console.error(error);
    // 		setError(true);
    // 		throw error;
    // 	}
    // };

    // const handleDeleteModule = async (id: number) => {
    // 	await toast.promise(deleteReportData(id), {
    // 		loading: "Deleting Report...",
    // 		success: "Report deleted successfully!",
    // 		error: (error) => `Failed to delete report: ${error.message}`,
    // 	});
    // 	await queryClient.invalidateQueries({
    // 		queryKey: ["allReportCheckPointMappingData"],
    // 	});
    // 	setIsEdit(false);
    // 	setIsFullScreen(false);
    // 	setLayout(FCLLayout.OneColumn);
    // };

    const checkPointMappingData = data;

    const arrow = " --> ";

    console.log(data);

    const allReportCheckPointMappingData: getReportCheckPointMappingType[] =
        checkPointMappingData?.data;

    console.log(allReportCheckPointMappingData);

    const allReportData: reportDataType[] = checkPointMappingData?.reportdata;
    const allCheckPointData: checkPointDatType[] =
        checkPointMappingData?.checkpointdata;

    console.log(allReportData);
    console.log(allCheckPointData);

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allReportCheckPointMappingData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    if (allReportCheckPointMappingData.length === 0) {
        return <NoDataComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const checkPointMappingId = parseInt(e.detail.item.dataset.moduleId);
        const mappingData = allReportCheckPointMappingData.find(
            (mapping) => Number(mapping.ID) === checkPointMappingId
        );
        setSelectedCheckPointMapping(mappingData);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
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
                    {allReportCheckPointMappingData?.map((mapping, index) => (
                        <StandardListItem
                            data-report-id={mapping.ID}
                            key={`${mapping.ID}-${index}`}
                        >
                            <span className="text-nowrap">
                                {
                                    allReportData.find(
                                        (report) =>
                                            report.ID === mapping.REPORT_ID
                                    )?.REPORT_NAME
                                }
                                {arrow}
                                {
                                    allCheckPointData.find(
                                        (checkpoint) =>
                                            checkpoint.ID ===
                                            mapping.CHECK_POINT_ID
                                    )?.CHECK_POINT_NAME
                                }
                            </span>
                        </StandardListItem>
                    ))}
                </List>
            }
            midColumn={
                <>
                    {/* <Toolbar design={ToolbarDesign.Solid}>
						<Title> {selectedCheckPointMapping?.REPORT_ID} </Title>
						<ToolbarSpacer />

						{isFullScreen ? (
							<Button
								icon="exit-full-screen"
								design={ButtonDesign.Transparent}
								onClick={() => {
									setIsFullScreen(!isFullScreen);
									setLayout(FCLLayout.TwoColumnsStartExpanded);
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
							// onClick={() => {
							// 	showDeleteConfirmation({
							// 		onClose(event) {
							// 			if (event.detail.action === "Delete") {
							// 				handleDeleteModule(
							// 					selectedCheckPointMapping
							// 						? selectedCheckPointMapping.ID
							// 						: 0
							// 				);
							// 			}
							// 		},
							// 		type: MessageBoxTypes.Warning,
							// 		actions: [MessageBoxActions.Delete, MessageBoxActions.Cancel],

							// 		children: "Are sure you want to delete this module?",
							// 	});
							// }}
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
						key={selectedCheckPointMapping?.ID}
						style={{ height: "200px" }}>
						<Avatar
							icon="person-placeholder"
							size={AvatarSize.XL}
							style={{ marginLeft: "12px" }}
						/>
						<FlexBox
							direction={FlexBoxDirection.Column}
							style={{ marginLeft: "6px" }}>
							<FlexBox>
								<Label>Path:</Label>
								<Text style={{ marginLeft: "2px" }}>
									{selectedCheckPointMapping?.CREATED_BY}
								</Text>
							</FlexBox>
							<FlexBox>
								<Label> Name:</Label>
								<Text style={{ marginLeft: "2px" }}>
									{selectedCheckPointMapping?.CHANGED_ON}
								</Text>
							</FlexBox>
							<FlexBox>
								<Label>Destination:</Label>
								<Text style={{ marginLeft: "2px" }}>
									{selectedCheckPointMapping?.CHANGED_ON}
								</Text>
							</FlexBox>
						</FlexBox>
					</Toolbar> */}

                    {/* <Card>
						{isEdit && (
							<ReportEditForm
								id={
									selectedCheckPointMapping ? selectedCheckPointMapping.ID : 0
								}
								reportName={
									selectedCheckPointMapping
										? selectedCheckPointMapping.CREATED_ON
										: ""
								}
								reportDestination={
									selectedCheckPointMapping
										? selectedCheckPointMapping.CREATED_ON
										: ""
								}
								reportPath={
									selectedCheckPointMapping
										? selectedCheckPointMapping.CREATED_ON
										: ""
								}
								setIsEdit={setIsEdit}
								setIsFullScreen={setIsFullScreen}
								setLayout={setLayout}
							/>
						)}
					</Card> */}
                </>
            }
        />
    );
};

export default AddReportCheckPointMapping;

import CheckPointEditForm from "@/components/CheckPointEditForm";
import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
import { getAllCheckPointData } from "@/lib/types";
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
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddCheckPoint = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedCheckPoint, setSelectedCheckPoint] = useState<
        getAllCheckPointData | undefined
    >(undefined);
    const [error, setError] = useState(false);

    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const fetchData = async () => {
        try {
            const endPointAllCheckPoints = `${import.meta.env.VITE_BACKEND_BASE_URL}/check-point-master/get-all-check-points`;
            const response = await axios.get(endPointAllCheckPoints);
            if (response.data.statuscode !== 200) {
                setError(true);
            } else {
                setError(false);
            }
            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allCheckPointData"],
        queryFn: fetchData,
        retry: 3,
    });

    const deleteCheckPointData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/check-point-master/delete-check-point`;
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

    const handleDeleteCheckPoint = async (id: number) => {
        await toast.promise(deleteCheckPointData(id), {
            loading: "Deleting Check-Point...",
            success: "Check-Point deleted successfully!",
            error: (error) => `Failed to delete Check-Point: ${error.message}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allCheckPointData"],
        });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    const CheckPointDataRes = data;

    const allCheckPointData: getAllCheckPointData[] = CheckPointDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allCheckPointData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const CheckPointId = parseInt(e.detail.item.dataset.checkpointId);

        const CheckPoint = allCheckPointData.find(
            (CheckPoint) => Number(CheckPoint.ID) === CheckPointId
        );
        setSelectedCheckPoint(CheckPoint);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allCheckPointData.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    style={{
                        height: "100%",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                        borderRadius:
                            ThemingParameters.sapButton_BorderCornerRadius,
                    }}
                    layout={layout}
                    startColumn={
                        <List onItemClick={onStartColumnClick}>
                            {allCheckPointData?.map((checkPoint, index) => (
                                <StandardListItem
                                    description={checkPoint.CHECK_POINT_DESC}
                                    data-checkPoint-id={checkPoint.ID}
                                    key={`${checkPoint.ID}-${index}`}
                                >
                                    {checkPoint.CHECK_POINT_NAME}
                                </StandardListItem>
                            ))}
                        </List>
                    }
                    midColumn={
                        <>
                            <Toolbar design={ToolbarDesign.Solid}>
                                <Title>
                                    {selectedCheckPoint?.CHECK_POINT_NAME}
                                </Title>
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
                                                    handleDeleteCheckPoint(
                                                        selectedCheckPoint
                                                            ? selectedCheckPoint.ID
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
                                                "Are sure you want to delete this checkpoint?",
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
                                key={selectedCheckPoint?.ID}
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
                                        <Label>Name:</Label>
                                        <Text style={{ marginLeft: "2px" }}>
                                            {
                                                selectedCheckPoint?.CHECK_POINT_NAME
                                            }
                                        </Text>
                                    </FlexBox>
                                    <FlexBox>
                                        <Label>Description:</Label>
                                        <Text style={{ marginLeft: "2px" }}>
                                            {
                                                selectedCheckPoint?.CHECK_POINT_DESC
                                            }
                                        </Text>
                                    </FlexBox>
                                </FlexBox>
                            </Toolbar>

                            <Card>
                                {isEdit && (
                                    <CheckPointEditForm
                                        id={
                                            selectedCheckPoint
                                                ? selectedCheckPoint.ID
                                                : 0
                                        }
                                        checkPointName={
                                            selectedCheckPoint
                                                ? selectedCheckPoint.CHECK_POINT_NAME
                                                : ""
                                        }
                                        checkPointDescription={
                                            selectedCheckPoint
                                                ? selectedCheckPoint.CHECK_POINT_DESC
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

export default AddCheckPoint;

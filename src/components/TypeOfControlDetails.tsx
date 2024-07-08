import ControlCreationForm from "@/components/ControlCreationForm";
import ControlEditForm from "@/components/ControlEditForm";
import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
import { getAllControlsType } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Avatar,
    AvatarSize,
    Bar,
    Button,
    ButtonDesign,
    ButtonDomRef,
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
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const TypeOfControlDetails = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedControl, setSelectedControl] = useState<
        getAllControlsType | undefined
    >(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);
    const getAllControls = async () => {
        try {
            const endPointAllControls = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/get-all-controls`;
            const response = await axios.get(endPointAllControls);
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
        queryKey: ["allControlsData"],
        queryFn: getAllControls,
        retry: 3,
    });

    const deleteControlData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/delete-control`;
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

    const handleDeleteControls = async (id: number) => {
        await toast.promise(deleteControlData(id), {
            loading: "Deleting Control...",
            success: "Control deleted successfully!",
            error: (error) => `Failed to delete control: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allControlsData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    const controlDataRes = data;

    const allControlsData: getAllControlsType[] = controlDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allControlsData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode === 500) {
        return <ErrorComponent />;
    }

    const onStartColumnClick = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        e: any
    ) => {
        const controlId = parseInt(e.detail.item.dataset.controlId);
        const control = allControlsData.find(
            (control) => Number(control.ID) === controlId
        );
        setSelectedControl(control);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allControlsData.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    className="rounded-md"
                    layout={layout}
                    startColumn={
                        <>
                            <Bar
                                design="Header"
                                className="mb-2 block h-16 rounded-md"
                                endContent={
                                    <div>
                                        <Button
                                            design="Emphasized"
                                            tooltip="Create"
                                            icon="create"
                                            onClick={() => {
                                                const { close } = showDialog({
                                                    headerText:
                                                        "Type of Controls Details",
                                                    children: (
                                                        <>
                                                            <ControlCreationForm
                                                                closeButtonref={
                                                                    closeButtonRoleref
                                                                }
                                                            />
                                                        </>
                                                    ),
                                                    footer: (
                                                        <Bar
                                                            endContent={
                                                                <>
                                                                    <Button
                                                                        onClick={() =>
                                                                            close()
                                                                        }
                                                                        design="Negative"
                                                                        ref={
                                                                            closeButtonRoleref
                                                                        }
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
                                            Create
                                        </Button>
                                    </div>
                                }
                                startContent={
                                    <h1 className="m-3 block text-2xl font-bold">
                                        Type of Controls Details
                                    </h1>
                                }
                            ></Bar>
                            <List onItemClick={onStartColumnClick}>
                                {allControlsData?.map((control, index) => (
                                    <StandardListItem
                                        description={control.CONTROL_DESC}
                                        data-control-id={control.ID}
                                        key={`${control.ID}-${index}`}
                                    >
                                        {control.CONTROL_NAME}
                                    </StandardListItem>
                                ))}
                            </List>
                        </>
                    }
                    midColumn={
                        <>
                            <Toolbar design={ToolbarDesign.Solid}>
                                <Title>{selectedControl?.CONTROL_NAME}</Title>
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
                                                    handleDeleteControls(
                                                        selectedControl?.ID ?? 0
                                                    );
                                                }
                                            },
                                            type: MessageBoxTypes.Warning,
                                            actions: [
                                                MessageBoxActions.Delete,
                                                MessageBoxActions.Cancel,
                                            ],

                                            children:
                                                "Are sure you want to delete this control?",
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
                                key={selectedControl?.ID}
                                style={{ height: "130px" }}
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
                                            {selectedControl?.CONTROL_NAME}
                                        </Text>
                                    </FlexBox>
                                    <FlexBox>
                                        <Label>Description:</Label>
                                        <Text style={{ marginLeft: "2px" }}>
                                            {selectedControl?.CONTROL_DESC}
                                        </Text>
                                    </FlexBox>
                                </FlexBox>
                            </Toolbar>

                            <Card>
                                {isEdit && (
                                    <ControlEditForm
                                        id={
                                            selectedControl
                                                ? selectedControl.ID
                                                : 0
                                        }
                                        controlName={
                                            selectedControl
                                                ? selectedControl.CONTROL_NAME
                                                : ""
                                        }
                                        controlDescription={
                                            selectedControl
                                                ? selectedControl.CONTROL_DESC
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

export default TypeOfControlDetails;

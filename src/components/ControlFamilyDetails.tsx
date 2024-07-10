import {
    deleteControlFamily,
    getAllControlFamilies,
} from "@/actions/controlFamiliy";
import ControlFamilyCreationForm from "@/components/ControlFamilyCreation";
import ControlFamilyEditForm from "@/components/ControlFamilyEditForm";
import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
import { getAllControlFamilyType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const ControlFamilyDetails = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedControlFamily, setSelectedControlFamily] = useState<
        getAllControlFamilyType | undefined
    >(undefined);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);

    const {
        data: allControlFamilyDataRes,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ["allControlFamilyData"],
        queryFn: getAllControlFamilies,
        retry: 3,
    });

    const deleteControlFamilyMutation = useMutation({
        mutationFn: deleteControlFamily,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allControlFamilyData"],
            });
            setIsEdit(false);
            setIsFullScreen(false);
            setLayout(FCLLayout.OneColumn);
        },
    });

    const handleDeleteControlFamily = async (id: number) => {
        toast.promise(deleteControlFamilyMutation.mutateAsync(id), {
            loading: "Deleting Control-Family...",
            success: "Control-Family deleted successfully!",
            error: (error) => `Failed to delete control-family due to ${error}`,
        });
    };

    const allControlFamilyData = allControlFamilyDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allControlFamilyData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && allControlFamilyDataRes?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const controlfamilyId = parseInt(e.detail.item.dataset.controlfamilyId);
        const controlfamily = allControlFamilyData?.find(
            (controlfamily) => Number(controlfamily.ID) === controlfamilyId
        );

        setSelectedControlFamily(controlfamily);

        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allControlFamilyData?.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    className="rounded-md"
                    layout={layout}
                    startColumn={
                        <>
                            <Bar
                                className="mb-2 block h-16 rounded-md"
                                design="Header"
                                endContent={
                                    <div>
                                        <Button
                                            design="Emphasized"
                                            tooltip="Create"
                                            icon="create"
                                            onClick={() => {
                                                const { close } = showDialog({
                                                    headerText:
                                                        "User Information",
                                                    children: (
                                                        <>
                                                            <ControlFamilyCreationForm
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
                                    <Title className="m-3 block text-2xl font-bold">
                                        Control Family Details
                                    </Title>
                                }
                            ></Bar>
                            <List
                                onItemClick={onStartColumnClick}
                                className="rounded-md"
                            >
                                {allControlFamilyData?.map(
                                    (controlfamily, index) => (
                                        <StandardListItem
                                            description={
                                                controlfamily.CONTROL_FAMILY_DESC
                                            }
                                            data-controlFamily-id={
                                                controlfamily.ID
                                            }
                                            key={`${controlfamily.ID}-${index}`}
                                        >
                                            {controlfamily.CONTROL_FAMILY_NAME}
                                        </StandardListItem>
                                    )
                                )}
                            </List>
                        </>
                    }
                    midColumn={
                        <>
                            <Toolbar design={ToolbarDesign.Solid}>
                                <Title>
                                    {selectedControlFamily?.CONTROL_FAMILY_NAME}
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
                                                    handleDeleteControlFamily(
                                                        selectedControlFamily
                                                            ? selectedControlFamily.ID
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
                                                "Are sure you want to delete this control-family?",
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
                                key={selectedControlFamily?.ID}
                                style={{ height: "120px" }}
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
                                                selectedControlFamily?.CONTROL_FAMILY_NAME
                                            }
                                        </Text>
                                    </FlexBox>
                                    <FlexBox>
                                        <Label>Description:</Label>
                                        <Text style={{ marginLeft: "2px" }}>
                                            {
                                                selectedControlFamily?.CONTROL_FAMILY_DESC
                                            }
                                        </Text>
                                    </FlexBox>
                                </FlexBox>
                            </Toolbar>

                            <Card>
                                {isEdit && (
                                    <ControlFamilyEditForm
                                        id={
                                            selectedControlFamily
                                                ? selectedControlFamily.ID
                                                : 0
                                        }
                                        controlFamilyName={
                                            selectedControlFamily
                                                ? selectedControlFamily.CONTROL_FAMILY_NAME
                                                : ""
                                        }
                                        controlFamilyDescription={
                                            selectedControlFamily
                                                ? selectedControlFamily.CONTROL_FAMILY_DESC
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

export default ControlFamilyDetails;

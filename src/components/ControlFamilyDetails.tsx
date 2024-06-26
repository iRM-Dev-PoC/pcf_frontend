import ControlFamilyEditForm from "@/components/ControlFamilyEditForm";
import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
import { getAllControlFamilyType } from "@/lib/types";
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
    ShellBar,
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

const ControlFamilyDetails = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedControlFamily, setSelectedControlFamily] = useState<
        getAllControlFamilyType | undefined
    >(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const getAllControlFamiliyData = async () => {
        try {
            const endPointAllControlFamily = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-family-master/get-all-control-family`;
            const response = await axios.get(endPointAllControlFamily);
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
        queryKey: ["allControlFamilyData"],
        queryFn: getAllControlFamiliyData,
        retry: 3,
    });

    const deleteControlFamilyData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-family-master/delete-control-family`;
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

    const handleDeleteControlFamily = async (id: number) => {
        await toast.promise(deleteControlFamilyData(id), {
            loading: "Deleting Control-Family...",
            success: "Control-Family deleted successfully!",
            error: (error) =>
                `Failed to delete control-family: ${error.message}`,
        });
        await queryClient.invalidateQueries({
            queryKey: ["allControlFamilyData"],
        });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    const controlFamilyDataRes = data;

    const allControlFamilyData: getAllControlFamilyType[] =
        controlFamilyDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allControlFamilyData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const controlfamilyId = parseInt(e.detail.item.dataset.controlfamilyId);
        const controlfamily = allControlFamilyData.find(
            (controlfamily) => Number(controlfamily.ID) === controlfamilyId
        );

        setSelectedControlFamily(controlfamily);

        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allControlFamilyData.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    style={{
                        // height: "100%",
                        // width: "100%",
                        marginTop: "0.1rem",
                        marginBottom:"0.5rem",
                        fontWeight: "bold",
                        backgroundColor: "blue",
                        width: "inherit",
                        
                    }}
                    layout={layout}
                    startColumn={
                        <>
                            <ShellBar
                                primaryTitle="Control Family Details"
                                className="mb-2"
                            />
                            <List
                                onItemClick={onStartColumnClick}
                                className="w-full"
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
                                                selectedControlFamily?.CONTROL_FAMILY_NAME
                                            }
                                        </Text>
                                        {/* </FlexBox>
                                    <FlexBox>
                                        <Label>Display Name:</Label>
                                        <Text style={{ marginLeft: "2px" }}>
                                            {
                                                selectedControlFamily?.DISPLAY_SUBMODULE_NAME
                                            }
                                        </Text> */}
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

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
    Card,
    Modals,
    MessageBoxTypes,
    MessageBoxActions,
} from "@ui5/webcomponents-react";
import { getAllRoleData } from "../utils/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import RoleEditForm from "./RoleEditForm";

const AddRoles = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<
        getAllRoleData | undefined
    >(undefined);
    const [error, setError] = useState(false);

    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const fetchData = async () => {
        try {
            const endPointAllRoles = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/get-all-roles`;
            const response = await fetch(endPointAllRoles);
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
        queryKey: ["allRoleData"],
        queryFn: fetchData,
        retry: 3,
    });

    const deleteRoleData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/role-master/delete-role`;
        try {
            const response = await axios.delete(endPoint, {
                data: {
                    id,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const handleDeleteRole = async (id: number) => {
        await toast.promise(deleteRoleData(id), {
            loading: "Deleting Role...",
            success: "Role deleted successfully!",
            error: (error) => `Failed to delete role: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allRoleData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    const roleDataRes = data;

    const allRoleData: getAllRoleData[] = roleDataRes?.data;

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

    if (!isFetching && allRoleData === undefined) {
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
        const roleId = parseInt(e.detail.item.dataset.roleId);
        const role = allRoleData.find((role) => Number(role.ID) === roleId);
        setSelectedRole(role);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <FlexibleColumnLayout
            style={{
                height: "100%",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            layout={layout}
            startColumn={
                <List onItemClick={onStartColumnClick}>
                    {allRoleData?.map((role, index) => (
                        <StandardListItem
                            description={role.ROLE_DESC}
                            data-role-id={role.ID}
                            key={`${role.ID}-${index}`}
                        >
                            {role.ROLE_NAME}
                        </StandardListItem>
                    ))}
                </List>
            }
            midColumn={
                <>
                    <Toolbar design={ToolbarDesign.Solid}>
                        <Title>{selectedRole?.ROLE_NAME}</Title>
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
                                            handleDeleteRole(
                                                selectedRole?.ID ?? 0
                                            );
                                        }
                                    },
                                    type: MessageBoxTypes.Warning,
                                    actions: [
                                        MessageBoxActions.Delete,
                                        MessageBoxActions.Cancel,
                                    ],

                                    children:
                                        "Are sure you want to delete this role?",
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
                    <Toolbar key={selectedRole?.ID} style={{ height: "200px" }}>
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
                                    {selectedRole?.ROLE_NAME}
                                </Text>
                            </FlexBox>
                            <FlexBox>
                                <Label>Description:</Label>
                                <Text style={{ marginLeft: "2px" }}>
                                    {selectedRole?.ROLE_DESC}
                                </Text>
                            </FlexBox>
                        </FlexBox>
                    </Toolbar>

                    <Card>
                        {isEdit && (
                            <RoleEditForm
                                id={selectedRole?.ID ?? 0}
                                roleName={selectedRole?.ROLE_NAME ?? ""}
                                roleDescription={selectedRole?.ROLE_DESC ?? ""}
                                setIsEdit={setIsEdit}
                                setIsFullScreen={setIsFullScreen}
                                setLayout={setLayout}
                            />
                        )}
                    </Card>
                </>
            }
        />
    );
};

export default AddRoles;

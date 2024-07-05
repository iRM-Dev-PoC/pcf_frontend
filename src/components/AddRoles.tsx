import { deleteRole, getAllRoles } from "@/actions/roles";
import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import NoDataComponent from "@/components/NoDataComponent";
import RoleCreationForm from "@/components/RoleCreationForm";
import RoleEditForm from "@/components/RoleEditForm";
import type { getAllRoleData, RoleDataResponse } from "@/lib/types";
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

const AddRoles = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<
        getAllRoleData | undefined
    >(undefined);

    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ["allRoleData"],
        queryFn: getAllRoles,
        retry: 3,
    });

    const deleteRoleMutation = useMutation({
        mutationFn: deleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allRoleData"] });
            setIsEdit(false);
            setIsFullScreen(false);
            setLayout(FCLLayout.OneColumn);
        },
    });

    const handleDeleteRole = async (id: number) => {
        toast.promise(deleteRoleMutation.mutateAsync(id), {
            loading: "Deleting Role...",
            success: "Role deleted successfully!",
            error: (error) => `Failed to delete role: ${error.message}`,
        });
    };

    if (data === undefined) {
        return <ErrorComponent />;
    }
    const roleDataRes: RoleDataResponse = data;
    const allRoleData: getAllRoleData[] = roleDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allRoleData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && error) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const roleId = parseInt(e.detail.item.dataset.roleId);
        const role = allRoleData?.find((role) => Number(role.ID) === roleId);
        setSelectedRole(role);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allRoleData?.length === 0 ? (
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
                                                        "Role Information",
                                                    children: (
                                                        <RoleCreationForm
                                                            closeButtonref={
                                                                closeButtonRoleref
                                                            }
                                                        />
                                                    ),
                                                    footer: (
                                                        <Bar
                                                            endContent={
                                                                <>
                                                                    <Button
                                                                        ref={
                                                                            closeButtonRoleref
                                                                        }
                                                                        onClick={() => {
                                                                            close();
                                                                        }}
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
                                            Create
                                        </Button>
                                    </div>
                                }
                                startContent={
                                    <h1 className="m-3 block text-2xl font-bold">
                                        Roles
                                    </h1>
                                }
                            ></Bar>
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
                        </>
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
                            <Toolbar
                                key={selectedRole?.ID}
                                style={{ height: "150px" }}
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
                                        id={selectedRole ? selectedRole.ID : 0}
                                        roleName={
                                            selectedRole
                                                ? selectedRole.ROLE_NAME
                                                : ""
                                        }
                                        roleDescription={
                                            selectedRole
                                                ? selectedRole.ROLE_DESC
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

export default AddRoles;

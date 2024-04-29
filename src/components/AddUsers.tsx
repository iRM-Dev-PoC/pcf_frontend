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
import { getAllUserData } from "../utils/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import UserEditForm from "./UserEditForm";
import axios from "axios";
import toast from "react-hot-toast";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import ErrorComponent from "./ErrorComponent";
import NoDataComponent from "./NoDataComponent";

const AddUsers = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<
        getAllUserData | undefined
    >(undefined);
    const [error, setError] = useState(false);

    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const fetchData = async () => {
        try {
            const endPointAllUsers = `${import.meta.env.VITE_BACKEND_BASE_URL}/loginuser/get-all-users`;
            const response = await axios.get(endPointAllUsers);
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
        queryKey: ["allUserData"],
        queryFn: fetchData,
        retry: 3,
    });

    const deleteUserData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/loginuser/delete-user`;
        try {
            const response = await axios.patch(endPoint, {
                data: {
                    id,
                },
            });
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

    const handleDeleteUser = async (id: number) => {
        await toast.promise(deleteUserData(id), {
            loading: "Deleting user...",
            success: "User deleted successfully!",
            error: (error) => `Failed to delete user: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allUserData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    const userDataRes = data;

    const allUserData: getAllUserData[] = userDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allUserData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const userId = parseInt(e.detail.item.dataset.userId);
        const user = allUserData.find((user) => Number(user.ID) === userId);
        setSelectedUser(user);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {
                !isFetching && allUserData.length === 0 ? <NoDataComponent /> :
            
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
                                {allUserData?.map((user, index) => (
                                    <StandardListItem
                                        description={user.USER_EMAIL}
                                        data-user-id={user.ID}
                                        key={`${user.ID}-${index}`}
                                    >
                                        {user.USER_NAME}
                                    </StandardListItem>
                                ))}
                            </List>
                        }
                        midColumn={
                            <>
                                <Toolbar design={ToolbarDesign.Solid}>
                                    <Title>{selectedUser?.USER_NAME}</Title>
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
                                                        event.detail.action === "Delete"
                                                    ) {
                                                        handleDeleteUser(
                                                            selectedUser
                                                                ? selectedUser.ID
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
                                                    "Are sure you want to delete this user?",
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
                                    key={selectedUser?.ID}
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
                                                {selectedUser?.USER_NAME}
                                            </Text>
                                        </FlexBox>
                                        <FlexBox>
                                            <Label>Email:</Label>
                                            <Text style={{ marginLeft: "2px" }}>
                                                {selectedUser?.USER_EMAIL}
                                            </Text>
                                        </FlexBox>
                                        <FlexBox>
                                            <Label>User Type:</Label>
                                            <Text style={{ marginLeft: "2px" }}>
                                                {selectedUser?.ROLE_NAME}
                                            </Text>
                                        </FlexBox>
                                    </FlexBox>
                                </Toolbar>

                                <Card>
                                    {isEdit && (
                                        <Card>
                                            <UserEditForm
                                                id={selectedUser ? selectedUser.ID : 0}
                                                email={
                                                    selectedUser
                                                        ? selectedUser.USER_EMAIL
                                                        : ""
                                                }
                                                username={
                                                    selectedUser
                                                        ? selectedUser.USER_NAME
                                                        : ""
                                                }
                                                setIsEdit={setIsEdit}
                                                setIsFullScreen={setIsFullScreen}
                                                setLayout={setLayout}
                                            />
                                        </Card>
                                    )}
                                </Card>
                            </>
                        }
                    />
            }
        </>
    );
};

export default AddUsers;

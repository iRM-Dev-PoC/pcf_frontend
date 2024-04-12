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
} from "@ui5/webcomponents-react";
import { getAllUserData } from "../utils/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const AddUsers = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<
        getAllUserData | undefined
    >(undefined);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/loginuser/get-all-users`;
            const response = await fetch(endPoint);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch data");
        }
    };

    const { data, isFetching } = useQuery({
        queryKey: ["allUserData"],
        queryFn: fetchData,
        retry: 3,
    });

    const userDataRes = data;

    const allUserData: getAllUserData[] = userDataRes?.data;

    if (userDataRes?.statuscode === 500) {
        setError(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const userId = parseInt(e.detail.item.dataset.userId);
        const user = allUserData.find((user) => Number(user.ID) === userId);
        setSelectedUser(user);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <FlexibleColumnLayout
            style={{
                height: "100%",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
            }}
            layout={layout}
            startColumn={
                <List onItemClick={onStartColumnClick}>
                    {error && (
                        <StandardListItem className="pointer-events-none">
                            Something went wrong!
                        </StandardListItem>
                    )}

                    {!error && isFetching ? (
                        <StandardListItem className="pointer-events-none">
                            <Loading />
                        </StandardListItem>
                    ) : allUserData === null ? (
                        <StandardListItem className="pointer-events-none">
                            No users found
                        </StandardListItem>
                    ) : (
                        <>
                            {allUserData.map((user, index) => (
                                <StandardListItem
                                    description={user.USER_EMAIL}
                                    data-user-id={user.ID}
                                    key={`${user.ID}-${index}`}
                                >
                                    {user.USER_NAME}
                                </StandardListItem>
                            ))}
                        </>
                    )}
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
                                    setLayout(FCLLayout.MidColumnFullScreen);
                                }}
                            />
                        )}
                        <Button
                            icon="decline"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                setLayout(FCLLayout.OneColumn);
                            }}
                        />
                    </Toolbar>
                    <Toolbar
                        key={selectedUser?.USER_ID}
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

                    {/* <List headerText="Permissions" growing="Scroll">
                        {Object.entries(selectedUser?.permissions).map(
                            ([key, value]) => (
                                <StandardListItem key={key}>
                                    {key}: {value.toString()}
                                </StandardListItem>
                            )
                        )}
                    </List> */}
                </>
            }
        />
    );
};

export default AddUsers;

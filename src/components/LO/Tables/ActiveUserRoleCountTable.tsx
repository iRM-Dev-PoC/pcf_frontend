import {
    Bar,
    BarDesign,
    Button,
    ButtonDesign,
    Card,
    FCLLayout,
    FlexibleColumnLayout,
    List,
    StandardListItem,
    Title,
} from "@ui5/webcomponents-react";
import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../Charts/BarChart";

const ActiveUserRoleCountTable = () => {
    const activeUserDataEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/get-active-users-roles-usage-count`;

    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [userList, setUserList] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState<any>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const requestBody = {
                customer_id: 1,
                hdrId: 2,
            };
            const response = await axios.post(activeUserDataEndpoint, requestBody);
            if (response.data.statuscode === 200) {
                setUserList(response.data.data);
            } else {
                console.error("Unexpected API response format");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onStartColumnClick = (e: any) => {
        const clickedUserName = e.detail.item.dataset.user_name;
        const userDetails = userList.find(user => user.USER_NAME === clickedUserName);
        console.log(userDetails, "xyz");
        setSelectedUser(userDetails);
        setLayout(FCLLayout.TwoColumnsMidExpanded); 
    };

    const onMiddleColumnClick = () => {
        setSelectedUserDetails(selectedUser.bar_chart[0].items); 
        setLayout(FCLLayout.ThreeColumnsEndExpanded); 
    };
    console.log(selectedUserDetails, "prity");

    return (
        <FlexibleColumnLayout
            className="rounded-md"
            layout={layout}
            startColumn={
                <>
                    <Bar
                        className="mb-2 block h-16 rounded-md"
                        design={BarDesign.Header}
                        startContent={
                            <Title className="m-3 block text-2xl font-bold">
                                Active User Role Count
                            </Title>
                        }
                    />
                    <Bar
                        design={BarDesign.Header}
                        startContent={<Title className="text-xl">User Name</Title>}
                    />
                    {error ? (
                        <div className="p-4 text-red-600">Failed to load data.</div>
                    ) : isFetching ? (
                        <div className="p-4">Loading...</div>
                    ) : (
                        <List onItemClick={onStartColumnClick}>
                            {userList.map((user) => (
                                <StandardListItem
                                    key={user.USER_NAME}
                                    data-user_name={user.USER_NAME}
                                >
                                    {user.USER_NAME} 
                                </StandardListItem>
                            ))}
                        </List>
                    )}
                </>
            }
            midColumn={
                <>
                    <Bar
                        className="bg-transparent"
                        startContent={<Title className="text-xl">User Details</Title>}
                        endContent={
                            <Button
                                icon="decline"
                                design={ButtonDesign.Transparent}
                                onClick={() => setLayout(FCLLayout.OneColumn)}
                            />
                        }
                    />
                    {selectedUser && (
                        <>
                            <List onItemClick={onMiddleColumnClick}>
                                <StandardListItem>ANAME: {selectedUser.userDetails.ANAME}</StandardListItem>
                                {/* <StandardListItem>CLASS: {selectedUser.userDetails.CLASS}</StandardListItem> */}
                                <StandardListItem>USTYP: {selectedUser.userDetails.USTYP}</StandardListItem>
                                {/* <StandardListItem>DEPARTMENT:{selectedUser.userDetails.DEPARTMENT}</StandardListItem> */}
                            </List>
                            <h3 className="mt-4">Transactions</h3>
                            <List>
                                {selectedUser.transactions.map((transaction, index) => (
                                    <StandardListItem key={index}>
                                        {transaction[`TRANSACTION_CODE_${index}`]}: {transaction[`TRANSACTION_COUNT_${index}`]}
                                    </StandardListItem>
                                ))}
                            </List>
                        </>
                    )}
                </>
            }
            endColumn={
                <>
                    <Card>
                        <Bar
                            className="bg-transparent"
                            startContent={<Title className="text-xl">Role Usage Count</Title>}
                            endContent={
                                <Button
                                    icon="decline"
                                    design={ButtonDesign.Transparent}
                                    onClick={() => setLayout(FCLLayout.TwoColumnsMidExpanded)}
                                />
                            }
                        />
                        {selectedUserDetails ? (
                            <BarChart
                                data={selectedUserDetails} 
                                title="Role Usage Count " 
                            />
                        ) : (
                            <div className="p-4">Select a user to view role count.</div>
                        )}
                    </Card>
                </>
            }
        />
    );
};

export default ActiveUserRoleCountTable;

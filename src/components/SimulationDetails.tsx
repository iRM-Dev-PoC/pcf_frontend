import {
    AnalyticalTable,
    Bar,
    Button,
    Card,
    FlexBox,
    Modals,
    TextAlign,
} from "@ui5/webcomponents-react";
import {
    SimulationDetailsDataType,
    getHeaderTypes,
    webComponentsReactProps,
} from "../utils/types";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import HeaderDetails from "./HeaderDetails";
import ErrorComponent from "./ErrorComponent";
import NoDataComponent from "./NoDataComponent";

const SimulationDetails = () => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/data-sync/get-all-headers`;
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get(endPoint);
            if (res.data?.statuscode === 200) {
                setError(false);
            } else {
                setError(true);
            }
            return res.data;
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allHeaderData"],
        queryFn: fetchData,
        retry: 3,
    });

    console.log(isFetching);
    console.log(isError);

    const showDialog = Modals.useShowDialog();

    const allHeaderData: getHeaderTypes[] = data?.data;

    if (!isFetching && isError) {
        return <ErrorComponent />;
    }

    if (!isFetching && error) {
        return <ErrorComponent />;
    }

    if (!isFetching && allHeaderData.length === 0) {
        return <NoDataComponent />;
    }

    const showModal = ({ value }: { value: number }) => {
        const { close } = showDialog({
            children: <HeaderDetails value={value} />,
            footer: (
                <Bar
                    endContent={<Button onClick={() => close()}>Close</Button>}
                />
            ),
        });
    };

    return (
        <Card>
            <AnalyticalTable
                columns={[
                    {
                        Header: "ID",
                        accessor: "SYNC_ID",
                    },
                    {
                        Header: "Sync Started At",
                        accessor: "SYNC_STARTED_AT",
                    },
                    {
                        Header: "USER NAME",
                        headerTooltip: "Synced By",
                        accessor: "USER_NAME",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Preview",
                        disableFilters: true,
                        disableGroupBy: true,
                        disableResizing: true,
                        disableSortBy: true,
                        disableDragAndDrop: true,
                        Cell: () => {
                            return (
                                <Button
                                    onClick={() => {
                                        showModal({
                                            value: allHeaderData?.[0].ID,
                                        });
                                    }}
                                    design="Transparent"
                                >
                                    Details
                                </Button>
                            );
                        },
                    },
                    {
                        Cell: (instance: {
                            cell: string;
                            row: Record<string, SimulationDetailsDataType>;
                            webComponentsReactProperties: webComponentsReactProps;
                        }) => {
                            const { webComponentsReactProperties } = instance;
                            const isOverlay =
                                webComponentsReactProperties.showOverlay;
                            const rowData = instance.row.original;
                            const showDashboardButton = rowData.is_simulated;

                            return (
                                <FlexBox>
                                    {showDashboardButton && (
                                        <Button
                                            icon="performance"
                                            disabled={isOverlay}
                                        />
                                    )}
                                </FlexBox>
                            );
                        },
                        Header: "View Dashboard",
                        accessor: ".",
                        disableFilters: true,
                        disableGroupBy: true,
                        disableResizing: true,
                        disableSortBy: true,
                        id: "viewDashboard",
                        width: 150,
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Cell: (instance: {
                            cell: string;
                            row: Record<string, SimulationDetailsDataType>;
                            webComponentsReactProperties: webComponentsReactProps;
                        }) => {
                            const { webComponentsReactProperties } = instance;
                            const isOverlay =
                                webComponentsReactProperties.showOverlay;
                            const rowData = instance.row.original;
                            const showSimulateButton = !rowData.is_simulated;

                            return (
                                <FlexBox>
                                    {showSimulateButton && (
                                        <Button
                                            icon="synchronize"
                                            disabled={isOverlay}
                                        />
                                    )}
                                </FlexBox>
                            );
                        },
                        Header: "Simulate",
                        accessor: ".",
                        disableFilters: true,
                        disableGroupBy: true,
                        disableResizing: true,
                        disableSortBy: true,
                        id: "simulate",
                        width: 150,
                    },
                ]}
                data={allHeaderData?.map((header) => ({
                    ID: header.ID,
                    SYNC_ID: header.SYNC_ID,
                    SYNC_STARTED_AT: header.SYNC_STARTED_AT,
                    USER_NAME: header.USER_NAME,
                }))}
                filterable
                alternateRowColor
                rowHeight={44}
                selectionMode="None"
                loading={isFetching}
            />
        </Card>
    );
};

export default SimulationDetails;

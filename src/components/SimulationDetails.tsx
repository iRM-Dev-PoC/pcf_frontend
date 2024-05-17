import ErrorComponent from "@/components/ErrorComponent";
import HeaderDetails from "@/components/HeaderDetails";
import NoDataComponent from "@/components/NoDataComponent";
import { useHeaderData } from "@/hooks/useHeaderData";
import {
    SimulationDetailsDataType,
    getHeaderTypes,
    webComponentsReactProps,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
    AnalyticalTable,
    Badge,
    Bar,
    Button,
    Card,
    FlexBox,
    Modals,
    TextAlign,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const SimulationDetails = () => {
    const simulateEndPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/dataload/simulate-data`;
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showDialog = Modals.useShowDialog();

    const { data, isLoading: isFetching, error: isError } = useHeaderData();

    const allHeaderData: getHeaderTypes[] = data ? data : [];
    console.log(allHeaderData);

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
        console.log(value);

        const { close } = showDialog({
            children: <HeaderDetails value={value} />,
            footer: (
                <Bar
                    endContent={<Button onClick={() => close()}>Close</Button>}
                />
            ),
        });
    };

    console.log(allHeaderData);

    const handleSimulate = async (id: number) => {
        try {
            setIsLoading(true);
            const body = {
                id,
            };

            const res = await axios.post(simulateEndPoint, body);
            if (res.data?.statuscode !== 200) {
                throw "Failed to simulate data!";
            }
            return true;
        } catch (error) {
            console.error(error);
            setError(true);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const onSimulate = async (id: number) => {
        await toast.promise(handleSimulate(id), {
            loading: "Simulating data...",
            success: "Data simulated successfully!",
            error: (error) => `Failed to simulate data: ${error.message}`,
        });
    };

    return (
        <Card>
            <AnalyticalTable
                columns={[
                    {
                        Header: "SYNC ID",
                        accessor: "SYNC_ID",
                        width: 200,
                    },
                    {
                        Header: "Sync Started At",
                        accessor: "SYNC_STARTED_AT",
                        width: 650,
                    },
                    {
                        Header: "Username",
                        headerTooltip: "Synced By",
                        accessor: "USER_NAME",
                        hAlign: "center" as TextAlign,
                        width: 650,
                    },
                    {
                        Header: "Preview",
                        disableFilters: true,
                        disableGroupBy: true,
                        disableResizing: true,
                        disableSortBy: true,
                        disableDragAndDrop: true,
                        width: 120,
                        Cell: (instance: {
                            cell: string;
                            row: Record<string, SimulationDetailsDataType>;
                            webComponentsReactProperties: webComponentsReactProps;
                        }) => {
                            const rowData = instance.row.original;

                            return (
                                <Button
                                    onClick={() => {
                                        showModal({
                                            value: Number(rowData?.ID),
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
                            const showSimulateButton = !rowData.is_simulated;
                            const completedSimulate = Boolean(
                                rowData.IS_SIMULATED === 1
                            );

                            return (
                                <FlexBox>
                                    {showSimulateButton &&
                                    !completedSimulate ? (
                                        <Button
                                            icon="synchronize"
                                            disabled={isOverlay || isLoading}
                                            onClick={() =>
                                                onSimulate(Number(rowData?.ID))
                                            }
                                        />
                                    ) : (
                                        <Badge colorScheme="7">Completed</Badge>
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
                        width: 120,
                    },
                ]}
                data={allHeaderData?.map((header) => ({
                    ID: header.ID,
                    SYNC_ID: header.SYNC_ID,
                    SYNC_STARTED_AT: formatDate(header.SYNC_STARTED_AT),
                    USER_NAME: header.USER_NAME,
                    IS_SIMULATED: header.IS_SIMULATED,
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

import { useQuery } from "@tanstack/react-query";
import { AnalyticalTable, Badge, Card } from "@ui5/webcomponents-react";
import axios from "axios";
import { useState } from "react";
import { getAllSyncDetails } from "../utils/types";
import ErrorComponent from "./ErrorComponent";
import NoDataComponent from "./NoDataComponent";

type HeaderDetailsProps = {
    value: number;
};

const HeaderDetails = ({ value }: HeaderDetailsProps) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/data-sync/get-all-details`;
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            const requestData = {
                id: value,
            };
            const res = await axios.post(endPoint, requestData);
            if (res.data?.statuscode === 200) {
                setError(false);
            } else {
                setError(true);
            }
            return res.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allHeaderDetails"],
        queryFn: fetchData,
        retry: 3,
    });

    const badgeMap: Record<string, string> = {
        Completed: "8",
        Initiated: "1",
        Error: "2",
    };

    const headerDataDetails: getAllSyncDetails[] = data?.data;

    if (!isFetching && isError) {
        return <ErrorComponent />;
    }

    if (!isFetching && error) {
        return <ErrorComponent />;
    }

    if (!isFetching && headerDataDetails.length === 0) {
        return <NoDataComponent />;
    }

    const columns = [
        {
            Header: "Started At",
            accessor: "SYNC_STARTED_AT",
            headerTooltip: "Started At",
            width: 450,
        },

        {
            Header: "Ended At",
            accessor: "SYNC_ENDED_AT",
            headerTooltip: "Ended At",
            width: 450,
        },
        {
            Header: "Status",
            headerTooltip: "Status",
            width: 300,
            accessor: "SYNC_STATUS",
            Cell: (instance: {
                cell: string;
                row: Record<string, getAllSyncDetails>;
                accessor: string;
            }) => {
                const rowData = instance.row.original;
                const scheme = rowData.SYNC_STATUS;
                const colorscheme = badgeMap[scheme];
                return (
                    <Badge colorScheme={colorscheme} className="p-2">
                        {rowData.SYNC_STATUS}
                    </Badge>
                );
            },
        },
    ];

    return (
        <Card className="p-2">
            <div className="p-4">
                <AnalyticalTable
                    style={{ width: "100%" }}
                    noDataText="No Data Found"
                    alternateRowColor
                    className="tableHeader"
                    scaleWidthMode="Smart"
                    visibleRows={10}
                    columns={columns}
                    data={headerDataDetails}
                    loading={isFetching}
                    filterable
                    groupBy={[]}
                    rowHeight={44}
                    selectionMode="None"
                />
            </div>
        </Card>
    );
};

export default HeaderDetails;

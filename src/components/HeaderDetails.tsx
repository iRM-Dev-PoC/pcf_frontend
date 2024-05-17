import ErrorComponent from "@/components/ErrorComponent";
import NoDataComponent from "@/components/NoDataComponent";
import { getAllSyncDetails } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AnalyticalTable, Badge, Card } from "@ui5/webcomponents-react";
import axios from "axios";
import { useState } from "react";

type HeaderDetailsProps = {
    value: number;
};

const HeaderDetails = ({ value }: HeaderDetailsProps) => {
    const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/data-sync/get-all-details`;
    const [error, setError] = useState(false);

    const getAllHeaderDetails = async () => {
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
        queryFn: getAllHeaderDetails,
        retry: 3,
    });

    const badgeMap: Record<string, string> = {
        Completed: "8",
        Initiated: "1",
        Error: "2",
    };

    const headerDataDetails: getAllSyncDetails[] = data?.data;

    console.log(headerDataDetails);

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
            Header: "Report Name",
            accessor: "REPORT_NAME",
            headerTooltip: "Report Name",
            width: 450,
        },
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
                    data={headerDataDetails?.map((item) => ({
                        ID: item.SYNC_HEADER_ID,
                        REPORT_NAME: item.REPORT_NAME,
                        SYNC_STARTED_AT: formatDate(item.SYNC_STARTED_AT),
                        SYNC_ENDED_AT: formatDate(item.SYNC_ENDED_AT),
                        SYNC_STATUS: item.SYNC_STATUS,
                    }))}
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

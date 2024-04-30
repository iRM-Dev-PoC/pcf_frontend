import { useQuery } from "@tanstack/react-query";
import { AnalyticalTable, Card } from "@ui5/webcomponents-react";
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

    console.log(value);

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
            console.log(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allHeaderDetails"],
        queryFn: fetchData,
        retry: 3,
    });

    // console.log(data);

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
            Header: "CREATED ON",
            accessor: "CREATED_ON",
            headerTooltip: "CREATED_ON",
            disableDragAndDrop: true,
        },
        {
            Header: "CREATED BY",
            accessor: "CREATED_BY",
            headerTooltip: "CREATED_BY",
            disableDragAndDrop: true,
        },
        {
            Header: "SYNC STATUS",
            accessor: "SYNC_STATUS",
            headerTooltip: "USERS",
            disableDragAndDrop: true,
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
                    infiniteScroll
                    rowHeight={44}
                    selectedRowIds={{
                        3: true,
                    }}
                    selectionMode="None"
                />
            </div>
        </Card>
    );
};

export default HeaderDetails;

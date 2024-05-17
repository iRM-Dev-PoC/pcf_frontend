import Loading from "@/components/Loading";
import {
    checkPointDatType,
    getReportCheckPointMappingType,
    reportDataType,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
    FCLLayout,
    FlexibleColumnLayout,
    List,
    StandardListItem,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useState } from "react";

import ErrorComponent from "@/components/ErrorComponent";
import NoDataComponent from "@/components/NoDataComponent";

const AddReportCheckPointMapping = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [, setSelectedCheckPointMapping] = useState<
        getReportCheckPointMappingType | undefined
    >(undefined);
    const [error, setError] = useState(false);

    const getAllMappingData = async () => {
        try {
            const endPointAllReports = `${import.meta.env.VITE_BACKEND_BASE_URL}/report-check-point-mapping/get-all-mappings`;
            const response = await axios.get(endPointAllReports);
            console.log(response.data);

            const mappingData = response?.data;
            if (response.data.statuscode !== 200) {
                setError(true);
            }
            setError(false);
            console.log(mappingData);

            return mappingData;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allReportCheckPointMappingData"],
        queryFn: getAllMappingData,
        retry: 3,
    });

    const checkPointMappingData = data;

    const arrow = " --> ";

    console.log(data);

    const allReportCheckPointMappingData: getReportCheckPointMappingType[] =
        checkPointMappingData?.data;

    console.log(allReportCheckPointMappingData);

    const allReportData: reportDataType[] = checkPointMappingData?.reportdata;
    const allCheckPointData: checkPointDatType[] =
        checkPointMappingData?.checkpointdata;

    console.log(allReportData);
    console.log(allCheckPointData);

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allReportCheckPointMappingData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const checkPointMappingId = parseInt(e.detail.item.dataset.moduleId);
        const mappingData = allReportCheckPointMappingData.find(
            (mapping) => Number(mapping.ID) === checkPointMappingId
        );
        setSelectedCheckPointMapping(mappingData);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allReportCheckPointMappingData.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    style={{
                        height: "100%",
                        width: "100%",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                    }}
                    layout={layout}
                    startColumn={
                        <List onItemClick={onStartColumnClick}>
                            {allReportCheckPointMappingData?.map(
                                (mapping, index) => (
                                    <StandardListItem
                                        data-report-id={mapping.ID}
                                        key={`${mapping.ID}-${index}`}
                                    >
                                        <span className="text-nowrap">
                                            {
                                                allReportData.find(
                                                    (report) =>
                                                        report.ID ===
                                                        mapping.REPORT_ID
                                                )?.REPORT_NAME
                                            }
                                            {arrow}
                                            {
                                                allCheckPointData.find(
                                                    (checkpoint) =>
                                                        checkpoint.ID ===
                                                        mapping.CHECK_POINT_ID
                                                )?.CHECK_POINT_NAME
                                            }
                                        </span>
                                    </StandardListItem>
                                )
                            )}
                        </List>
                    }
                />
            )}
        </>
    );
};

export default AddReportCheckPointMapping;

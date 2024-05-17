/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import CardHeader from "@/components/SoD/CardHeader";
import { canDoDetailsDataApiResponse } from "@/lib/types";
import canDoData from "@/mockSoDData/canDoDetails.json";
import { AnalyticalTable, Card } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";

const CanDoDetailsData = () => {
    const [canDoDetailsDataSoD, setCanDoDetailsDataSoD] = useState<
        canDoDetailsDataApiResponse[] | undefined
    >(undefined);

    useEffect(() => {
        const getAllCanDoDetailsData = async () => {
            try {
                const response = await JSON.parse(JSON.stringify(canDoData));
                setCanDoDetailsDataSoD(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getAllCanDoDetailsData();
    }, []);

    const canDoDetailsData = canDoDetailsDataSoD;

    const columns = [
        {
            Header: "Business Process",
            accessor: "BUSINESS_PROCESS",
            headerTooltip: "Business Process",
            disableDragAndDrop: true,
        },
        {
            Header: "Risk Rating",
            accessor: "risk_level",
            headerTooltip: "Risk Rating",
            disableDragAndDrop: true,
        },
        {
            Header: "Rule Name",
            accessor: "sod_name",
            headerTooltip: "Rule Name",
            disableDragAndDrop: true,
        },
        {
            Header: "User Name",
            accessor: "user_display",
            headerTooltip: "User Name",
            disableDragAndDrop: true,
        },
        {
            Header: "Function 1",
            accessor: "function_name",
            headerTooltip: "Function 1",
            disableDragAndDrop: true,
        },
        {
            Header: "Role",
            accessor: "role_name",
            headerTooltip: "Role",
            disableDragAndDrop: true,
        },
        {
            Header: "Type of Role Conflict",
            accessor: "role_conflict_type",
            headerTooltip: "Type of Role Conflict",
            disableDragAndDrop: true,
        },
        {
            Header: "Transaction Code Leg 1",
            accessor: "transaction_code",
            headerTooltip: "Transaction Code Leg 1",
            disableDragAndDrop: true,
        },
        {
            Header: "Incident Path",
            accessor: "incident_path",
            headerTooltip: "Incident Path",
            disableDragAndDrop: true,
        },
        {
            Header: "Function 2",
            accessor: "function_name2",
            headerTooltip: "Function 2",
            disableDragAndDrop: true,
        },
        {
            Header: "Conflicting Role Leg 2",
            accessor: "transaction_code2",
            headerTooltip: "Conflicting Role Leg 2",
            disableDragAndDrop: true,
        },
        {
            Header: "Conflicting Transaction Code Leg 2",
            accessor: "conflicting_role_leg2",
            headerTooltip: "Conflicting Transaction Code Leg 2",
            disableDragAndDrop: true,
        },
        {
            Header: "Conflict Type",
            accessor: "conflict_type",
            headerTooltip: "Conflict Type",
            disableDragAndDrop: true,
        },
        {
            Header: "Org Level",
            accessor: "org_level",
            headerTooltip: "Org Level",
            disableDragAndDrop: true,
        },
        {
            Header: "Org Value",
            accessor: "org_value",
            headerTooltip: "Org Value",
            disableDragAndDrop: true,
        },
    ];

    const tableData: canDoDetailsDataApiResponse[] =
        canDoDetailsData?.data?.map((item: canDoDetailsDataApiResponse) => {
            return {
                BUSINESS_PROCESS: item.BUSINESS_PROCESS,
                risk_level: item.risk_level,
                sod_name: item.sod_name,
                user_display: item.user_display,
                function_name: item.function_name,
                role_name: item.role_name,
                role_conflict_type: item.role_conflict_type,
                transaction_code: item.transaction_code,
                incident_path: item.incident_path,
                function_name2: item.function_name2,
                transaction_code2: item.transaction_code2,
                conflicting_role_leg2: item.conflicting_role_leg2,
                conflict_type: item.conflict_type,
                org_level: item.org_level,
                org_value: item.org_value,
            };
        });

    return (
        <Card className="p-2">
            <div className="p-3 text-xl font-bold">Can Do Summary Details</div>
            <CardHeader />

            <div className="p-4">
                <AnalyticalTable
                    style={{ width: "100%" }}
                    noDataText="No Data Found"
                    visibleRowCountMode="Fixed"
                    alternateRowColor
                    scaleWidthMode="Smart"
                    visibleRows={10}
                    columns={columns}
                    data={tableData}
                    filterable
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

export default CanDoDetailsData;

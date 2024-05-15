/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
    AnalyticalTable,
    Bar,
    Button,
    Card,
    Modals,
} from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import { candoDataType } from "../../lib/types";
import CanDoDetailsData from "./CanDoDetailsData";
import CanDoSummaryHeader from "./CanDoSummaryHeader";
import CardHeader from "./CardHeader";

import canDoSummarychart from "../../mockSoDData/canDoSummary.json";

const CanDoSummary = () => {
    const [, setSodSection] = useState<boolean>(false);
    const [, setSensitiveSection] = useState<boolean>(false);
    const [, setAllSection] = useState<boolean>(false);
    const [, setRefetch] = useState<boolean>(false);
    const [canDoSummaryDataSoD, setcanDoSummaryDataSoD] = useState();

    useEffect(() => {
        const getCanDoSummaryData = async () => {
            try {
                const response = await JSON.parse(
                    JSON.stringify(canDoSummarychart)
                );
                setcanDoSummaryDataSoD(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getCanDoSummaryData();
    }, []);

    const showDialog = Modals.useShowDialog();

    if (canDoSummaryDataSoD === undefined) return null;

    const canDoSummaryData = canDoSummaryDataSoD;

    const columns = [
        {
            Header: "Business Process",
            accessor: "BUSINESS_PROCESS",
            headerTooltip: "Business Process",
            disableDragAndDrop: true,
            width: 200,
        },
        {
            Header: "Rule Name",
            accessor: "sod_name",
            headerTooltip: "Rule Name",
            disableDragAndDrop: true,
        },
        {
            Header: "Risk Description",
            accessor: "risk_description",
            headerTooltip: "Risk Description",
            disableDragAndDrop: true,
        },
        {
            Header: "Risk Rating",
            accessor: "SOD_RISK_RATING",
            headerTooltip: "Risk Rating",
            disableDragAndDrop: true,
        },
        {
            Header: "Active Can Do Users",
            accessor: "can_do_users",
            headerTooltip: "Active Can Do Users",
            disableDragAndDrop: true,
        },
        {
            Header: "Role",
            accessor: "role_name",
            headerTooltip: "Role",
            disableDragAndDrop: true,
        },
        {
            Header: "Instances",
            accessor: "xx_row_id",
            headerTooltip: "Instances",
            disableDragAndDrop: true,
        },
        {
            Header: "SoD Report",
            disableFilters: true,
            disableGroupBy: true,
            disableResizing: true,
            disableSortBy: true,
            disableDragAndDrop: true,
            Cell: () => {
                return (
                    <Button
                        onClick={() => {
                            showModal();
                        }}
                        design="Transparent"
                    >
                        Details
                    </Button>
                );
            },
        },
    ];

    const showModal = () => {
        const { close } = showDialog({
            children: <CanDoDetailsData />,
            footer: (
                <Bar
                    endContent={<Button onClick={() => close()}>Close</Button>}
                />
            ),
        });
    };

    const tableData: candoDataType[] = (canDoSummaryData!.candoData ?? []).map(
        (item: candoDataType) => ({
            BUSINESS_PROCESS: item.BUSINESS_PROCESS,
            sod_name: item.sod_name,
            risk_description: item.risk_description,
            SOD_RISK_RATING: item.SOD_RISK_RATING,
            can_do_users: item.can_do_users,
            role_name: item.role_name,
            xx_row_id: item.xx_row_id,
        })
    );

    return (
        <Card className="mb-2 p-2">
            <CanDoSummaryHeader
                setAllSection={setAllSection}
                setRefetch={setRefetch}
                setSodSection={setSodSection}
                setSensitiveSection={setSensitiveSection}
                title="Can Do Summary"
            />

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
                />
            </div>
        </Card>
    );
};

export default CanDoSummary;

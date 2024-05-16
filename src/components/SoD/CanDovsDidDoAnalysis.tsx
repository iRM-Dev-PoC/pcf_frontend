import CanDoAnalysisDetailsTable from "@/components/SoD/CanDoAnalysisDetails";
import CardHeader from "@/components/SoD/CardHeader";
import chartData from "@/mockSoDData/canDoVSDidDo.json";
import {
    AnalyticalTable,
    Bar,
    Button,
    Card,
    Modals,
} from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import { CanDovsDidDoDataApiResponse, SoDData } from "../../lib/types";

const CanDovsDidDoAnalysis = () => {
    const [chartDataSoD, setChartDataSoD] = useState();
    const showDialog = Modals.useShowDialog();

    useEffect(() => {
        const getCanDoVSDidDoAnalysis = async () => {
            try {
                const response = await JSON.parse(JSON.stringify(chartData));
                setChartDataSoD(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getCanDoVSDidDoAnalysis();
    }, []);

    if (chartDataSoD === undefined) return null;
    const canDoVSDidDoAnalysisData: CanDovsDidDoDataApiResponse = chartDataSoD;

    const showModal = ({ jsonData }: { jsonData: string }) => {
        const { close } = showDialog({
            children: <CanDoAnalysisDetailsTable data={jsonData} />,
            footer: (
                <Bar
                    endContent={<Button onClick={() => close()}>Close</Button>}
                />
            ),
        });
    };

    const columns = [
        {
            Header: "Level",
            accessor: "Level",
            headerTooltip: "Level",
            disableDragAndDrop: true,
        },
        {
            Header: "Risk ID",
            accessor: "sod_risk_id",
            headerTooltip: "Risk ID",
            disableDragAndDrop: true,
        },
        {
            Header: "SoD Rule",
            accessor: "sod_rule",
            headerTooltip: "SoD Rule",
            disableDragAndDrop: true,
        },
        {
            accessor: "business_process",
            Header: "Buisness Process",
            headerTooltip: "Buisness Process",
            disableDragAndDrop: true,
        },
        {
            Header: "SoD Risk Rating",
            accessor: "sod_risk_rating",
            headerTooltip: "SoD Risk Rating",
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
        {
            Header: "Active Can Do Users",
            accessor: "can_do_users",
            headerTooltip: "Active Can Do Users",
            disableDragAndDrop: true,
        },
        {
            Header: "Did Do Users",
            accessor: "diddo_users",
            headerTooltip: "Did Do Users",
            disableDragAndDrop: true,
        },
        {
            Header: "Transaction Count",
            accessor: "breach_count",
            headerTooltip: "Transaction Count",
            disableDragAndDrop: true,
        },
        {
            Header: "Transaction Value",
            accessor: "breach_value",
            headerTooltip: "Transaction Value",
            disableDragAndDrop: true,
        },
        {
            Header: "Local Currency",
            accessor: "local_currency",
            headerTooltip: "Local Currency",
            disableDragAndDrop: true,
        },
        {
            Header: "Transaction Details",
            disableDragAndDrop: true,
            accessor: "raw_json",
            disableFilters: true,
            disableGroupBy: true,
            disableResizing: true,
            disableSortBy: true,
            id: "raw_json",
            minWidth: 100,
            width: 100,
            Cell: () => {
                return (
                    <Button
                        onClick={() => {
                            showModal({ jsonData: tableData[0].raw_json });
                        }}
                        design="Transparent"
                    >
                        Show Details
                    </Button>
                );
            },
        },
    ];

    const analysisData = canDoVSDidDoAnalysisData?.diddoData.map((val) => ({
        Level: val.Level,
        sod_risk_id: val.sod_risk_id,
        sod_rule: val.sod_rule,
        business_process: val.business_process,
        sod_risk_rating: val.sod_risk_rating,
        org_level: val.org_level,
        org_value: val.org_value,
        can_do_users: val.can_do_users,
        diddo_users: JSON.parse(val.diddo_users).join(", "),
        breach_count: val.breach_count,
        breach_value: val.breach_value,
        local_currency: val.local_currency,
        raw_json: val.raw_json,
    }));

    const tableData: SoDData[] = analysisData?.map((val) => ({
        Level: val.Level,
        sod_risk_id: val.sod_risk_id,
        sod_rule: val.sod_rule,
        business_process: val.business_process,
        sod_risk_rating: val.sod_risk_rating,
        org_level: val.org_level,
        org_value: val.org_value,
        can_do_users: val.can_do_users,
        diddo_users: val.diddo_users,
        breach_count: val.breach_count,
        breach_value: val.breach_value,
        local_currency: val.local_currency,
        raw_json: val.raw_json,
    }));

    return (
        <Card className="p-2">
            <CardHeader title="Can Do vs Did Do Analysis" />

            <div className="p-4">
                <AnalyticalTable
                    style={{ width: "100%" }}
                    noDataText="No Data Found"
                    alternateRowColor
                    className="tableHeader"
                    scaleWidthMode="Smart"
                    visibleRows={10}
                    columns={columns}
                    data={tableData}
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

export default CanDovsDidDoAnalysis;

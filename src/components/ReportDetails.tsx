import {
    AnalyticalTable,
    Button,
    Card,
    FlexBox,
    TextAlign,
} from "@ui5/webcomponents-react";
import { reportData } from "../lib/reportData";
import { webComponentsReactProps } from "../utils/types";

const ReportDetails = () => {
    return (
        <Card>
            <AnalyticalTable
                columns={[
                    {
                        Header: "Report_ID",
                        accessor: "report_ID",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Report Name",
                        accessor: "report_name",
                        headerTooltip: "Full Name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Customer ID",
                        accessor: "customer_ID",
                        headerTooltip: "Full Name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Created By",
                        accessor: "created_By",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Cell: (instance: {
                            cell: string;
                            row: string;
                            webComponentsReactProperties: webComponentsReactProps;
                        }) => {
                            const { webComponentsReactProperties } = instance;
                            const isOverlay =
                                webComponentsReactProperties.showOverlay;
                            return (
                                <FlexBox>
                                    <Button
                                        icon="create-entry-time"
                                        disabled={isOverlay}
                                    />
                                </FlexBox>
                            );
                        },
                        Header: "Created At",
                        accessor: ".",
                        disableFilters: true,
                        disableGroupBy: true,
                        disableResizing: true,
                        disableSortBy: true,
                        id: "created_at",
                        width: 100,
                    },

                    {
                        Cell: (instance: {
                            cell: string;
                            row: string;
                            webComponentsReactProperties: webComponentsReactProps;
                        }) => {
                            const { webComponentsReactProperties } = instance;
                            const isOverlay =
                                webComponentsReactProperties.showOverlay;

                            return (
                                <FlexBox>
                                    <Button
                                        icon="add-document"
                                        disabled={isOverlay}
                                    />
                                    <Button icon="edit" disabled={isOverlay} />
                                    <Button
                                        icon="delete"
                                        disabled={isOverlay}
                                    />
                                </FlexBox>
                            );
                        },
                        Header: "Actions",
                        accessor: ".",
                        disableFilters: true,
                        disableGroupBy: true,
                        disableResizing: true,
                        disableSortBy: true,
                        id: "actions",
                        width: 150,
                        hAlign: "center" as TextAlign,
                    },
                ]}
                data={reportData.map((item) => ({
                    report_ID: item.report_ID,
                    report_name: item.report_name,
                    customer_ID: item.customer_ID,
                    created_By: item.created_By,
                }))}
                filterable
                infiniteScroll
                alternateRowColor
                rowHeight={44}
                selectedRowIds={{
                    3: true,
                }}
                selectionMode="None"
            />
        </Card>
    );
};

export default ReportDetails;

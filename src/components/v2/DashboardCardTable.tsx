import { AnalyticalTable, Card, Tab, TabContainer } from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";

const DashboardCardTable: React.FC<{ modalData: any[], modalData1: any[], modalData2: any[], isBaseCard: boolean }> = ({
    modalData,
    modalData1,
    modalData2,
    isBaseCard,
}) => {
    const [columns, setColumns] = useState<any[]>([]);
    const [columns1, setColumns1] = useState<any[]>([]);
    const [columns2, setColumns2] = useState<any[]>([]);

    // Generate columns dynamically based on the data
    useEffect(() => {
        const generateColumns = (data: any[]) => {
            if (data.length === 0) return [];

            const headers = Object.keys(data[0]);

            // Filter columns based on the card type
            const filteredHeaders = isBaseCard
                ? headers.slice(3)  // Exclude the first 3 columns for the base card
                : headers.slice();  // Exclude the last column for the exception card

            return filteredHeaders.map((header, index) => ({
                Header: header,
                accessor: header,
                autoResizable: true,
                Cell: (props) => {
                    const isHighlighted = !isBaseCard && (index <= props?.filteredRows?.[0].values?.NO_COLUMNS - 1);
                    return (
                        <div
                            style={{
                                backgroundColor: isHighlighted ? "red" : "inherit",
                                padding: "8px",
                                borderRadius: "15px",
                                color: isHighlighted ? "white" : "inherit",
                                width:"100%",
                            }}
                        >
                            {props.value}
                        </div>
                    );
                },
            }));
        };

        setColumns(generateColumns(modalData));
        setColumns1(generateColumns(modalData1));
        setColumns2(generateColumns(modalData2));
    }, [modalData, modalData1, modalData2, isBaseCard]);

    if (isBaseCard) {
        return (
            <Card>
                <TabContainer>
                    <Tab text="Base Data">
                        <AnalyticalTable
                            columns={columns}
                            data={modalData}
                            filterable
                            infiniteScroll
                        />
                    </Tab>
                    {modalData1.length > 0 && (
                        <Tab text="Table 1">
                            <AnalyticalTable
                                columns={columns1}
                                data={modalData1}
                                filterable
                                infiniteScroll
                            />
                        </Tab>
                    )}
                    {modalData2.length > 0 && (
                        <Tab text="Table 2">
                            <AnalyticalTable
                                columns={columns2}
                                data={modalData2}
                                filterable
                                infiniteScroll
                            />
                        </Tab>
                    )}
                </TabContainer>
                <div className="px-3 py-2">
                    <p className="text-base">
                        Showing
                        <span className="mx-1 text-blue-500">
                            {modalData?.length}
                        </span>
                        row(s)
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <AnalyticalTable
                columns={columns}
                data={modalData}
                filterable
                infiniteScroll
            />
            <div className="px-3 py-2">
                <p className="text-base">
                    Showing
                    <span className="mx-1 text-blue-500">
                        {modalData?.length}
                    </span>
                    row(s)
                </p>
            </div>
        </Card>
    );
};

export default DashboardCardTable;

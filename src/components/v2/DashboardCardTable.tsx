import { AnalyticalTable, Card } from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";

const DashboardCardTable: React.FC<{ modalData: any[] }> = ({
    modalData,
}) => {
    const [columns, setColumns] = useState<any[]>([]);

    // Generate columns dynamically based on the data
    useEffect(() => {
        const generateColumns = (data: any[]) => {
            if (data.length === 0) return [];

            const headers = Object.keys(data[0]);
            return headers.slice(3).map((header) => ({
                Header: header,
                accessor: header,
                autoResizable: true,
            }));
        };

        setColumns(generateColumns(modalData));
    }, [modalData]);

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

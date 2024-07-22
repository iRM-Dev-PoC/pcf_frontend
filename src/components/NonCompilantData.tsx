import { AnalyticalTable, Card } from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";

const NonCompilantData: React.FC<{ nonCompilantDataRes: any[] }> = ({
    nonCompilantDataRes,
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

        setColumns(generateColumns(nonCompilantDataRes));
    }, [nonCompilantDataRes]);

    return (
        <Card>
            <h1 className="p-6 text-xl font-semibold">
                Non Compliant Data
            </h1>
            <AnalyticalTable
                columns={columns}
                data={nonCompilantDataRes}
                filterable
                // header="Non-Compliant Data"
                infiniteScroll
            />
            <div className="px-3 py-2">
                <p className="text-base">
                    Showing
                    <span className="mx-1 text-blue-500">
                        {nonCompilantDataRes?.length}
                    </span>
                    row(s)
                </p>
            </div>
        </Card>
    );
};

export default NonCompilantData;

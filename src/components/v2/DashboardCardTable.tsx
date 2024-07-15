// import { AnalyticalTable, Card } from "@ui5/webcomponents-react";

// const DashboardCardTable = ({modalData} : any) => {
//   return (
//       <Card>
//           <AnalyticalTable
//               columns={[
//                   {
//                       Header: "Name",
//                       accessor: "name",
//                   },
//                   {
//                       Header: "Age",
//                       accessor: "age",
//                   },
//                   {
//                       Header: "Friend Name",
//                       accessor: "friend.name",
//                   },
//               ]}
//               data={[
//                   {
//                       age: 80,
//                       friend: {
//                           age: 68,
//                           name: "Carver Vance",
//                       },
//                       name: "Allen Best",
//                       status: "Success",
//                   },
//                   {
//                       age: 84,
//                       friend: {
//                           age: 44,
//                           name: "Petra Potter",
//                       },
//                       name: "Janis Mcgowan",
//                       status: "Information",
//                   },
//               ]}
//               filterable
//               infiniteScroll
//               onLoadMore={function _a() {}}
//               onTableScroll={function _a() {}}
//           />
//       </Card>
//   );
// }

// export default DashboardCardTable

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
            return headers.map((header) => ({
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
                // header="Non-Compliant Data"
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


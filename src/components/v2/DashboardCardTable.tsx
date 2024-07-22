// // import { AnalyticalTable, Card, Tab, TabContainer } from "@ui5/webcomponents-react";
// // import React, { useEffect, useState } from "react";

// // const DashboardCardTable: React.FC<{ modalData: any[] }> = ({
// //     modalData,
// // }) => {
// //     const [columns, setColumns] = useState<any[]>([]);

// //     // Generate columns dynamically based on the data
// //     useEffect(() => {
// //         const generateColumns = (data: any[]) => {
// //             if (data.length === 0) return [];

// //             const headers = Object.keys(data[0]);
// //             return headers.slice(3).map((header) => ({
// //                 Header: header,
// //                 accessor: header,
// //                 autoResizable: true,
// //             }));
// //         };

// //         setColumns(generateColumns(modalData));
// //     }, [modalData]);

// //     return (
// //         <Card>
// //             <AnalyticalTable
// //                 columns={columns}
// //                 data={modalData}
// //                 filterable
// //                 infiniteScroll
// //             />
// //             <div className="px-3 py-2">
// //                 <p className="text-base">
// //                     Showing
// //                     <span className="mx-1 text-blue-500">
// //                         {modalData?.length}
// //                     </span>
// //                     row(s)
// //                 </p>
// //             </div>
// //         </Card>
// //     );
// // };

// // export default DashboardCardTable;

// import { AnalyticalTable, Card, Tab, TabContainer } from "@ui5/webcomponents-react";
// import React, { useEffect, useState } from "react";

// const DashboardCardTable: React.FC<{ modalData: any[], isBaseCard: boolean }> = ({
//     modalData,
//     isBaseCard,
// }) => {
//     const [columns, setColumns] = useState<any[]>([]);

//     // Generate columns dynamically based on the data
//     useEffect(() => {
//         const generateColumns = (data: any[]) => {
//             if (data.length === 0) return [];

//             const headers = Object.keys(data[0]);
//             return headers.slice(3).map((header) => ({
//                 Header: header,
//                 accessor: header,
//                 autoResizable: true
//             }));
//         };

//         setColumns(generateColumns(modalData));
//     }, [modalData]);

//     if (isBaseCard) {
//         return (
//             <Card>
//                 <TabContainer>
//                     <Tab text="Tab One">
//                         <AnalyticalTable
//                             columns={columns}
//                             data={modalData}
//                             filterable
//                             infiniteScroll
//                             style={{"backgroundColor" : "red"}}
//                         />
//                     </Tab>
//                     <Tab text="Tab Two">
//                         <AnalyticalTable
//                             columns={columns}
//                             data={modalData}
//                             filterable
//                             infiniteScroll
//                         />
//                     </Tab>
//                 </TabContainer>
//                 <div className="px-3 py-2">
//                     <p className="text-base">
//                         Showing
//                         <span className="mx-1 text-blue-500">
//                             {modalData?.length}
//                         </span>
//                         row(s)
//                     </p>
//                 </div>
//             </Card>
//         );
//     }

//     return (
//         <Card>
//             <AnalyticalTable
//                 columns={columns}
//                 data={modalData}
//                 filterable
//                 infiniteScroll
//             />
//             <div className="px-3 py-2">
//                 <p className="text-base">
//                     Showing
//                     <span className="mx-1 text-blue-500">
//                         {modalData?.length}
//                     </span>
//                     row(s)
//                 </p>
//             </div>
//         </Card>
//     );
// };

// export default DashboardCardTable;
// import { AnalyticalTable, Card, Tab, TabContainer } from "@ui5/webcomponents-react";
// import React, { useEffect, useState } from "react";

// const DashboardCardTable: React.FC<{ modalData: any[], isBaseCard: boolean }> = ({
//     modalData,
//     isBaseCard,
// }) => {
//     const [columns, setColumns] = useState<any[]>([]);

//     // Generate columns dynamically based on the data
//     useEffect(() => {
//         const generateColumns = (data: any[]) => {
//             if (data.length === 0) return [];

//             const headers = Object.keys(data[0]);
//             return headers.map((header, index) => ({
//                 Header: header,
//                 accessor: header,
//                 autoResizable: true,
//                 Cell: (props) => {
//                     const isHighlighted = !isBaseCard && (index === 0 || index === 1);
//                     return (
//                         <div
//                             style={{
//                                 backgroundColor: isHighlighted ? "yellow" : "inherit",
//                             }}
//                         >
//                             {props.value}
//                         </div>
//                     );
//                 },
//             }));
//         };

//         setColumns(generateColumns(modalData));
//     }, [modalData, isBaseCard]);

//     if (isBaseCard) {
//         return (
//             <Card>
//                 <TabContainer>
//                     <Tab text="Tab One">
//                         <AnalyticalTable
//                             columns={columns}
//                             data={modalData}
//                             filterable
//                             infiniteScroll
//                         />
//                     </Tab>
//                     <Tab text="Tab Two">
//                         <AnalyticalTable
//                             columns={columns}
//                             data={modalData}
//                             filterable
//                             infiniteScroll
//                         />
//                     </Tab>
//                 </TabContainer>
//                 <div className="px-3 py-2">
//                     <p className="text-base">
//                         Showing
//                         <span className="mx-1 text-blue-500">
//                             {modalData?.length}
//                         </span>
//                         row(s)
//                     </p>
//                 </div>
//             </Card>
//         );
//     }

//     return (
//         <Card>
//             <AnalyticalTable
//                 columns={columns}
//                 data={modalData}
//                 filterable
//                 infiniteScroll
//             />
//             <div className="px-3 py-2">
//                 <p className="text-base">
//                     Showing
//                     <span className="mx-1 text-blue-500">
//                         {modalData?.length}
//                     </span>
//                     row(s)
//                 </p>
//             </div>
//         </Card>
//     );
// };

// export default DashboardCardTable;

import { AnalyticalTable, Card, Tab, TabContainer } from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";

type DashboardCardTableProps = {
    modalData: any[];
    isBaseCard: boolean;
    NO_COLUMNS: number;
};

const DashboardCardTable: React.FC<DashboardCardTableProps> = ({
    modalData,
    isBaseCard,
    NO_COLUMNS,
}) => {
    const [columns, setColumns] = useState<any[]>([]);

    // Generate columns dynamically based on the data
    useEffect(() => {
        const generateColumns = (data: any[]) => {
            if (data.length === 0) return [];

            const headers = Object.keys(data[0]);
            const relevantHeaders = isBaseCard ? headers.slice(3) : headers.slice(0, -1);

            return relevantHeaders.map((header, index) => {
                const isHighlighted = !isBaseCard && ((NO_COLUMNS === 2 && (index === 0 || index === 1)) || (NO_COLUMNS === 1 && index === 0));
                return {
                    Header: header,
                    accessor: header,
                    autoResizable: true,
                    Cell: (props) => (
                        <div
                            style={{
                                backgroundColor: isHighlighted ? "yellow" : "inherit",
                            }}
                        >
                            {props.value}
                        </div>
                    ),
                };
            });
        };

        setColumns(generateColumns(modalData));
    }, [modalData, isBaseCard, NO_COLUMNS]);

    if (isBaseCard) {
        return (
            <Card>
                <TabContainer>
                    <Tab text="Billing Invoice">
                        <AnalyticalTable
                            columns={columns}
                            data={modalData}
                            filterable
                            infiniteScroll
                        />
                    </Tab>
                    <Tab text="Sales order">
                        <AnalyticalTable
                            columns={columns}
                            data={modalData}
                            filterable
                            infiniteScroll
                        />
                    </Tab>
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

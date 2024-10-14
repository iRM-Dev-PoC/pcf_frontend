// import { AnalyticalTable, Card } from "@ui5/webcomponents-react";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const UserStatusTable = () => {
//     const userStatusEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/users`;
//     const [userStatusData, setUserStatusData] = useState([]);
//     const [isFetching, setIsFetching] = useState(false);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsFetching(true);
//             try {
//                 const response = await axios.post(userStatusEndpoint, {
//                     customer_id: 1,
//                     hdrId: 2
//                 });
//                 if (response.data?.statuscode === 200) {
//                     setUserStatusData(response.data.data.activeUsers);
//                 } else {
//                     console.error("Unexpected API response format");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user status data:", error);
//                 setError(true);
//             } finally {
//                 setIsFetching(false);
//             }
//         };
        
//         fetchData();
//     }, []);

//     const columns = [
//         // { Header: "User ID", accessor: "ID", width: 150 },
//         { Header: "Login Name", accessor: "BNAME", width: 200 },
//         { Header: "Role", accessor: "ANAME", width: 150 },
//         { Header: "Account Number", accessor: "ACCNT", width: 200 },
//         { Header: "User Type", accessor: "USTYP", width: 200 },
//         { Header: "Last Transaction Date", accessor: "TRDAT", width: 200 },
//     ];

//     return (
//         <Card>
//             {error ? (
//                 <div className="p-4 text-red-600">
//                     <p>Failed to load user status data. Please try again later.</p>
//                 </div>
//             ) : (
//                 <AnalyticalTable
//                     columns={columns}
//                     data={userStatusData}
//                     filterable
//                     alternateRowColor
//                     rowHeight={44}
//                     selectionMode="None"
//                     loading={isFetching}
//                 />
//             )}
//             {!isFetching && !error && (
//                 <div className="p-2">
//                     <p className="text-base font-semibold">
//                         Showing <span className="text-sky-700">{userStatusData.length}</span> record(s).
//                     </p>
//                 </div>
//             )}
//         </Card>
//     );
// };

// export default UserStatusTable;



// import { AnalyticalTable, Card } from "@ui5/webcomponents-react";
// import axios from "axios";
// import { useEffect, useState } from "react";


// type Column = {
//     Header: string;
//     accessor: string;
//     autoResizable: boolean;
// };

// const UserStatusTable = () => {
//     const userStatusEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/users`;
//     const [userStatusData, setUserStatusData] = useState<any[]>([]);
//     const [isFetching, setIsFetching] = useState(false);
//     const [error, setError] = useState(false);
//     const [columns, setColumns] = useState<Column[]>([]); 

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsFetching(true);
//             try {
//                 const response = await axios.post(userStatusEndpoint, {
//                     customer_id: 1,
//                     hdrId: 2
//                 });
//                 console.log("API Response:", response.data); 

//                 if (response.data?.statuscode === 200) {
//                     const data = response.data.data.activeUsers;
//                     setUserStatusData(data);
//                     generateColumns(data);
//                 } else {
//                     console.error("Unexpected API response format");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user status data:", error);
//                 setError(true);
//             } finally {
//                 setIsFetching(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const generateColumns = (data: any[]) => {
//         if (!data || data.length === 0) return;

//         const headers = Object.keys(data[0]);
//         const generatedColumns: Column[] = headers.slice(3,15).map((header)=> ({
//             Header: header,
//             accessor: header,
//             autoResizable: true,
//         }));

//         console.log("Generated Columns:", generatedColumns); 
//         setColumns(generatedColumns); 
//     };

//     console.log("User Status Data:", userStatusData); 

//     return (
//         <Card>
//             {error ? (
//                 <div className="p-4 text-red-600">
//                     <p>Failed to load user status data. Please try again later.</p>
//                 </div>
//             ) : (
//                 <AnalyticalTable
//                     columns={columns}
//                     data={userStatusData}
//                     filterable
//                     alternateRowColor
//                     rowHeight={44}
//                     selectionMode="None"
//                     loading={isFetching}
//                 />
//             )}
//             {!isFetching && !error && (
//                 <div className="p-2">
//                     <p className="text-base font-semibold">
//                         Showing <span className="text-sky-700">{userStatusData.length}</span> record(s).
//                     </p>
//                 </div>
//             )}
//         </Card>
//     );
// };

// export default UserStatusTable;


import { AnalyticalTable, Card, TabContainer, Tab } from "@ui5/webcomponents-react";
import axios from "axios";
import { useEffect, useState } from "react";

type Column = {
  Header: string;
  accessor: string;
  autoResizable: boolean;
};

const UserStatusTable = () => {
  const userStatusEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/users`;
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<any[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Active Users");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.post(userStatusEndpoint, {
        customer_id: 1,
        hdrId: 2
      });
      console.log("API Response:", response.data);

      if (response.data?.statuscode === 200) {
        setActiveUsers(response.data.data.activeUsers);
        setInactiveUsers(response.data.data.inactiveUsers);
        generateColumns(response.data.data.activeUsers); 
      } else {
        console.error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error fetching user status data:", error);
      setError(true);
    } finally {
      setIsFetching(false);
    }
  };

  const generateColumns = (data: any[]) => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const generatedColumns: Column[] = headers.map((header) => ({
      Header: header,
      accessor: header,
      autoResizable: true,
    }));

    setColumns(generatedColumns);
  };

  const handleTabSelect = (event: CustomEvent) => {
    const selectedTabText = event.detail.tab.dataset.text;
    setSelectedTab(selectedTabText);
  };

  const tableData = selectedTab === "Active Users" ? activeUsers : inactiveUsers;

  return (
    <Card>
      <TabContainer
        contentBackgroundDesign="Solid"
        headerBackgroundDesign="Solid"
        onTabSelect={handleTabSelect}
      >
        <Tab
          data-text="Active Users"
          additionalText={activeUsers.length.toString()}
          icon="kpi-managing-my-area"
          text="Active Users"
          selected={selectedTab === "Active Users"}
        >
          {error ? (
            <div className="p-4 text-red-600">
              <p>Failed to load user status data. Please try again later.</p>
            </div>
          ) : (
            <AnalyticalTable
              columns={columns}
              data={activeUsers}
              filterable
              alternateRowColor
              rowHeight={44}
              selectionMode="None"
              loading={isFetching}
            />
          )}
        </Tab>
        <Tab
          data-text="Inactive Users"
          additionalText={inactiveUsers.length.toString()}
          icon="account"
          text="Inactive Users"
          selected={selectedTab === "Inactive Users"}
        >
          {error ? (
            <div className="p-4 text-red-600">
              <p>Failed to load user status data. Please try again later.</p>
            </div>
          ) : (
            <AnalyticalTable
              columns={columns}
              data={inactiveUsers}
              filterable
              alternateRowColor
              rowHeight={44}
              selectionMode="None"
              loading={isFetching}
            />
          )}
        </Tab>
      </TabContainer>
    </Card>
  );
};

export default UserStatusTable;


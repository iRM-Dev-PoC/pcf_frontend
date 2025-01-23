// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PieChart from "@/components/LO/Charts/PieChart";
// import TopUsersTable from './Tables/TopUsersTable';
// import BarChart from './Charts/BarChart';
// import HorizontalBarChart from './Charts/HorizontalBarChart';
// import UserBarChart from './Charts/UserBarChart';

// const DashboardTemplate = () => {
//   const dashboardChartEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/get-dashboard-data`;

//   const [activeUserTypeData, setActiveUserTypeData] = useState(null);
//   const [activeUserRoleCountData, setActiveUserRoleCountData] = useState(null);
//   const [topRolesData, setTopRolesData] = useState(null);
//   const [topTransactionsData, setTopTransactionsData] = useState(null);
//   const [barChartTopRolesByActiveUserCountData, setbarChartTopRolesByActiveUserCountData] = useState(null);
//   const [barChartTopTransactionsByActiveUsersData, setbarChartTopTransactionsByActiveUsersData] = useState(null);
//   const [isFetching, setIsFetching] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsFetching(true);
//     try {
//       const response = await axios.post(dashboardChartEndpoint, {
//         customer_id: 1,
//         hdrId: 2
//       });
//       console.log("API Response:", response.data);
//       console.log("ipsita",barChartTopTransactionsByActiveUsersData)

//       if (response.data?.statuscode === 200) {
//         setActiveUserTypeData(response.data.data.activeUserType);
//         setActiveUserRoleCountData(response.data.data.activeUserRoleCount);
//         setTopRolesData(response.data.data.topRolesByActiveUserCount);
//         setTopTransactionsData(response.data.data.topTransactionsByActiveUsers);
//         setbarChartTopRolesByActiveUserCountData(response.data.data.barChartTopRolesByActiveUserCountData);
//         setbarChartTopTransactionsByActiveUsersData(response.data.data.barChartTopTransactionsByActiveUsersData);

//       } else {
//         console.error("Unexpected API response format");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(true);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 gap-5">
//       {error ? (
//         <div className="p-4 text-red-600">
//           <p>Failed to load data. Please try again later.</p>
//         </div>
//       ) : isFetching ? (
//         <div className="p-4">
//           <p>Loading...</p>
//         </div>
//       ) : (
//         <>
//           {activeUserTypeData && (
//             <PieChart data={activeUserTypeData} title="Active User Type" />
//           )}
//           {activeUserRoleCountData && (
//             <PieChart data={activeUserRoleCountData} title="Active User Role Count" />
//           )}
//           {topRolesData && (    
//             <TopUsersTable data={topRolesData} title="Top Roles by Active User Count" />
//           )}
//           {topTransactionsData && (
//             <TopUsersTable data={topTransactionsData} title="Top Roles by Active User Count" />
//           )}
//           {barChartTopRolesByActiveUserCountData &&(
//             <BarChart data={barChartTopRolesByActiveUserCountData} title="Top Roles by" />
//           )}
//           {barChartTopTransactionsByActiveUsersData && (
//              <HorizontalBarChart  data={barChartTopTransactionsByActiveUsersData}  title="Top Transactions by Active Users" />
//           )}
//           {barChartTopRolesByActiveUserCountData &&(
//             <UserBarChart data={barChartTopRolesByActiveUserCountData} title="Top Roles by" categories={[]} />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default DashboardTemplate;



// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PieChart from "@/components/LO/Charts/PieChart";
// import TopUsersTable from './Tables/TopUsersTable';
// import HorizontalBarChart from './Charts/HorizontalBarChart';
// import UserBarChart from './Charts/UserBarChart';
// // import VerticalBarChart from './Charts/VerticalBarChart';
// // import { Card } from '@ui5/webcomponents-react';

// interface BarChartRoleData {
//   name: string;
//   value: number;
// }
// interface BarChartTransactionData {
//   name: string;
//   value: number;
// }

// interface DashboardData {
//   activeUserType: any; 
//   activeUserRoleCount: any; 
//   topRolesByActiveUserCount: any[]; 
//   topTransactionsByActiveUsers: any[]; 
//   barChartTopRolesByActiveUserCount: { items: BarChartRoleData[] }[]; 
//   barChartTopTransactionsByActiveUsers: { items: BarChartTransactionData[] }[];
// }

// const DashboardTemplate = () => {
//   const dashboardChartEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/get-dashboard-data`;

//   const [activeUserTypeData, setActiveUserTypeData] = useState<any>(null);
//   const [activeUserRoleCountData, setActiveUserRoleCountData] = useState<any>(null);
//   const [topRolesData, setTopRolesData] = useState<any[]>([]);
//   const [topTransactionsData, setTopTransactionsData] = useState<any[]>([]);
//   const [barChartTopRolesByActiveUserCountData, setBarChartTopRolesByActiveUserCountData] = useState<BarChartRoleData[] | null>(null);
//   const [barChartTopTransactionsData, setBarChartTopTransactionsData] = useState<BarChartTransactionData[]>([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsFetching(true);
//     try {
//       const response = await axios.post(dashboardChartEndpoint, {
//         customer_id: 1,
//         hdrId: 2
//       });
//       console.log("API Response:", response.data);

//       if (response.data?.statuscode === 200) {
//         const data: DashboardData = response.data.data;
//         setActiveUserTypeData(data.activeUserType);
//         setActiveUserRoleCountData(data.activeUserRoleCount);
//         setTopRolesData(data.topRolesByActiveUserCount);
//         setTopTransactionsData(data.topTransactionsByActiveUsers);
//         setBarChartTopRolesByActiveUserCountData(data.barChartTopRolesByActiveUserCount[0]?.items || []);
//         setBarChartTopTransactionsData(data.barChartTopTransactionsByActiveUsers[0]?.items || []);
       
//       } else {
//         console.error("Unexpected API response format");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(true);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const barChartCategories = barChartTopRolesByActiveUserCountData?.map(item => item.name) || [];
//   const barChartData = barChartTopRolesByActiveUserCountData?.map(item => item.value) || [];

//   const barChartCategories1 = barChartTopTransactionsData.map(item => item.name);
//   const barChartData1 = barChartTopTransactionsData.map(item => item.value);

//   console.log("ipsoit",barChartData1)


//   return (
//     <div className="grid gap-5">
//      {/* <div className="grid grid-cols-4 gap-5">
//         <Card>h11</Card>
//         <Card>h11</Card>
//         <Card>h11</Card>
//         <Card>h11</Card>
//         </div> */}
//     <div className="grid grid-cols-2 gap-5">
//       {error ? (
//         <div className="p-4 text-red-600">
//           <p>Failed to load data. Please try again later.</p>
//         </div>
//       ) : isFetching ? (
//         <div className="p-4">
//           <p>Loading...</p>
//         </div>
//       ) : (
//         <>
//           {activeUserTypeData && (
//             <PieChart data={activeUserTypeData} title="Active User Logged in Last 90 Days" />
//           )}
//           {activeUserRoleCountData && (
//             <PieChart data={activeUserRoleCountData} title="Active User Role Count" />
//           )}
//           {/* {topRolesData.length > 0 && (
//             <TopUsersTable data={topRolesData} title="Top Roles by Active User Count" />
//           )}
//           {topTransactionsData.length > 0 && (
//             <TopUsersTable data={topTransactionsData} title="Top Transactions by Active Users" />
//           )} */}
//           {barChartTopRolesByActiveUserCountData && barChartTopRolesByActiveUserCountData.length > 0 && (
//             <UserBarChart categories={barChartCategories} data={barChartData} title="Top Roles Assignment by Active User" />
//           )}
//           {barChartTopTransactionsData.length > 0 && (
//             <HorizontalBarChart
//               categories={barChartCategories1}
//               data={barChartData1}
//               title="Top Transactions by Active Users"
//             />
//           )}
//         </>
//       )}
//     </div>
//     </div>
//   );
// };

// export default DashboardTemplate;

import { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from "@/components/LO/Charts/PieChart";
import TopUsersTable from './Tables/TopUsersTable';
import HorizontalBarChart from './Charts/HorizontalBarChart';
import UserBarChart from './Charts/UserBarChart';
import VerticalBarChart from './Charts/VerticalBarChart';
import { Card } from '@ui5/webcomponents-react';

interface BarChartRoleData {
  name: string;
  value: number;
  series : any[]
}
interface BarChartTransactionData {
  name: string;
  value: number;
}

interface DashboardData {
  activeUserType: any; 
  activeUserRoleCount: any; 
  allActiveUserType:any;
  topRolesByActiveUserCount: any[]; 
  topTransactionsByActiveUsers: any[]; 
  barChartTopRolesByActiveUserCount: { items: BarChartRoleData[] }[]; 
  barChartTopTransactionsByActiveUsers: { items: BarChartTransactionData[] }[];
}

const DashboardTemplate = () => {
  const dashboardChartEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/get-dashboard-data`;

  const [activeUserTypeData, setActiveUserTypeData] = useState<any>(null);
  const [activeUserRoleCountData, setActiveUserRoleCountData] = useState<any>(null);
  const [allActiveUserTypeData, setAllActiveUserTypeData] = useState<any>(null);
  const [topRolesData, setTopRolesData] = useState<any[]>([]);
  const [topTransactionsData, setTopTransactionsData] = useState<any[]>([]);
  const [barChartTopRolesByActiveUserCountData, setBarChartTopRolesByActiveUserCountData] = useState<BarChartRoleData[] | null>(null);
  const [barChartTopTransactionsData, setBarChartTopTransactionsData] = useState<BarChartTransactionData[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.post(dashboardChartEndpoint, {
        customer_id: 1,
        hdrId: 2
      });
      console.log("API Response:", response.data);

      if (response.data?.statuscode === 200) {
        const data: DashboardData = response.data.data;
        setActiveUserTypeData(data.activeUserType);
        setActiveUserRoleCountData(data.activeUserRoleCount);
        setAllActiveUserTypeData(data.allActiveUserType);
        setTopRolesData(data.topRolesByActiveUserCount);
        setTopTransactionsData(data.topTransactionsByActiveUsers);
        setBarChartTopRolesByActiveUserCountData(data.barChartTopRolesByActiveUserCount[0]?.items || []);
        setBarChartTopTransactionsData(data.barChartTopTransactionsByActiveUsers[0]?.items || []);
      } else {
        console.error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setIsFetching(false);
    }
  };

  const barChartCategories = barChartTopRolesByActiveUserCountData?.map(item => item.name) || [];
  const barChartData = barChartTopRolesByActiveUserCountData?.map(item => item.value) || [];

  const barChartCategories1 = barChartTopTransactionsData.map(item => item.name);
  const barChartData1 = barChartTopTransactionsData.map(item => item.value);

  const barChartTableData = barChartTopRolesByActiveUserCountData?.map(item => item.series) || []; // added

  console.log("barChartData ", barChartData);

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-2 gap-5">
        {error ? (
          <div className="p-4 text-red-600">
            <p>Failed to load data. Please try again later.</p>
          </div>
        ) : isFetching ? (
          <div className="p-4">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {allActiveUserTypeData && (
              <PieChart data={allActiveUserTypeData } title="All Active User" />
            )}
            {activeUserTypeData && (
              <PieChart data={activeUserTypeData} title="Active User Logged in Last 90 Days" />
            )}
            {activeUserRoleCountData && (
              <PieChart data={activeUserRoleCountData} title="Active User Role Count in Last 90 Days" />
            )}
            {/* {topRolesData.length > 0 && (
              <TopUsersTable data={topRolesData} title="Top Roles by Active User Count" />
            )}
            {topTransactionsData.length > 0 && (
              <TopUsersTable data={topTransactionsData} title="Top Transactions by Active Users" />
            )} */}
            {barChartTopRolesByActiveUserCountData && barChartTopRolesByActiveUserCountData.length > 0 && (
              <UserBarChart
                categories={barChartCategories} 
                data={barChartData} 
                barChartTableData={barChartTableData}
                title="Top Roles Assignment by Active User"
              />
            )}
            {barChartTopTransactionsData.length > 0 && (
              <HorizontalBarChart
                categories={barChartCategories1}
                data={barChartData1}
                title="Top Transactions Executed by Active Users"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardTemplate;

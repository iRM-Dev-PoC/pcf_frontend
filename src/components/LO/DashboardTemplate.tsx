// import BarChart from "@/components/LO/Charts/BarChart";
// import PieChart from "@/components/LO/Charts/PieChart";
// import StackedBarChart from "@/components/LO/Charts/StackedBarChart";
// import { PrivelegeService } from "@/mockLOData/Sync_1_Data/PrivelegeCountServiceData";
// import { RecalculatedPriceData } from "@/mockLOData/Sync_1_Data/RecalculatedPriceData";
// import { UserCountServiceData } from '@/mockLOData/Sync_1_Data/UserCountServiceData';
// import { categories, seriesData } from '@/mockLOData/Sync_1_Data/ExpensesData';
// import TrendAnalysisChart from "./Charts/TrendAnalysisChart";
// import { ActiveUserTypeData } from "@/mockLOData/Sync_1_Data/ActiveUserTypeData";
// import { ActiveUserRoleCountData } from "@/mockLOData/Sync_1_Data/ActiveUserRoleCountData";



// const DashboardTemplate = () => {
//   return (
//     <div className="grid grid-cols-2 gap-5">
//       <PieChart data={ActiveUserTypeData} title={"Active User Type"}/>
//       <BarChart data={UserCountServiceData} title={"User Count Services"}/>
//       <StackedBarChart data={seriesData} categories={categories} title={"Over Expenses(In USD) Vs User Count By Subscription Type"}/>
//       <PieChart data={ActiveUserRoleCountData} title={"Active User Role Count"}/>
//       <BarChart data={PrivelegeService} title={"Privelege Count By Service"}/>
//       <BarChart data={RecalculatedPriceData} title={"Recalculated Service"}/>
//       <TrendAnalysisChart/>
//     </div>
//   )
// }

// export default DashboardTemplate;




import { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from "@/components/LO/Charts/PieChart";
import TopUsersTable from './Tables/TopUsersTable';

const DashboardTemplate = () => {
  const dashboardChartEndpoint = `${import.meta.env.VITE_LO_BACKEND_BASE_URL}/lo/dashboard/get-dashboard-data`;

  const [activeUserTypeData, setActiveUserTypeData] = useState(null);
  const [activeUserRoleCountData, setActiveUserRoleCountData] = useState(null);
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
        setActiveUserTypeData(response.data.data.activeUserType);
        setActiveUserRoleCountData(response.data.data.activeUserRoleCount);
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

  return (
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
          {activeUserTypeData && (
            <PieChart data={activeUserTypeData} title="Active User Type" />
          )}
          {activeUserRoleCountData && (
            <PieChart data={activeUserRoleCountData} title="Active User Role Count" />
          )}
        </>
      )}
      <TopUsersTable/>
    </div>
  );
};

export default DashboardTemplate;

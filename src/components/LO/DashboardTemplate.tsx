import BarChart from "@/components/LO/Charts/BarChart";
import PieChart from "@/components/LO/Charts/PieChart";
import StackedBarChart from "@/components/LO/Charts/StackedBarChart";
// import { PrivelegeCountRoleData } from '@/mockLOData/Sync_1_Data/PrivelegeCountRole';
import { PrivelegeService } from "@/mockLOData/Sync_1_Data/PrivelegeCountServiceData";
import { RecalculatedPriceData } from "@/mockLOData/Sync_1_Data/RecalculatedPriceData";
import { UserCountPrivilegeData } from "@/mockLOData/Sync_1_Data/UserCountPrivelegeData";
import { UserCountRoleData } from '@/mockLOData/Sync_1_Data/UserCountRoleData';
import { UserCountServiceData } from '@/mockLOData/Sync_1_Data/UserCountServiceData';
import { categories, seriesData } from '@/mockLOData/Sync_1_Data/ExpensesData';
import TrendAnalysisChart from "./Charts/TrendAnalysisChart";



const DashboardTemplate = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <PieChart data={UserCountRoleData} title={"User Count By Roles"}/>
      <BarChart data={UserCountServiceData} title={"User Count Services"}/>
      {/* <PieChart data={PrivelegeCountRoleData} title={"Privelege Count Roles"}/> */}
      <StackedBarChart data={seriesData} categories={categories} title={"Over Expenses(In USD) Vs User Count By Subscription Type"}/>
      <PieChart data={UserCountPrivilegeData} title={"User Count By Privilege"}/>
      <BarChart data={PrivelegeService} title={"Privelege Count By Service"}/>
      <BarChart data={RecalculatedPriceData} title={"Recalculated Service"}/>
      <TrendAnalysisChart/>
    </div>
  )
}

export default DashboardTemplate;

import DashboardTemplate from "@/components/LO/DashboardTemplate";
import FilterBar from "@/components/LO/FilterBar";
import "@/css/dynamicPage.css";
import {
    DynamicPage,
    DynamicPageHeader,
    DynamicPageTitle,
    MessageStrip,
    Title,
} from "@ui5/webcomponents-react";

import { ThemingParameters } from "@ui5/webcomponents-react-base";

const LODASHBOARD = () => {
    return (
     <DynamicPage
        className="dynamicPage"
        headerContent={
            <DynamicPageHeader>
               <FilterBar/>
            </DynamicPageHeader>
        }
        headerTitle={
            <DynamicPageTitle
                expandedContent={
                    <MessageStrip>
                        A License Optimization Dashboard provides key insights into software license usage,
                        helping identify underutilized licenses, ensure compliance, and optimize costs.
                    </MessageStrip>
                }
                header={<Title className="text-2xl font-bold">Dashboard</Title>}
            ></DynamicPageTitle>
        }
        style={{
            borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
        }}
        showHideHeaderButton={false}
        headerContentPinnable={false}
    >
       <DashboardTemplate/>
      
    </DynamicPage>

    );
};

export default LODASHBOARD;

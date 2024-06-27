import AddReportCheckPointMapping from "@/components/AddReportCheckPointMapping";
import {DynamicPage} from "@ui5/webcomponents-react";

import "@/css/dynamicPage.css";

const ReportCheckPointMapping = () => {
    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddReportCheckPointMapping />
        </DynamicPage>
    );
};

export default ReportCheckPointMapping;

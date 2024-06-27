import AddReport from "@/components/AddReport";
import "@/css/dynamicPage.css";
import {DynamicPage} from "@ui5/webcomponents-react";

const Report = () => {
    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddReport />
        </DynamicPage>
    );
};

export default Report;

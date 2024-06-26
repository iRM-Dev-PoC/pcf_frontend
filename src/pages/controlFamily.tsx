import ControlFamilyDetails from "@/components/ControlFamilyDetails";
import "@/css/dynamicPage.css";
import { DynamicPage } from "@ui5/webcomponents-react";

const ControlFamily = () => {
    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <ControlFamilyDetails />
        </DynamicPage>
    );
};

export default ControlFamily;

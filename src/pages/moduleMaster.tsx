import AddModuleMaster from "@/components/AddModuleMaster";
import {DynamicPage} from "@ui5/webcomponents-react";
import "@/css/dynamicPage.css";

const ModuleMaster = () => {

    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddModuleMaster />
        </DynamicPage>
    );
};

export default ModuleMaster;

import AddSubModule from "@/components/AddSubModule";
import "@/css/dynamicPage.css";
import {DynamicPage} from "@ui5/webcomponents-react";

const SubModules = () => {
    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddSubModule />
        </DynamicPage>
    );
};

export default SubModules;

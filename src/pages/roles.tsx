import AddRoles from "@/components/AddRoles";
import {DynamicPage} from "@ui5/webcomponents-react";
import "@/css/dynamicPage.css";

const Roles = () => {

    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddRoles />
        </DynamicPage>
    );
};

export default Roles;

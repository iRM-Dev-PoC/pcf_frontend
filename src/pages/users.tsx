import AddUsers from "@/components/AddUsers";
import { DynamicPage} from "@ui5/webcomponents-react";
import "@/css/dynamicPage.css";
const Users = () => {


    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddUsers />
        </DynamicPage>
    );
};

export default Users;

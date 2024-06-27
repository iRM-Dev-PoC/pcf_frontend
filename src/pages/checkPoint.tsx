import AddCheckPoint from "@/components/AddCheckPoint";
import "@/css/dynamicPage.css";
import { DynamicPage} from "@ui5/webcomponents-react";

const CheckPoint = () => {
    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddCheckPoint />
        </DynamicPage>
    );
};

export default CheckPoint;

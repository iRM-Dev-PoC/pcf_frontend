import TypeOfControlDetails from "@/components/TypeOfControlDetails";
import {  DynamicPage,} from "@ui5/webcomponents-react";
import "@/css/dynamicPage.css";

const TypeOfControl = () => {


    return (
        <DynamicPage
            className="dynamicPage"
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <TypeOfControlDetails />
        </DynamicPage>
    );
};

export default TypeOfControl;

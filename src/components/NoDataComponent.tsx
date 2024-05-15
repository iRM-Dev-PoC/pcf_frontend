import "@ui5/webcomponents-fiori/dist/illustrations/EmptyList.js";
import { IllustratedMessage } from "@ui5/webcomponents-react";

const NoDataComponent = () => {
    return (
        <div>
            <IllustratedMessage
                name="EmptyList"
                size="Scene"
                subtitleText="Try creating a new one to display here."
                titleLevel="H4"
                titleText="No data found!"
            />
        </div>
    );
};

export default NoDataComponent;

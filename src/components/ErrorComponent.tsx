import "@ui5/webcomponents-fiori/dist/illustrations/ErrorScreen.js";
import { IllustratedMessage } from "@ui5/webcomponents-react";

const ErrorComponent = () => {
    return (
        <>
            <IllustratedMessage
                name="ErrorScreen"
                subtitleText="An error occurred while fetching data. Try refreshing the page. If this message consist, please contact the administrator."
                titleLevel="H4"
                titleText="Something went wrong!"
            />
        </>
    );
};

export default ErrorComponent;

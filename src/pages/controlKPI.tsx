import "@/css/dynamicPage.css";
import {
    DynamicPage,
    DynamicPageTitle,
    MessageStrip,
    Title,
} from "@ui5/webcomponents-react";

import { ThemingParameters } from "@ui5/webcomponents-react-base";

const controlKPI = () => {
    return (
        <DynamicPage
            className="dynamicPage"
            headerTitle={
                <DynamicPageTitle
                    header={<Title>KPI - Controls</Title>}
                    snappedContent={<MessageStrip>xyz</MessageStrip>}
                ></DynamicPageTitle>
            }
            style={{
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        ></DynamicPage>
    );
};

export default controlKPI;


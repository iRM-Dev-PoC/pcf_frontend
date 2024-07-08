import SQLCodeEditor from "@/components/v2/SQLCodeEditor";
import SQLRunner from "@/components/v2/SQLRunner";
import "@/css/dynamicPage.css";
import {
    DynamicPage,
    DynamicPageTitle,
    MessageStrip,
    Title,
} from "@ui5/webcomponents-react";

import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { useState } from "react";

const controlKPI = () => {
    const [sql, setSql] = useState("");
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
        >
            <SQLRunner sql={sql} />
            <SQLCodeEditor setSql={setSql} sql={sql} />
        </DynamicPage>
    );
};

export default controlKPI;

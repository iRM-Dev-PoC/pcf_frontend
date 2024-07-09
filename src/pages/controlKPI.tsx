import SQLCodeEditor from "@/components/v2/SQLCodeEditor";
import SQLRunner from "@/components/v2/SQLRunner";
import "@/css/dynamicPage.css";
import { Bar, Button, DynamicPage, Title } from "@ui5/webcomponents-react";

import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { useState } from "react";

const controlKPI = () => {
    const [sql, setSql] = useState("");
    return (
        <DynamicPage
            className="dynamicPage"
            headerTitle={
                <Bar
                    design="Header"
                    className="block h-16 rounded-md"
                    endContent={
                        <div>
                            <Button
                                design="Emphasized"
                                tooltip="Create"
                                icon="create"
                                onClick={() => {
                                    alert("Create");
                                }}
                            >
                                Create
                            </Button>
                        </div>
                    }
                    startContent={
                        <Title className="m-3 block text-2xl font-bold">
                            KPI - Controls
                        </Title>
                    }
                ></Bar>
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

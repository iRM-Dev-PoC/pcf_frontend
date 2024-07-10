import ControlKPICreationForm from "@/components/v2/ControlKPICreationForm";
import SQLCodeEditor from "@/components/v2/SQLCodeEditor";
import SQLRunner from "@/components/v2/SQLRunner";
import "@/css/dynamicPage.css";
import {
    Bar,
    Button,
    DynamicPage,
    Modals,
    Title,
    type ButtonDomRef,
} from "@ui5/webcomponents-react";

import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { useRef, useState } from "react";

const controlKPI = () => {
    const [sql, setSql] = useState("");
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);
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
                                    const { close } = showDialog({
                                        headerText: "KPI - Controls Creation",
                                        children: (
                                            <>
                                                <ControlKPICreationForm />
                                            </>
                                        ),
                                        footer: (
                                            <Bar
                                                endContent={
                                                    <>
                                                        <Button
                                                            onClick={() =>
                                                                close()
                                                            }
                                                            design="Negative"
                                                            ref={
                                                                closeButtonRoleref
                                                            }
                                                        >
                                                            Close
                                                        </Button>
                                                    </>
                                                }
                                            ></Bar>
                                        ),
                                    });
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

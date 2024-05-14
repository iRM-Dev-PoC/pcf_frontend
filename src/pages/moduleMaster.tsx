import {
    Bar,
    Button,
    ButtonDomRef,
    DynamicPage,
    DynamicPageTitle,
    MessageStrip,
    Modals,
    Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import ModuleCreationForm from "../components/ModuleCreationForm";
import { useRef } from "react";
import AddModuleMaster from "../components/AddModuleMaster";

const ModuleMaster = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);
    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    header={<Title>Module-Master</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Create"
                            icon="create"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Added Module Information",
                                    children: (
                                        <>
                                            <ModuleCreationForm
                                                closeButtonref={
                                                    closeButtonRoleref
                                                }
                                            />
                                        </>
                                    ),
                                    footer: (
                                        <Bar
                                            endContent={
                                                <>
                                                    <Button
                                                        onClick={() => close()}
                                                        design="Negative"
                                                        ref={closeButtonRoleref}
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
                    }
                    snappedContent={
                        <MessageStrip>
                            The Module Page provides an overview and management
                            options for various modules within the system,
                            enabling customization and integration of specific
                            functionalities.
                        </MessageStrip>
                    }
                ></DynamicPageTitle>
            }
            style={{
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <AddModuleMaster />
        </DynamicPage>
    );
};

export default ModuleMaster;

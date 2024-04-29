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
import { useRef } from "react";
import SubModuleCreationForm from "../components/SubModuleCreationForm";
import AddSubModule from "../components/AddSubModule";

const SubModules = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);
    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            Information (You can see the Sub-Module Details
                            here.)
                        </MessageStrip>
                    }
                    header={<Title>Sub-Module</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Create"
                            icon="create"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "Added Role Information",
                                    children: (
                                        <SubModuleCreationForm
                                            closeButtonref={closeButtonRoleref}
                                        />
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
                            Information (only visible if header content is
                            collapsed/snapped)
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
            <AddSubModule />
        </DynamicPage>
    );
};

export default SubModules;

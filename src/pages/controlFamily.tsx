import ControlFamilyCreationForm from "@/components/ControlFamilyCreation";
import ControlFamilyDetails from "@/components/ControlFamilyDetails";
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

const ControlFamily = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);
    
    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    header={<Title>Control Family Details</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Create"
                            icon="create"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "User Information",
                                    children: (
                                        <>
                                            <ControlFamilyCreationForm
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
                            The Control Family Page offers a comprehensive
                            overview and management of related control measures
                            and policies within a specified domain or framework.
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
            <ControlFamilyDetails />
        </DynamicPage>
    );
};

export default ControlFamily;
